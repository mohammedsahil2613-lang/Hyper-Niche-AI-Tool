// script.js

const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");
const payBtn = document.getElementById("payBtn");
const topicInput = document.getElementById("topic");
const adminCodeInput = document.getElementById("adminCode");

generateBtn.addEventListener("click", async () => {
  const topic = topicInput.value.trim();
  if (!topic) return alert("Enter a topic first.");

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic })
    });
    const data = await res.json();
    if (data.status === "success") {
      output.value = data.content;
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("AI generation failed.");
  }
});

copyBtn.addEventListener("click", () => {
  output.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
});

payBtn.addEventListener("click", async () => {
  const adminCode = adminCodeInput.value.trim();

  // Admin unlock check
  if (adminCode === "sahil599") {
    alert("Unlocked as Admin!");
    return;
  }

  // Regular PayPal payment
  try {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: "premium" })
    });
    const data = await res.json();

    if (data.status === "success") {
      // Capture the payment
      const verify = await fetch("/api/verifyPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: data.orderId })
      }).then(r => r.json());

      if (verify.status === "success") {
        alert("Premium Unlocked!");
      } else {
        alert(verify.message);
      }
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Payment failed.");
  }
});
