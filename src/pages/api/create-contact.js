export const prerender = false;

export async function POST({ request }) {
    try {
      const data = await request.json();
      const { email } = data;
  
      if (!email) {
        return new Response(JSON.stringify({
          message: "Missing required field: email",
        }), { status: 400 });
      }
  
      const loopsApiOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.LOOPS_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          source: 'Marketing website',
          subscribed: true,
        })
      };
  
      const loopsResponse = await fetch('https://app.loops.so/api/v1/contacts/create', loopsApiOptions);
      
      if (!loopsResponse.ok) {
        throw new Error(`Loops API responded with status: ${loopsResponse.status}`);
      }
  
      const loopsData = await loopsResponse.json();
  
      return new Response(JSON.stringify({
        message: "Contact created successfully",
        data: loopsData
      }), { status: 200 });
  
    } catch (error) {
      console.error('Error in API route:', error);
      return new Response(JSON.stringify({
        message: "An error occurred while processing your request",
      }), { status: 500 });
    }
  }