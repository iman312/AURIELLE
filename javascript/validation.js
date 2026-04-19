/* ============================================
   validation.js — Client-side form validation
   Uses RegEx for all field checks
   ============================================ */

// ── RegEx patterns ──────────────────────────────────────────────
const REGEX = {
  firstName: /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,40}$/,
  lastName:  /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,40}$/,
  email:     /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/,
  password:  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_#])[A-Za-z\d@$!%*?&\-_#]{8,}$/,
  phone:     /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,4}[-\s\.]?[0-9]{4,6}$/,
  address:   /^[A-Za-z0-9\s,.\-']{5,100}$/,
  zip:       /^[0-9]{4,10}$/,
  name:      /^[A-Za-z0-9\s,.\-']{2,80}$/,
  cardNum:   /^[0-9]{13,19}$/,
  cvv:       /^[0-9]{3,4}$/,
  expiry:    /^(0[1-9]|1[0-2])\/([0-9]{2})$/
};



// Select the toggle button and the password input
const togglePassword = document.querySelector('#togglePassword');
const passwordInput = document.querySelector('#regPassword');

togglePassword.addEventListener('click', function () {
    // Check the current type of the input
    const isPassword = passwordInput.getAttribute('type') === 'password';
    
    // Switch between 'password' and 'text'
    passwordInput.setAttribute('type', isPassword ? 'text' : 'password');
    
    // Update the button text
    this.textContent = isPassword ? '🙈' : '🐵';
});

// ── Messages ────────────────────────────────────────────────────
const MESSAGES = {
  firstName: "First name must be 2–40 letters.",
  lastName:  "Last name must be 2–40 letters.",
  email:     "Please enter a valid email address.",
  password:  "Min 8 chars, include uppercase, lowercase, number & special character.",
  confirmPassword: "Passwords do not match.",
  phone:     "Please enter a valid phone number.",
  address:   "Please enter a valid address (5–100 characters).",
  zip:       "Please enter a valid postal code (4–10 digits).",
  name:      "Please enter a valid name.",
  cardNum:   "Card number must be 13–19 digits.",
  cvv:       "CVV must be 3 or 4 digits.",
  expiry:    "Use MM/YY format.",
  required:  "This field is required."
};

// ── Core validator ──────────────────────────────────────────────
function validateField(input, rule, msgEl) {
  const value = input.value.trim();

  if (!value) {
    showError(input, msgEl, MESSAGES.required);
    return false;
  }

  if (rule === "confirmPassword") {
    const passwordInput = document.getElementById("regPassword");
    if (value !== passwordInput.value) {
      showError(input, msgEl, MESSAGES.confirmPassword);
      return false;
    }
    showSuccess(input, msgEl);
    return true;
  }

  if (REGEX[rule] && !REGEX[rule].test(value)) {
    showError(input, msgEl, MESSAGES[rule] || "Invalid input.");
    return false;
  }

  showSuccess(input, msgEl);
  return true;
}

function showError(input, msgEl, text) {
  input.classList.remove("valid");
  input.classList.add("invalid");
  if (msgEl) { msgEl.textContent = text; msgEl.className = "field-msg error"; }
}

function showSuccess(input, msgEl) {
  input.classList.remove("invalid");
  input.classList.add("valid");
  if (msgEl) { msgEl.textContent = "✓"; msgEl.className = "field-msg success"; }
}

// ── Attach live validation to a field ──────────────────────────
function attachValidation(inputId, rule, msgId) {
  const input = document.getElementById(inputId);
  const msgEl = document.getElementById(msgId);
  if (!input) return;

  input.addEventListener("blur",  () => validateField(input, rule, msgEl));
  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) validateField(input, rule, msgEl);
  });
}

// ── Validate entire form and return bool ────────────────────────
function validateForm(fieldRules) {
  let allValid = true;
  fieldRules.forEach(({ inputId, rule, msgId }) => {
    const input = document.getElementById(inputId);
    const msgEl = document.getElementById(msgId);
    if (input && !validateField(input, rule, msgEl)) allValid = false;
  });
  return allValid;
}

