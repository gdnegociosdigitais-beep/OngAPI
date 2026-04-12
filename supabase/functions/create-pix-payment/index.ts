import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";
import QRCode from "npm:qrcode@1.5.3";
import { createPixTransaction } from "./safefypay.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface CreatePixRequest {
  amount: number;
  donor_name?: string;
  donor_email?: string;
}

interface PixResponse {
  id: string;
  qrCode?: string;
  copyAndPaste?: string;
  [key: string]: any;
}

async function generateQRCode(pixCopyAndPaste: string): Promise<string> {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(pixCopyAndPaste, {
      errorCorrectionLevel: 'H',
      type: 'image/png',
      quality: 0.95,
      margin: 2,
      width: 300,
    });
    return qrCodeDataUrl;
  } catch (error) {
    console.error("Erro ao gerar QR Code:", error);
    throw new Error("Falha ao gerar QR Code");
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { amount, donor_name, donor_email }: CreatePixRequest = await req.json();

    if (!amount || amount < 50) {
      return new Response(
        JSON.stringify({ error: "Valor mínimo é de R$ 0,50 (50 centavos)" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    console.log("Criando PIX para amount:", amount);

    const transactionData = {
      amount: Math.floor(amount),
      description: "Doação para Late Coração",
    };

    const pixResponse = await createPixTransaction(transactionData);

    console.log("Resposta da SafefyPay:", JSON.stringify(pixResponse));

    const pixData = pixResponse.data || pixResponse;
    const transactionId = pixData.id || pixResponse.id;
    const pixInfo = pixData.pix || {};
    const copyPaste = pixInfo.copyAndPaste || pixData.copyAndPaste || pixData.copy_and_paste;
    const apiQrCode = pixInfo.qrCode || pixData.qrCode || pixData.qr_code;

    if (!transactionId) {
      throw new Error("ID da transação não encontrado na resposta");
    }

    if (!copyPaste) {
      throw new Error("Código copia e cola não encontrado na resposta");
    }

    const qrCodeDataUrl = apiQrCode && apiQrCode.startsWith('data:image')
      ? apiQrCode
      : await generateQRCode(copyPaste);

    const { data: transaction, error: dbError } = await supabase
      .from("pix_transactions")
      .insert({
        safefypay_id: transactionId,
        value: amount,
        status: "created",
        qr_code: qrCodeDataUrl,
        qr_code_base64: qrCodeDataUrl,
        donor_name: donor_name || null,
        donor_email: donor_email || null,
      })
      .select()
      .single();

    if (dbError) {
      console.error("Database error:", dbError);
      throw new Error("Erro ao salvar transação");
    }

    return new Response(
      JSON.stringify({
        id: transaction.id,
        transactionId: transactionId,
        qrCode: qrCodeDataUrl,
        copyPaste: copyPaste,
        amount: amount,
        status: "created",
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Erro interno do servidor"
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});