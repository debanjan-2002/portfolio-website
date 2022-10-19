if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const transporter = require("./nodemailer");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", engine);

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", async (req, res) => {
    const { email, message, name } = req.body;
    const mailDetails = {
        from: `${name} <${email}>`,
        to: process.env.AUTH_EMAIL,
        subject: `Portfolio Website Contact - by ${name}`,
        text: message,
        replyTo: `${email}`
    };
    await transporter.sendMail(mailDetails);
    res.redirect("/contact");
});

app.listen(3000);
