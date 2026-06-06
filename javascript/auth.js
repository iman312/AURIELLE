/* ============================================
   auth.js — Simulated authentication
   Uses localStorage to simulate a user session
   ============================================ */

// ── Predefined user list ────────────────────────────────────────
const USERS = [
  { id: 1, firstName: "sihem",  lastName: "ramdani",   email: "sihem@aurielle.com",  password: "Sihem123!" },
  { id: 2, firstName: "lyna", lastName: "halil",   email: "lyna@aurielle.com", password: "Lyna123@" },
  { id: 3, firstName: "roumaissa",lastName: "halil",  email: "roumaissa@aurielle.com",    password: "Roumaissa789#" },
  { id: 4, firstName: "lynda",   lastName: "makhloufi", email: "lynda@aurielle.com",   password: "lynda2005!" },
  { id: 4, firstName: "Admin",   lastName: "Aurielle", email: "admin@aurielle.com",   password: "Admin2026!" }
];

// ── Session helpers ─────────────────────────────────────────────
function saveSession(user) {
  const session = { id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email };
  localStorage.setItem("aurielle_session", JSON.stringify(session));
}

function getSession() {
  const raw = localStorage.getItem("aurielle_session");
  return raw ? JSON.parse(raw) : null;
}

function clearSession() {
  localStorage.removeItem("aurielle_session");
}

function isLoggedIn() {
  return !!getSession();
}

// ── Redirect if already logged in (for login/register pages) ───
function redirectIfLoggedIn(dest = "../index.html") {
  if (isLoggedIn()) window.location.href = dest;
}

// ── Register a new user ─────────────────────────────────────────
function registerUser(userData) {
  const allUsers = JSON.parse(localStorage.getItem("aurielle_registered") || "[]");

  const emailTaken = USERS.find(u => u.email === userData.email)
    || allUsers.find(u => u.email === userData.email);

  if (emailTaken) {
    return { success: false, message: "This email address is already registered." };
  }

  const newUser = { ...userData, id: Date.now() };
  allUsers.push(newUser);
  localStorage.setItem("aurielle_registered", JSON.stringify(allUsers));
  saveSession(newUser);
  return { success: true };
}

// ── Login ───────────────────────────────────────────────────────
function loginUser(email, password) {
  let user = USERS.find(u => u.email === email && u.password === password);

  if (!user) {
    const registered = JSON.parse(localStorage.getItem("aurielle_registered") || "[]");
    user = registered.find(u => u.email === email && u.password === password);
  }

  if (user) {
    saveSession(user);
    return { success: true, user };
  }
  return { success: false, message: "Incorrect email or password. Please try again." };
}

// ── Logout ──────────────────────────────────────────────────────
function logoutUser() {
  clearSession();
  // Determine if we're in a subpage (content/) or root
  const inSubpage = window.location.pathname.includes("/content/");
  window.location.href = inSubpage ? "../index.html" : "index.html";
}

// ── Update nav based on session ─────────────────────────────────
function updateNavAuth() {
  const session = getSession();
  const authNav = document.getElementById("navAuth");
  if (!authNav) return;

  // Determine relative path prefix based on page depth
  const inSubpage = window.location.pathname.includes("/content/");
  const prefix = inSubpage ? "" : "content/";

  if (session) {
    authNav.innerHTML = `
      <span style="color:rgba(250,248,244,0.55);font-size:0.72rem;letter-spacing:0.1em;">
        Hello, ${session.firstName}
      </span>
      <a href="#" onclick="logoutUser(); return false;" class="nav-auth-primary">
        Logout
      </a>
    `;
  } else {
    authNav.innerHTML = `
      <a href="${prefix}login.html">Login</a>
      <a href="${prefix}register.html" class="nav-auth-primary">Register</a>
    `;
  }
}

// ── Handle Login form submit ────────────────────────────────────
function handleLoginSubmit(e) {
  e.preventDefault();
  const email    = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const alertEl  = document.getElementById("loginAlert");

  if (!email || !password) {
    alertEl.className = "alert error";
    alertEl.textContent = "Please fill in both fields.";
    return;
  }

  const result = loginUser(email, password);
  if (result.success) {
    alertEl.className = "alert success";
    alertEl.textContent = `Welcome back, ${result.user.firstName}! Redirecting…`;
    setTimeout(() => { window.location.href = "../index.html"; }, 1200);
  } else {
    alertEl.className = "alert error";
    alertEl.textContent = result.message;
  }
}

// ── Handle Register form submit ─────────────────────────────────
function handleRegisterSubmit(e) {
  e.preventDefault();
  const alertEl = document.getElementById("registerAlert");

  if (!window.formIsValid) {
    alertEl.className = "alert error";
    alertEl.textContent = "Please fix the errors in the form before submitting.";
    return;
  }

  const userData = {
    firstName: document.getElementById("firstName").value.trim(),
    lastName:  document.getElementById("lastName").value.trim(),
    email:     document.getElementById("regEmail").value.trim(),
    password:  document.getElementById("regPassword").value
  };

  const result = registerUser(userData);
  if (result.success) {
    alertEl.className = "alert success";
    alertEl.textContent = "Account created! Redirecting to home…";
    setTimeout(() => { window.location.href = "../index.html"; }, 1500);
  } else {
    alertEl.className = "alert error";
    alertEl.textContent = result.message;
  }
}

// ── Init ────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  updateNavAuth();

  const loginForm    = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm)    loginForm.addEventListener("submit", handleLoginSubmit);
  if (registerForm) registerForm.addEventListener("submit", handleRegisterSubmit);
});
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const icons = document.querySelector(".nav-icons");
  const auth = document.querySelector(".nav-auth");

  if (!btn || !links || !auth) return;

  btn.addEventListener("click", () => {
    links.classList.toggle("active");
    auth.classList.toggle("active");
    if (icons) icons.classList.toggle("active");
  });
});
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {

    document.querySelector(".nav-links")?.classList.remove("active");
    document.querySelector(".nav-auth")?.classList.remove("active");
    document.querySelector(".nav-icons")?.classList.remove("active");

  });
});