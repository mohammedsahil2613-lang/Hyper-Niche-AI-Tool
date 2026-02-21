const topicInput = document.getElementById("topic");
const generateBtn = document.getElementById("generateBtn");
const outputArea = document.getElementById("output");
const unlockBtn = document.getElementById("payBtn");
const unlockCode = document.getElementById("adminCode");

let isPremium = false;

// Admin/CEO free unlock
unlockBtn.addEventListener("click", function () {
  const code = unlockCode.value.trim();

  if (code === "sahil599") {
    isPremium = true;
    alert("Admin access granted ✅");
    return;
  }

  // Client payment
  window.location.href = "/api/create-order";
});

// Generate content
generateBtn.addEventListener("click", async function () {
  if (!isPremium) {
    alert("Please unlock premium first.");
    return;
  }

  const topic = topicInput.value;

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic })
    });

    const data = await response.json();
    outputArea.value = data.content;
  } catch (err) {
    alert("OpenAI content failed. Check your API key.");
    console.error(err);
  }
});
