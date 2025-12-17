document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const loginBtn = document.getElementById("loginBtn");
  const newBtn = document.getElementById("newChristiteBtn");
  const currentBtn = document.getElementById("currentChristiteBtn");
  if (loginBtn && isLoggedIn) {
    loginBtn.textContent = "Logout";
    loginBtn.href = "#";

    newBtn?.classList.remove("disabled");
    currentBtn?.classList.remove("disabled");

    loginBtn.onclick = e => {
      e.preventDefault();
      localStorage.removeItem("isLoggedIn");
      location.reload();
    };
  }


  const phoneInput = document.querySelector(".input-box");
  const getOtpBtn = document.querySelector(".login-content .cta-pill");
  if (phoneInput) {
    phoneInput.oninput = () => {
      phoneInput.value = phoneInput.value.replace(/\D/g, "");
    };
  }
  if (phoneInput && getOtpBtn) {
    getOtpBtn.onclick = () => {
      if (phoneInput.value.length !== 10) {
        alert("Enter a valid 10-digit mobile number");
        return;
      }
      location.href = "otp.html";
    };
  }

  const otpInputs = document.querySelectorAll(".otp-input");
  const verifyBtn = document.querySelector(".otp-container .cta-pill");
  const timer = document.getElementById("timer");

  if (otpInputs.length && verifyBtn && timer) {

    otpInputs.forEach((input, i) => {
      input.oninput = () => {
        input.value = input.value.replace(/\D/g, "");
        if (input.value && otpInputs[i + 1]) otpInputs[i + 1].focus();
      };

      input.onkeydown = e => {
        if (e.key === "Backspace" && !input.value && otpInputs[i - 1]) {
          otpInputs[i - 1].focus();
        }
      };
    });

    let t = 60;
    const interval = setInterval(() => {
      timer.textContent = t
        ? `Resend in 00:${String(t--).padStart(2, "0")} sec`
        : "Resend OTP";
      if (t < 0) clearInterval(interval);
    }, 1000);

    verifyBtn.onclick = () => {
      localStorage.setItem("isLoggedIn", "true");
      location.href = "index.html";
    };
  }
});