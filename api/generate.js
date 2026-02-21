export default async function handler(req, res) {
    const { topic } = req.body;

    // Your OpenAI key placeholder (replace later if you want real AI)
    const OPENAI_KEY = process.env.OPENAI_API_KEY || 'test-key';

    // Dummy response for testing
    res.status(200).json({ content: 'Generated content for topic: ' + topic });
}
