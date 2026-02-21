export default async function handler(req, res) {

  const { topic } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a premium viral content generator."
        },
        {
          role: "user",
          content: `Create high quality viral content about: ${topic}`
        }
      ]
    })
  });

  const data = await response.json();

  res.status(200).json({
    content: data.choices[0].message.content
  });
}
