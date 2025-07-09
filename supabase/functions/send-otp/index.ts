// supabase/functions/kirim-otp/index.ts

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

Deno.serve(async (req) => {
  // Handle preflight request for CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { email } = await req.json()
    if (!email) throw new Error('Email is required')

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Set expiration time (e.g., 10 minutes from now)
    const expires_at = new Date(Date.now() + 10 * 60 * 1000).toISOString()

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    
    // Check if user exists
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single();

    if (userError || !user) {
      // Don't throw an error to prevent user enumeration attacks
      // Just return a success message
      return new Response(JSON.stringify({ message: 'If a user with this email exists, an OTP has been sent.' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }
    
    // Store OTP in the database
    const { error: insertError } = await supabaseAdmin
      .from('password_reset_otps')
      .insert({ email, otp_code: otp, expires_at })

    if (insertError) throw insertError

    // We can't use Supabase's built-in email sender for custom content easily.
    // This assumes you are using Resend, which integrates well.
    // Replace with your SMTP logic if needed.
    const resendApiKey = Deno.env.get('RESEND_API_KEY')
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'BVGO Support <noreply@yourdomain.com>', // Ganti dengan email pengirim Anda
        to: [email],
        subject: 'Your Password Reset Code',
        html: `
          <h1>Password Reset</h1>
          <p>Here is your 6-digit code to reset your password. It is valid for 10 minutes.</p>
          <h2><strong>${otp}</strong></h2>
        `,
      }),
    })

    if (!response.ok) {
        throw new Error('Failed to send email.')
    }

    return new Response(JSON.stringify({ message: 'OTP sent successfully' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})