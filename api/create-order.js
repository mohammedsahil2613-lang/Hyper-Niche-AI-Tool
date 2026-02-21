export default async function handler(req, res) {
  const auth = Buffer.from(
    process.env.PAYPAL_CLIENT_ID + ":" + process.env.PAYPAL_SECRET
  ).toString("base64");

  // Get access token
  const tokenResponse = await fetch("https://api-m.sandbox.paypal.com/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "grant_type=client_credentials"
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Create order
  const orderResponse = await fetch("https://api-m.sandbox.paypal.com/v2/checkout/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken}`
    },
    body: JSON.stringify({
      intent: "CAPTURE",
      purchase_units: [{ amount: { currency_code: "USD", value: "1.00" } }],
      application_context: {
        return_url: "https://hyper-niche-ai-tool-c92yj1z9z-mohammedsahil2613-1989s-projects.vercel.app/",
        cancel_url: "https://hyper-niche-ai-tool-c92yj1z9z-mohammedsahil2613-1989s-projects.vercel.app/"
      }
    })
  });

  const orderData = await orderResponse.json();
  const approvalUrl = orderData.links.find(link => link.rel === "approve")?.href;

  res.status(200).json({ approvalUrl });
}
