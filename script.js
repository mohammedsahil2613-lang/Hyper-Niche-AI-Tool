const topicInput = document.getElementById("topic");
const generateBtn = document.getElementById("generateBtn");
const outputArea = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");
const unlockBtn = document.getElementById("payBtn");
const unlockCode = document.getElementById("adminCode");

let isPremium = false;

// Admin free unlock + client payment
unlockBtn.addEventListener("click", async function () {
  const code = unlockCode.value.trim();

  // Admin unlock
  if (code === "sahil599") {
    isPremium = true;
    alert("Admin access granted ✅");
    return;
  }

  // Client payment flow
  try {
    const response = await fetch("/api/create-order");
    const data = await response.json();

    if (data.approvalUrl) {
      window.location.href = data.approvalUrl;
    } else {
      alert("Payment error. Check server.");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong.");
  }
});

// Generate AI content
generateBtn.addEventListener("click", async function () {
  if (!isPremium) {
    alert("Please unlock premium first.");
    return;
  }

  const topic = topicInput.value.trim();
  if (!topic) {
    alert("Enter a topic first!");
    return;
  }

  try {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic })
    });

    const data = await response.json();
    outputArea.value = data.content;
  } catch (err) {
    console.error(err);
    alert("OpenAI content failed. Check your API key.");
  }
});

// Copy content
copyBtn.addEventListener("click", function () {
  outputArea.select();
  document.execCommand("copy");
  alert("Content copied!");
});
