import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// The same email content as the other function
const emailSubject = "You're on the list! Welcome to the Etherion Revolution.";
const emailHtml = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0f172a; color: #cbd5e1; padding: 40px 20px; border-radius: 12px; border: 1px solid #334155;">
    <div style="text-align: center; margin-bottom: 30px;">
      <img src="https://www.etherionai.com/lovable-uploads/logo.png" alt="EtherionAI Logo" style="max-width: 150px; margin-bottom: 20px;">
      <h1 style="color: #ffffff; font-size: 28px; margin: 0;">The Revolution is Coming.</h1>
      <h2 style="color: #00aaff; font-size: 20px; margin: 10px 0;">You're at the Front of the Line.</h2>
    </div>
    <div style="background-color: #1e293b; padding: 30px; border-radius: 8px;">
      <p style="font-size: 16px; line-height: 1.6;">
        Thank you for joining the waitlist for Etherion.
      </p>
      <p style="font-size: 16px; line-height: 1.6;">
        We're not just building another tool; we're assembling a new way to work, powered by a team of autonomous AI agents ready to execute your business goals.
      </p>
      <p style="font-size: 16px; line-height: 1.6;">
        While you wait for your priority access, we'll be sharing exclusive sneak peeks and insights into the future of work. Get ready—your digital workforce is just around the corner.
      </p>
    </div>
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #334155;">
      <p style="color: #64748b; font-size: 14px; margin: 0;">
        The Etherion Team
      </p>
    </div>
  </div>
`;

const handler = async (_req: Request): Promise<Response> => {
  if (_req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Check for necessary environment variables
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    if (!serviceRoleKey || !resendApiKey) {
      return new Response(
        JSON.stringify({
          error:
            "Missing required environment variables (SUPABASE_SERVICE_ROLE_KEY or RESEND_API_KEY)",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Create an admin Supabase client
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      serviceRoleKey
    );

    // Fetch all users from the waitlist
    const { data: users, error: fetchError } = await supabaseAdmin
      .from("waitlist")
      .select("email");

    if (fetchError) {
      throw fetchError;
    }

    if (!users || users.length === 0) {
      return new Response(
        JSON.stringify({ message: "No users found in the waitlist." }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resend = new Resend(resendApiKey);
    let successCount = 0;
    let failureCount = 0;

    console.log(`Starting bulk send for ${users.length} users.`);

    for (const user of users) {
      try {
        await resend.emails.send({
          from: "Etherion <contact@etherionai.com>",
          to: [user.email],
          subject: emailSubject,
          html: emailHtml,
        });
        console.log(`Successfully sent email to ${user.email}`);
        successCount++;
      } catch (emailError) {
        console.error(`Failed to send email to ${user.email}:`, emailError);
        failureCount++;
      }
    }

    const summary = `Bulk send complete. Total: ${users.length}, Success: ${successCount}, Failures: ${failureCount}.`;
    console.log(summary);

    return new Response(JSON.stringify({ message: summary }), {
      status: 200,
      headers: { "Content-Type": "application/json", ...corsHeaders },
    });
  } catch (error: any) {
    console.error("Critical error in bulk-send function:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "An unexpected error occurred.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
