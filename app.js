const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", engine);

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000);
