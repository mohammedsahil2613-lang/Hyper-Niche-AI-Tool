import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  try {
    const { topic } = req.body;
    if (!topic) return res.status(400).json({ status: "error", message: "No topic provided" });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: `Generate a viral post about: ${topic}` }]
    });

    res.status(200).json({ status: "success", content: completion.choices[0].message.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "AI generation failed" });
  }
}
