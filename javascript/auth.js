/* ============================================
   auth.js — Simulated authentication
   Uses localStorage to simulate a user session
   ============================================ */

// ── Predefined user list ────────────────────────────────────────
const USERS = [
  { id: 1, firstName: "Sophie",  lastName: "Martin",   email: "sophie@aurielle.com",  password: "Sophie123!" },
  { id: 2, firstName: "Camille", lastName: "Dubois",   email: "camille@aurielle.com", password: "Camille456@" },
  { id: 3, firstName: "Emma",    lastName: "Leclerc",  email: "emma@aurielle.com",    password: "Emma789#" },
  { id: 4, firstName: "Admin",   lastName: "Aurielle", email: "admin@aurielle.com",   password: "Admin2025!" }
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

  // Check email not already taken
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
  // Check built-in users first
  let user = USERS.find(u => u.email === email && u.password === password);

  // Then check registered users
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
  window.location.href = "../index.html";
}

// ── Update nav based on session ─────────────────────────────────
function updateNavAuth() {
  const session = getSession();
  const authNav = document.getElementById("navAuth");
  if (!authNav) return;

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
      <a href="content/login.html">Login</a>
      <a href="content/register.html" class="nav-auth-primary">Register</a>
    `;
  }
}

// ── Handle Login form submit ────────────────────────────────────
function handleLoginSubmit(e) {
  e.preventDefault();
  const email    = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const alertEl  = document.getElementById("loginAlert");

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

  // Run final validation check
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