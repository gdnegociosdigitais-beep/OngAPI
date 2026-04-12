import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const API_URL = Deno.env.get('SAFEFYPAY_API_URL') || 'https://api-payment.safefypay.com.br/v1';
const PUBLIC_KEY = Deno.env.get('SAFEFYPAY_PUBLIC_KEY');
const SECRET_KEY = Deno.env.get('SAFEFYPAY_SECRET_KEY');
const BUFFER_MS = 5 * 60 * 1000;
const PROVIDER = 'safefypay';

function getSupabase() {
  return createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
}

async function fetchNewToken(): Promise<{ token: string; expiresAt: Date }> {
  const response = await fetch(`${API_URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grantType: 'client_credentials',
      publicKey: PUBLIC_KEY,
      secretKey: SECRET_KEY,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Erro de autenticação SafefyPay: ${response.status} - ${JSON.stringify(errorData)}`);
  }

  const result = await response.json();
  const token = result.data?.accessToken || result.accessToken;
  const expiresIn: number = result.data?.expiresIn || result.expiresIn || 3600;

  if (!token) {
    throw new Error('Token não encontrado na resposta da API');
  }

  const expiresAt = new Date(Date.now() + expiresIn * 1000);
  return { token, expiresAt };
}

export async function getAccessToken(): Promise<string> {
  const supabase = getSupabase();
  const now = new Date();
  const validUntil = new Date(now.getTime() + BUFFER_MS);

  const { data: cached } = await supabase
    .from('api_tokens')
    .select('access_token, expires_at')
    .eq('provider', PROVIDER)
    .maybeSingle();

  if (cached && new Date(cached.expires_at) > validUntil) {
    console.log('Reutilizando token SafefyPay em cache');
    return cached.access_token;
  }

  console.log('Obtendo novo token SafefyPay...');
  const { token, expiresAt } = await fetchNewToken();

  await supabase
    .from('api_tokens')
    .upsert(
      {
        provider: PROVIDER,
        access_token: token,
        expires_at: expiresAt.toISOString(),
        updated_at: now.toISOString(),
      },
      { onConflict: 'provider' }
    );

  return token;
}

export async function createPixTransaction(transactionData: { amount: number; description?: string }) {
  const token = await getAccessToken();

  const payload = {
    method: 'pix',
    amount: transactionData.amount,
    currency: 'BRL',
    description: transactionData.description || 'Doação para Late Coração',
    externalId: `donation_${Date.now()}`,
    callbackUrl: Deno.env.get('SAFEFYPAY_CALLBACK_URL') || 'https://late-coracao.com.br/webhook',
  };

  console.log('Enviando transação para SafefyPay:', payload);

  const response = await fetch(`${API_URL}/transactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.json();
    console.error('Erro da API SafefyPay:', errorBody);

    if (
      errorBody?.error?.code === 'auth_rate_limit_exceeded' ||
      response.status === 401
    ) {
      console.warn('Token inválido ou expirado, limpando cache...');
      const supabase = getSupabase();
      await supabase.from('api_tokens').delete().eq('provider', PROVIDER);
    }

    throw new Error(`Erro ao criar PIX: ${JSON.stringify(errorBody)}`);
  }

  return await response.json();
}
