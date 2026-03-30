const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// LOGIN API
app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "1234") {
        res.json({ success: true });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
});

// DASHBOARD API
app.get("/api/dashboard", (req, res) => {
    res.json({
        users: 1200,
        models: 8,
        accuracy: "94%",
        alerts: 3,

        modelsList: [
            { name: "X-ray AI", status: "Active", accuracy: "95%" },
            { name: "MRI AI", status: "Training", accuracy: "89%" },
            { name: "CT Scan AI", status: "Active", accuracy: "92%" }
        ]
    });
});

// START SERVER
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});