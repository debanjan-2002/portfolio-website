if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const path = require("path");
const engine = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const transporter = require("./nodemailer");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

const sessionConfig = {
    name: "session",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.engine("ejs", engine);

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.post("/contact", async (req, res) => {
    try {
        const { email, message, name } = req.body;
        const mailDetails = {
            from: `${name} <${email}>`,
            to: process.env.AUTH_EMAIL,
            subject: `Portfolio Website Contact - by ${name}`,
            text: message,
            replyTo: `${email}`
        };
        await transporter.sendMail(mailDetails);
        req.flash("success", "Email sent successfully!");
        res.redirect("/contact");
    } catch (e) {
        req.flash("error", "Couldn't send email");
        res.redirect("/contact");
    }
});

app.get("/skills", (req, res) => {
    res.render("skills");
});

app.listen(3000);
