// Simple mock login
function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username && password) {
    localStorage.setItem("farmerUser", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Please enter both username and password!");
  }
}

// Logout
function logout() {
  localStorage.removeItem("farmerUser");
  window.location.href = "index.html";
}

// Submit idea
function submitIdea() {
  const name = document.getElementById("farmerName").value.trim();
  const crop = document.getElementById("cropType").value.trim();
  const idea = document.getElementById("idea").value.trim();

  if (!name || !crop || !idea) {
    alert("Please fill all fields!");
    return;
  }

  const ideaData = {
    name,
    crop,
    idea,
    time: new Date().toLocaleString(),
  };

  let storedIdeas = JSON.parse(localStorage.getItem("farmerIdeas")) || [];
  storedIdeas.push(ideaData);
  localStorage.setItem("farmerIdeas", JSON.stringify(storedIdeas));

  alert("✅ Idea submitted successfully!");
  document.getElementById("farmerName").value = "";
  document.getElementById("cropType").value = "";
  document.getElementById("idea").value = "";
}
