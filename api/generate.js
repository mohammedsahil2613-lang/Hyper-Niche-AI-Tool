import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  const { topic } = req.body;

  if (!topic) return res.status(400).json({ error: "Topic required" });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Create viral content for: ${topic}` }],
      temperature: 0.7
    });

    const content = completion.choices[0].message.content;
    res.status(200).json({ content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "OpenAI error" });
  }
}
