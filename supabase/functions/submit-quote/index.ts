import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface QuoteSubmission {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  restaurantName: string;
  restaurantType: string;
  numBranches: string;
  menuSize: string;
  state: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  uid?: string;
  submittedAt?: string;
  source?: string;
  pageUrl?: string;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const body: QuoteSubmission = await req.json();
    
    const { 
      firstName, 
      lastName, 
      email, 
      phone, 
      restaurantName, 
      restaurantType,
      numBranches,
      menuSize,
      state,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
      uid,
      source,
      pageUrl,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !restaurantName || !restaurantType || !numBranches || !menuSize || !state) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Insert into quote_requests table
    const { data, error } = await supabase
      .from('quote_requests')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        restaurant_name: restaurantName,
        restaurant_type: restaurantType,
        num_branches: numBranches,
        menu_size: menuSize,
        state,
        utm_source: utm_source || null,
        utm_medium: utm_medium || null,
        utm_campaign: utm_campaign || null,
        utm_term: utm_term || null,
        utm_content: utm_content || null,
        tracking_uid: uid || null,
        source: source || 'web',
        page_url: pageUrl || null,
        status: 'new',
      })
      .select()
      .single();

    if (error) {
      console.error('Error inserting quote request:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to submit quote request' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Optionally trigger n8n webhook for quote generation
    const n8nWebhookUrl = Deno.env.get('N8N_QUOTE_WEBHOOK_URL');
    if (n8nWebhookUrl) {
      try {
        await fetch(n8nWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...body,
            quoteId: data.id,
          }),
        });
      } catch (webhookError) {
        console.error('n8n webhook error:', webhookError);
        // Don't fail the request if webhook fails
      }
    }

    // Optionally send to HubSpot
    const hubspotApiKey = Deno.env.get('HUBSPOT_API_KEY');
    if (hubspotApiKey) {
      try {
        await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${hubspotApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            properties: {
              firstname: firstName,
              lastname: lastName,
              email,
              phone,
              company: restaurantName,
              restaurant_type: restaurantType,
              num_branches: numBranches,
              menu_size: menuSize,
              state,
              utm_source: utm_source || '',
              utm_medium: utm_medium || '',
              utm_campaign: utm_campaign || '',
            },
          }),
        });
      } catch (hubspotError) {
        console.error('HubSpot API error:', hubspotError);
        // Don't fail the request if HubSpot fails
      }
    }

    return new Response(
      JSON.stringify({ success: true, data: { id: data.id } }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

