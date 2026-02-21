
const generateBtn = document.getElementById('generateBtn');
const demoBtn = document.getElementById('demoBtn');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const topicInput = document.getElementById('topicInput');

generateBtn.addEventListener('click', async () => {
    if(!topicInput.value) { alert('Enter topic'); return; }
    output.textContent = 'Generating...';
    const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topicInput.value })
    });
    const data = await res.json();
    output.textContent = data.content;
});

demoBtn.addEventListener('click', () => {
    output.textContent = 'This is a demo futuristic content for clients.';
});

copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(output.textContent);
    alert('Copied!');
});