// ── Register form validation setup ─────────────────────────────
function initRegisterValidation() {
  const fields = [
    { inputId: "firstName",       rule: "firstName",       msgId: "firstNameMsg" },
    { inputId: "lastName",        rule: "lastName",         msgId: "lastNameMsg"  },
    { inputId: "regEmail",        rule: "email",            msgId: "regEmailMsg"  },
    { inputId: "regPassword",     rule: "password",         msgId: "regPasswordMsg" },
    { inputId: "confirmPassword", rule: "confirmPassword",  msgId: "confirmMsg"   },
    { inputId: "regPhone",        rule: "phone",            msgId: "regPhoneMsg"  }
  ];

  fields.forEach(f => attachValidation(f.inputId, f.rule, f.msgId));

  // Expose global valid state for auth.js
  window.formIsValid = false;

  const form = document.getElementById("registerForm");
  if (form) {
    form.addEventListener("input", () => {
      window.formIsValid = fields.every(f => {
        const input = document.getElementById(f.inputId);
        return input && input.classList.contains("valid");
      });
    });
  }
}

// ── Login form validation ───────────────────────────────────────
function initLoginValidation() {
  attachValidation("loginEmail",    "email",  "loginEmailMsg");
  // password on login: just check not empty
  const pwInput = document.getElementById("loginPassword");
  const pwMsg   = document.getElementById("loginPasswordMsg");
  if (pwInput) {
    pwInput.addEventListener("blur", () => {
      if (!pwInput.value) showError(pwInput, pwMsg, MESSAGES.required);
      else showSuccess(pwInput, pwMsg);
    });
  }
}

// ── Order form validation ───────────────────────────────────────
function initOrderValidation() {
  const fields = [
    { inputId: "orderFirstName", rule: "firstName", msgId: "orderFirstNameMsg" },
    { inputId: "orderLastName",  rule: "lastName",  msgId: "orderLastNameMsg"  },
    { inputId: "orderEmail",     rule: "email",     msgId: "orderEmailMsg"     },
    { inputId: "orderPhone",     rule: "phone",     msgId: "orderPhoneMsg"     },
    { inputId: "orderAddress",   rule: "address",   msgId: "orderAddressMsg"   },
    { inputId: "orderZip",       rule: "zip",       msgId: "orderZipMsg"       },
    { inputId: "cardNum",        rule: "cardNum",   msgId: "cardNumMsg"        },
    { inputId: "cardExpiry",     rule: "expiry",    msgId: "cardExpiryMsg"     },
    { inputId: "cardCvv",        rule: "cvv",       msgId: "cardCvvMsg"        }
  ];
  fields.forEach(f => attachValidation(f.inputId, f.rule, f.msgId));

  // Card number spacing formatter
  const cardInput = document.getElementById("cardNum");
  if (cardInput) {
    cardInput.addEventListener("input", () => {
      let v = cardInput.value.replace(/\D/g, "").substring(0,16);
      cardInput.value = v.replace(/(.{4})/g, "$1 ").trim();
    });
  }

  // Expiry formatter
  const expiryInput = document.getElementById("cardExpiry");
  if (expiryInput) {
    expiryInput.addEventListener("input", () => {
      let v = expiryInput.value.replace(/\D/g,"").substring(0,4);
      if (v.length > 2) v = v.substring(0,2) + "/" + v.substring(2);
      expiryInput.value = v;
    });
  }

  // Order form submit
  const orderForm = document.getElementById("orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", e => {
      e.preventDefault();
      const valid = validateForm(fields);
      const alertEl = document.getElementById("orderAlert");
      if (valid) {
        // Clear cart
        localStorage.removeItem("aurielle_cart");
        alertEl.className = "alert success";
        alertEl.textContent = "✓ Order placed successfully! Thank you for shopping with Aurielle.";
        alertEl.scrollIntoView({ behavior: "smooth" });
        orderForm.reset();
      } else {
        alertEl.className = "alert error";
        alertEl.textContent = "Please correct the highlighted fields before submitting.";
        alertEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

// ── Header scroll effect (shared across pages) ──────────────────
function initHeader() {
  const header = document.getElementById("header");
  if (!header) return;

  if (header.classList.contains("dark")) return; // already set

  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 60);
  window.addEventListener("scroll", onScroll);
  onScroll();
}

// ── Init ────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  if (document.getElementById("registerForm")) initRegisterValidation();
  if (document.getElementById("loginForm"))    initLoginValidation();
  if (document.getElementById("orderForm"))    initOrderValidation();
});