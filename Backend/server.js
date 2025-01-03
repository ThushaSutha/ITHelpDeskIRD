const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const auth = require("./middleware/authJwt");


const config = require("./config/auth.config");
const authenticateToken = require('./config/auth');
const db = require('./models');

// Ensure the "uploads/" directory exists
const ensureDirExists = (dir) => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
};

// Call this function before the app starts
ensureDirExists("uploads/");

const app = express();

// CORS options
var corsOptions = {
    origin: "http://localhost:5173", // Ensure this matches your client URL
};

app.use(cors(corsOptions));

// Body parsers for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Sync database (don't force unless in development)
db.sequelize.sync({ alter: false });

// Routes
app.get("/", (req, res) => {
    res.json({ message: "New Test API" });
});

// Protected Route
app.get('/protected', auth.verifyToken, (req, res) => {
    res.send('This is a protected route.');
});

// Image upload setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/images");
    },
    filename: function (req, file, cb) {
        return cb(null, Date.now() + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });



// Register other routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/ticket.routes')(app);
require('./routes/region.routes')(app);
require('./routes/unit.routes')(app);
require('./routes/category.routes')(app);
require('./routes/device.routes')(app);
require('./routes/company.routes')(app);
// require('./routes/image.routes')(app);

// Start the server
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening on ${process.env.PORT || 8080}`);
});
