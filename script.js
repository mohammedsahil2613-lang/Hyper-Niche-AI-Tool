let isPremium = false;

// Check if client already paid (after PayPal return)
if (window.location.search.includes("paid=true")) {
  isPremium = true;
  alert("Payment successful ✅ Premium unlocked");
}

// Unlock button
document.getElementById("unlockBtn").addEventListener("click", function () {
  const code = document.getElementById("unlockCode").value.trim();

  // 🔐 ADMIN FREE ACCESS
  if (code === "sahil599") {
    isPremium = true;
    alert("Admin access granted ✅");
    return;
  }

  // 💳 CLIENT PAYMENT
  window.location.href = "/api/create-order";
});

// Generate Content button
document.getElementById("generateBtn").addEventListener("click", async function () {
  if (!isPremium) {
    alert("Please unlock premium first.");
    return;
  }

  const topic = document.getElementById("topicInput").value;

  const response = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic })
  });

  const data = await response.json();
  document.getElementById("output").value = data.content;
});
