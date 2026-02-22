// Generate Content button (Sahil599 test code OR topic input)
document.getElementById("generate-btn").addEventListener("click", async () => {
  const code = document.getElementById("test-code-input").value.trim();
  const topic = document.getElementById("topic").value.trim();
  const output = document.getElementById("output");

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, topic })
    });

    const data = await res.json();

    output.value = data.content || data.error || "No content generated.";
  } catch (err) {
    output.value = "Error generating content.";
    console.error(err);
  }
});

// Copy Content button
document.getElementById("copy-btn").addEventListener("click", () => {
  const output = document.getElementById("output");
  output.select();
  navigator.clipboard.writeText(output.value);
  alert("Content copied!");
});

// PayPal button for $1 payment
paypal.Buttons({
  createOrder: function(data, actions) {
    return actions.order.create({ purchase_units: [{ amount: { value: '1.00' } }] });
  },
  onApprove: function(data, actions) {
    return actions.order.capture().then(async function(details) {
      const topic = document.getElementById("topic").value.trim();
      const output = document.getElementById("output");

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code: "", topic })
        });

        const data = await res.json();
        output.value = data.content || "No content generated.";
      } catch (err) {
        output.value = "Error generating content after payment.";
        console.error(err);
      }
    });
  }
}).render('#paypal-button-container');
