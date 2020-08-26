const express = require("express");

// Create the Express app.
const app = express();
app.use(express.urlencoded())

// Set the pug view engine.
app.set("view engine", "pug");

const guests = [];

// Define a route.
app.get("/", (req, res) => {
    res.render("index", { title: "Guest List", guests });
});
app.get("/guest", (req,res) => {
    res.render("guest-form", {title: "Guest Form"})
})
app.post("/guest", (req, res) => {
    const { fullname, email, numGuests } = req.body;
    const errors = [];

    if (!fullname) {
        errors.push("Please fill out the full name field.");
    }
    if (!email) {
        errors.push("Please fill out the email field.");
    }
    if (!numGuests || numGuests < 1) {
        errors.push("Please fill out the field for number of guests (Including Yourself!).");
    }
    if (errors.length > 0) {
        res.render("guest-form", {
            title: "Guest Form",
            errors,
            email,
            fullname,
            numGuests
        });
        return;
    }
    const guest = {
        fullname: req.body.fullname,
        email: req.body.email,
        numGuests: req.body.numGuests
    }
    guests.push(guest)
    res.redirect("/")
})

// Define a port and start listening for connections.
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));