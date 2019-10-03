// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Tables and Waitlist Reservations (DATA)
// =============================================================
var tables = [{
        name: "Caren",
        email: "caren@caren.com",
        phoneNumber: "123456789",
        userID: "c"
    },
    {
        name: "Jeff",
        email: "jeff@jeff.com",
        phoneNumber: "123456789",
        userID: "J"
    }
];
var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/api/tables", function(req, res) {
    return res.json(tables);
});

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

// Displays a single character, or returns false
app.get("/api/tables/:table", function(req, res) {
    var chosen = req.params.table;

    console.log(chosen);

    for (var i = 0; i < tables.length; i++) {
        if (chosen === tables[i].name) {
            return res.json(tables[i]);
        }
    }

    return res.json(false);
});

// Create New Tables - takes in JSON input
app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newTable = req.body;
    console.log(newTable);
    // console.log(newTable.name);

    // Using a RegEx Pattern to remove spaces from newTable
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    // newTable.name = newTable.name.replace(/\s+/g, "").toLowerCase();

    if (tables.length < 5) {
        tables.push(newTable);
        res.send(true);
    } else {
        waitlist.push(newTable);
        res.send(false);
    }
});

app.post("/api/clear", function(req, res) {
    tables = [];
    waitlist = [];
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});