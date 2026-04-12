import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface WebhookPayload {
  id: string;
  status: string;
  event?: string;
  [key: string]: any;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const webhookData: WebhookPayload = await req.json();

    console.log("Webhook recebido:", JSON.stringify(webhookData));

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    let statusMap = "pending";
    if (webhookData.status === "paid" || webhookData.event === "transaction.completed") {
      statusMap = "paid";
    } else if (webhookData.status === "expired" || webhookData.event === "transaction.expired") {
      statusMap = "expired";
    } else if (webhookData.status === "failed" || webhookData.event === "transaction.failed") {
      statusMap = "failed";
    }

    const updateData: any = {
      status: statusMap,
      updated_at: new Date().toISOString(),
    };

    if (statusMap === "paid") {
      updateData.paid_at = new Date().toISOString();
      if (webhookData.endToEndId) updateData.end_to_end_id = webhookData.endToEndId;
      if (webhookData.payerName) updateData.payer_name = webhookData.payerName;
      if (webhookData.payerNationalRegistration) {
        updateData.payer_national_registration = webhookData.payerNationalRegistration;
      }
    }

    console.log("Atualizando transação com ID:", webhookData.id, "Status:", statusMap);

    const { data, error } = await supabase
      .from("pix_transactions")
      .update(updateData)
      .eq("safefypay_id", webhookData.id)
      .select();

    if (error) {
      console.error("Database error:", error);
      throw new Error(`Erro ao atualizar transação: ${error.message}`);
    }

    if (!data || data.length === 0) {
      console.warn("Transação não encontrada com ID:", webhookData.id);
    }

    return new Response(
      JSON.stringify({ success: true, updated: data?.length || 0 }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Webhook error:", error);
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