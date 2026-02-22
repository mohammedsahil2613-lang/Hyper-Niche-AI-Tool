export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { message } = req.body;

  // Self-contained AI logic
  let reply;
  const m = message.toLowerCase();

  if (m.includes("hello") || m.includes("hi")) reply = "Hello! I am HyperNiche AI. How can I help you today?";
  else if (m.includes("how are you")) reply = "I'm just a program, but I'm ready to assist you!";
  else if (m.includes("bye")) reply = "Goodbye! Talk to you later.";
  else reply = `I understood your message: "${message}". Still learning!`;

  res.status(200).json({ reply });
}
