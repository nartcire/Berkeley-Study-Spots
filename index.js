const express = require("express");
const path = require("path");

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Listing API Route
app.use("/", require("./api/listings"));

app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 5020;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
