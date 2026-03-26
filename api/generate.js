export default function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { code, paymentApproved } = req.body;

  // ✅ Test code Sahil599 → free content
  if (code === "Sahil599") {
    const aiContents = [
      "🔥 AI Viral Content #1",
      "💡 AI Viral Content #2",
      "🚀 AI Viral Content #3"
    ];
    const content = aiContents[Math.floor(Math.random() * aiContents.length)];
    return res.status(200).json({ content });
  }

  // ✅ Normal users must pay $1
  if (!paymentApproved) {
    return res.status(403).json({ error: "Please pay $1 to generate content" });
  }

  // ✅ Paid users → generate content
  const aiContents = [
    "🔥 AI Viral Content #1",
    "💡 AI Viral Content #2",
    "🚀 AI Viral Content #3"
  ];
  const content = aiContents[Math.floor(Math.random() * aiContents.length)];
  return res.status(200).json({ content });
}
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // store this in Vercel env
});

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { code, paymentApproved, prompt } = req.body;

  // ✅ Free content test code
  if (code === "Sahil599") {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI that creates viral Instagram Reels content." },
        { role: "user", content: prompt || "Generate a futuristic viral Instagram reel idea" }
      ],
    });
    const content = completion.choices[0].message.content;
    return res.status(200).json({ content });
  }

  // ✅ Normal users must pay $1
  if (!paymentApproved) {
    return res.status(403).json({ error: "Please pay $1 to generate content" });
  }

  // ✅ Paid users → generate AI content
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      { role: "system", content: "You are an AI that creates viral Instagram Reels content." },
      { role: "user", content: prompt || "Generate a futuristic viral Instagram reel idea" }
    ],
  });
  const content = completion.choices[0].message.content;
  return res.status(200).json({ content });
}
