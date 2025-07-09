let clickCounter = 0;
const maxClicks = 5;

// Elements
const shareBtn = document.getElementById("shareBtn");
const clickCountDisplay = document.getElementById("clickCount");
const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");
const message = document.getElementById("submissionMsg");

// Check if already submitted
if (localStorage.getItem("submitted") === "true") {
  disableForm();
}

// ✅ WhatsApp Share Button with Counter
shareBtn.addEventListener("click", () => {
  if (clickCounter < maxClicks) {
    clickCounter++;

    // ✅ Use backticks for correct URL generation
    const url = `https://wa.me/?text=${encodeURIComponent("Hey Buddy, Join Tech For Girls Community 🚀✨")}`;
    window.open(url, "_blank");

    clickCountDisplay.textContent = `Click count: ${clickCounter}/5`;

    if (clickCounter === maxClicks) {
      clickCountDisplay.textContent += " - Sharing complete. Please continue.";
    }
  } else {
    alert("✅ You have already completed sharing. Please continue with the form.");
  }
});

// ✅ Submit Registration Button
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (clickCounter < maxClicks) {
    alert("⚠ Please complete sharing before submitting.");
    return;
  }

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const college = document.getElementById("college").value;
  const screenshot = document.getElementById("screenshot").files[0];

  const formData = new FormData();
  formData.append("name", name);
  formData.append("phone", phone);
  formData.append("email", email);
  formData.append("college", college);
  formData.append("screenshot", screenshot);

  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbywcrIDhI5VnrBUMZ4QS3g6A9y2ME1kv3j9aOCXqPBL9JHmMhNqxdBvQnmmB6n-mtqMsA/exec";

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      body: formData,
    });

    const result = await response.text();

    message.classList.remove("hidden");
    form.reset();
    clickCounter = 0;
    clickCountDisplay.textContent = "Click count: 0/5";
    localStorage.setItem("submitted", "true");
    disableForm();
  } catch (error) {
    alert("❌ Submission failed. Please try again.");
    console.error("Error:", error);
  }
});

// ✅ Disable form after submission
function disableForm() {
  form.querySelectorAll("input, button").forEach((el) => el.disabled = true);
  clickCountDisplay.textContent = "✅ You have already submitted the form.";
}
