// script.js

const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copyBtn");
const payBtnContainer = document.getElementById("payBtnContainer");
const topicInput = document.getElementById("topic");
const adminCodeInput = document.getElementById("adminCode");

// AI Content Generation
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
    if (data.status === "success") output.value = data.content;
    else alert(data.message);
  } catch (err) {
    console.error(err);
    alert("AI generation failed.");
  }
});

// Copy Content
copyBtn.addEventListener("click", () => {
  output.select();
  document.execCommand("copy");
  alert("Copied to clipboard!");
});

// Admin Unlock
adminCodeInput.addEventListener("change", () => {
  const code = adminCodeInput.value.trim();
  if (code === "sahil599") {
    alert("Unlocked as Admin!");
  }
});

// PayPal Button
paypal.Buttons({
  createOrder: async function (data, actions) {
    const res = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: "premium" })
    });
    const dataResp = await res.json();
    if (dataResp.status === "success") return dataResp.orderId;
    else throw new Error(dataResp.message);
  },
  onApprove: async function (data, actions) {
    const res = await fetch("/api/verifyPayment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: data.orderID })
    });
    const verify = await res.json();
    if (verify.status === "success") alert("Premium Unlocked!");
    else alert(verify.message);
  },
  onError: function (err) {
    console.error(err);
    alert("Payment failed.");
  }
}).render("#payBtnContainer"); // Renders PayPal button
