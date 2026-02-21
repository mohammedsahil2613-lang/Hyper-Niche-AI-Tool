// ===================
// Hyper-Niche AI Tool
// Final working script
// ===================

const topicInput = document.getElementById("topic");
const generateBtn = document.getElementById("generateBtn");
const outputArea = document.getElementById("output");
const unlockBtn = document.getElementById("payBtn");
const unlockCode = document.getElementById("adminCode");

let isPremium = false;

// Check if client already paid
if (window.location.search.includes("paid=true")) {
  isPremium = true;
  alert("Payment successful ✅ Premium unlocked");
}

// Unlock button
unlockBtn.addEventListener("click", function () {
  const code = unlockCode.value.trim();

  // ✅ CEO/Admin free access
  if (code === "sahil599") {
    isPremium = true;
    alert("Admin access granted ✅");
    return;
  }

  // 💳 Client payment
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
