import { fetchUserData } from "./fetchUserData.js";

const loginDiv = document.getElementById("loginView");
const loginForm = document.getElementById("loginForm");
const errorDiv = document.getElementById("errorView");

// Retrieve the token from the cookie if it exists
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

const token = getCookie("token");

// If the token exists, execute queries with it
if (token) {
  await fetchUserData(token);
} else {
  loginDiv.classList.remove("hide");
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = loginForm.elements.username.value;
  const password = loginForm.elements.password.value;

  const data = {
    username: username,
    password: password,
  };

  var credStr = `${data.username}:${data.password}`;

  var byteArr = new TextEncoder().encode(credStr);

  var base64Str = btoa(String.fromCharCode.apply(null, byteArr));

  try {
    const response = await fetch("https://01.gritlab.ax/api/auth/signin", {
      method: "POST",
      headers: {
        Authorization: `Basic ${base64Str}`,
      },
      body: JSON.stringify(data),
    });

    const token = await response.json();

    errorDiv.innerHTML = "";

    if (token.error) {
      errorDiv.innerHTML = `${token.error}`;
    } else {
      // Store the token in a cookie with an expiration time
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      document.cookie = `token=${token};expires=${expires.toUTCString()}`;
      loginDiv.className = "hide";
      await fetchUserData(token);
    }
  } catch (error) {
    console.error(error);
  }
});

const logoutLink = document.getElementById("logoutLink");

logoutLink.addEventListener("click", () => {
  // Remove the token cookie
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
  // Reload the page to clear any cached data
  location.reload();
});
