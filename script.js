document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("buy-btn");
  const contentContainer = document.getElementById("content-container");

  button.addEventListener("click", async () => {
    button.disabled = true;
    button.innerText = "Processing…";

    try {
      // 1️⃣ Simulate order creation
      const orderRes = await fetch("/api/create-order", { method: "POST" });
      const orderData = await orderRes.json();

      // 2️⃣ Simulate payment verification
      const verifyRes = await fetch("/api/verifyPayment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderID: orderData.id }),
      });
      const verifyData = await verifyRes.json();

      if (verifyData.status === "COMPLETED") {
        // 3️⃣ Generate AI content
        const aiRes = await fetch("/api/generate", { method: "POST" });
        const aiData = await aiRes.json();

        // 4️⃣ Display content
        contentContainer.innerHTML = `<p>${aiData.content}</p>`;
      } else {
        alert("Payment failed (simulated). Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Error generating content.");
    } finally {
      button.disabled = false;
      button.innerText = "Buy Content $1";
    }
  });
});
// Load after PayPal SDK
paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{ amount: { value: '1.00' } }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      // Payment completed → generate AI content
      fetch("/api/generate", { method: "POST" })
        .then(res => res.json())
        .then(data => {
          document.getElementById("content-container").innerHTML = `<p>${data.content}</p>`;
        });
    });
  }
}).render('#paypal-button-container');
paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({
      purchase_units: [{ amount: { value: '1.00' } }]
    });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(function(details) {
      // Payment completed → generate AI content
      fetch("/api/generate", { method: "POST" })
        .then(res => res.json())
        .then(data => {
          document.getElementById("content-container").innerHTML = `<p>${data.content}</p>`;
        })
        .catch(err => {
          console.error(err);
          document.getElementById("content-container").innerHTML = `<p>Error generating content.</p>`;
        });
    });
  }
}).render('#paypal-button-container');
// Get the code sent from the front-end
const { code } = req.body;
