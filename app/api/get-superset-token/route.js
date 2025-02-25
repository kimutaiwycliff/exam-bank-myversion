import jwt from "jsonwebtoken";

const SECRET_KEY = "iamgroot";
const DASHBOARD_ID = "93fbab31-86ce-42ca-a9bb-0e79e6ea4edc";

export async function GET() {
  try {
    // Payload to be encoded in the JWT token
    const payload = {
      user: {
        username: 'admin',
        first_name: 'admin',
        last_name: 'admin',
        roles: ['abdul'],
      },
      resources: [
        { type: 'dashboard', id: DASHBOARD_ID },  // Restrict to the specified dashboard
      ],
      exp: Math.floor(Date.now() / 1000) + 60 * 60,  // Token expires in 1 hour
    };

    // Encode the payload to generate the token
    const token = jwt.sign(payload, SECRET_KEY, { algorithm: 'HS256' });

    // Send the token back as a response
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    console.error('Error generating Superset token:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate token' }), { status: 500 });
  }
}
