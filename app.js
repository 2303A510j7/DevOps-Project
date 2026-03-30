const API = "http://localhost:3000/api";

// LOGIN
document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    if (res.ok) {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("dashboardPage").style.display = "block";
        loadDashboard();
    } else {
        document.getElementById("errorMsg").innerText = "Invalid login";
    }
});

// LOAD DATA
async function loadDashboard() {
    const res = await fetch(`${API}/dashboard`);
    const data = await res.json();

    document.getElementById("usersCount").innerText = data.users;
    document.getElementById("modelsCount").innerText = data.models;
    document.getElementById("accuracy").innerText = data.accuracy;
    document.getElementById("alerts").innerText = data.alerts;

    const table = document.getElementById("modelsTable");
    table.innerHTML = "";

    data.modelsList.forEach(m => {
        table.innerHTML += `<tr>
            <td>${m.name}</td>
            <td>${m.status}</td>
            <td>${m.accuracy}</td>
        </tr>`;
    });
}

// LOGOUT
function logout() {
    document.getElementById("dashboardPage").style.display = "none";
    document.getElementById("loginPage").style.display = "block";
}