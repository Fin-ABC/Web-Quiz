// Card swap animation logic
const loginCard = document.getElementById("loginCard");
const registerCard = document.getElementById("registerCard");
const toRegister = document.getElementById("toRegister");
const toLogin = document.getElementById("toLogin");
const registerForm = document.getElementById("registerForm");
const backgroundCard = document.getElementById("backgroundCard");

const btnRegister = document.getElementById("btn-register");
const btnLogin = document.getElementById("btn-login");

const logUsername = document.getElementById("log-username");
const logPassword = document.getElementById("log-password");
const regUsername = document.getElementById("reg-username");
const regPassword = document.getElementById("reg-password");
const regConfirm = document.getElementById("reg-confirm");

// Panggil card Register
function showRegister() {
  loginCard.classList.add(
    "translate-x-full",
    "opacity-0",
    "pointer-events-none",
  );
  registerCard.classList.remove(
    "translate-x-0",
    "pointer-events-none",
    "sm:-rotate-6",
  );
  registerCard.classList.add("translate-x-0", "z-20");
  registerForm.classList.remove("hidden");

  logUsername.value = "";
  logPassword.value = "";
}
// Panggil card Login
function showLogin() {
  loginCard.classList.remove(
    "translate-x-full",
    "opacity-0",
    "pointer-events-none",
  );
  loginCard.classList.add("z-20");
  registerCard.classList.add(
    "translate-x-0",
    "pointer-events-none",
    "sm:-rotate-6",
  );
  registerCard.classList.remove("opacity-100", "z-20");
  registerForm.classList.add("hidden");

  regUsername.value = "";
  regPassword.value = "";
  regConfirm.value = "";
}

// Awal Kewajiban
showLogin();

toRegister.addEventListener("click", showRegister);
toLogin.addEventListener("click", showLogin);

// Backend Systen

function register() {
  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: regUsername.value,
      password: regPassword.value,
      confirm: regConfirm.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        showAlertSuccess(data.message);
        showLogin();
      } else {
        showAlertError(data.error);
      }
    })
    .catch((err) => showAlertError(err.message));
}

function login() {
  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: logUsername.value,
      password: logPassword.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        showAlertSuccess("Login berhasil!");
        setTimeout(() => {
          window.location.href = "../index.html"; // Ganti dengan halaman utama Anda
        }, 1000);
      } else {
        showAlertError(data.error);
      }
    })
    .catch((err) => console.error(err));
}

btnRegister.addEventListener("click", register);
btnLogin.addEventListener("click", login);

const teksValidPwReg = document.getElementById(
  "teks-validasi-password-register",
);
const teksValidUserReg = document.getElementById("teks-username-register");

regUsername.addEventListener("input", () => {
  const regex = /^[a-zA-Z0-9]+$/;
  if (
    regUsername.value.length < 4 ||
    regUsername.value.length > 16 ||
    !regex.test(regUsername.value)
  ) {
    teksValidUserReg.classList.remove("hidden");
    btnRegister.disabled = true;
    btnRegister.style.opacity = 0.5;
  } else {
    teksValidUserReg.classList.add("hidden");
    btnRegister.disabled = false;
    btnRegister.style.opacity = 1;
  }
});

regPassword.addEventListener("input", () => {
  if (regPassword.value.length < 8 || regPassword.value.length > 16) {
    teksValidPwReg.classList.remove("hidden");
    btnRegister.disabled = true;
    btnRegister.style.opacity = 0.5;
  } else {
    teksValidPwReg.classList.add("hidden");
    btnRegister.disabled = false;
    btnRegister.style.opacity = 1;
  }
});
