// Required modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

// ✅ MongoDB Atlas connection string (PASSWORD replace karo)
const mongoURL = "mongodb+srv://gb600018_db_user:Gokul123@entryfromcluster.yumnuj3.mongodb.net/entryDB?retryWrites=true&w=majority";

// Entry Model
const Entry = require("./models/Entry");

// App setup
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ✅ Connect MongoDB
mongoose.connect(mongoURL)
    .then(() => console.log("MongoDB Connected (Atlas Cloud)"))
    .catch(err => console.error("Mongo Error:", err));

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post("/save", async (req, res) => {
    try {
        const entry = new Entry(req.body);
        await entry.save();
        res.json({ message: "Entry Saved Successfully" });
    } catch (err) {
        res.status(500).json({ error: "Failed to save entry" });
    }
});

app.get("/entries", async (req, res) => {
    const data = await Entry.find();
    res.json(data);
});

app.put("/edit/:id", async (req, res) => {
    await Entry.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Entry Updated" });
});

app.delete("/delete/:id", async (req, res) => {
    await Entry.findByIdAndDelete(req.params.id);
    res.json({ message: "Entry Deleted" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});