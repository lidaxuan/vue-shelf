const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 5179;
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // 允许任意来源
  next();
});

app.get("/open", (req, res) => {
  const file = req.query.file;
  if (!file) return res.status(400).send("Missing file");

  // VSCode
  exec(`code -g "${file}"`, err => {
    if (err) {
      console.error("打开失败:", err);
      return res.status(500).send("Failed to open file");
    }
    res.send("OK");
  });
});

app.listen(PORT, () => {
  console.log(`Inspector server running at http://127.0.0.1:${PORT}`);
});
