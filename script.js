const generateBtn = document.getElementById("generate-btn");
const outputEl = document.getElementById("output");

generateBtn.addEventListener("click", async () => {
  try {
    const promptInput = document.getElementById("prompt-input");
    if (!promptInput) throw new Error("Prompt input not found");

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptInput.value }),
    });

    if (!response.ok) throw new Error("API request failed");

    const data = await response.json();
    outputEl.innerText = data.result || "No result";
  } catch (err) {
    console.error(err);
    outputEl.innerText = `Error: ${err.message}`;
  }
});
