import { Handler } from '@netlify/functions';

const WHOP_API_KEY = process.env.WHOP_API_KEY;
const WHOP_PRODUCT_ID = process.env.WHOP_PRODUCT_ID;

export const handler: Handler = async (event) => {
  const response = {
    statusCode: 500,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
    },
    body: ''
  };
  // CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { userId, licenseKey } = JSON.parse(event.body || '{}');

    if (!userId && !licenseKey) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Either User ID or License Key required' }),
      };
    }

    if (!WHOP_API_KEY || !WHOP_PRODUCT_ID) {
      console.error('Missing Whop configuration');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ error: 'Server configuration error' }),
      };
    }

    let response;
    
    if (licenseKey) {
      // Verify using license key
      response = await fetch(
        'https://api.whop.com/api/v5/licenses/validate',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${WHOP_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: licenseKey
          })
        }
      );
    } else {
      // Verify using user ID
      response = await fetch(
        `https://api.whop.com/api/v5/memberships?user_id=${userId}&plan=${WHOP_PRODUCT_ID}`,
      {
        headers: {
          'Authorization': `Bearer ${WHOP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid user or membership not found' }),
      };
    }

    const data = await response.json();

    // Check if user has an active membership
    if (data.data && data.data.length > 0) {
      const membership = data.data[0];

      // Check if membership is valid and not expired
      if (membership.valid && !membership.cancel_at_period_end) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true }),
        };
      }
    }

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ success: false, error: 'No active membership found' }),
    };
  } catch (error) {
    console.error('Error verifying membership:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};
