const generateBtn = document.getElementById("generateBtn");
const output = document.getElementById("output");
const topic = document.getElementById("topic");
const copyBtn = document.getElementById("copyBtn");
const payBtn = document.getElementById("payBtn");
const adminCode = document.getElementById("adminCode");

let unlocked = false;

generateBtn.addEventListener("click", async () => {

  if (!unlocked) {
    alert("Please unlock premium first.");
    return;
  }

  output.value = "Generating...";

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic: topic.value })
  });

  const data = await res.json();
  output.value = data.content;
});

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(output.value);
  alert("Copied!");
});

payBtn.addEventListener("click", () => {

  if (adminCode.value === "sahil599") {
    unlocked = true;
    alert("Admin access granted.");
    return;
  }

  window.location.href = "https://www.paypal.com/paypalme/YOURPAYPALUSERNAME/1";
});
