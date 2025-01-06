const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const auth = require("./middleware/authJwt");
const path = require('path');
const db = require("../Backend/models");
const images = db.ticket_image;


const app = express();

// CORS options
var corsOptions = {
    origin: "http://localhost:5173", // Ensure this matches your client URL
};

app.use(cors(corsOptions));

//--------------------------------------------------
// Set up storage using multer
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Directory where files will be stored
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
//     }
//   });

  
// // Create an upload instance with file size limit (e.g., 10MB)
// const upload = multer({ 
//     storage,
//     limits: { fileSize: 10 * 1024 * 1024 } // File size limit of 10MB
//   });


// // Single or multiple file upload endpoint
// app.post('/upload', upload.array('file', 10), (req, res) => {
//     if (!req.files) {
//       return res.status(400).send('No files uploaded');
//     }else{
//         console.log("no upload");
//     }
  
//     // Respond with file details
//     res.send({
//       message: 'Files uploaded successfully!',
//       files: req.files
//     });
//   });

//   // Create the uploads folder if it doesn't exist
// const uploadsDir = path.join(__dirname, 'uploads');
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

//------------------------------------------------------

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





// Register other routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// require('./routes/ticket.routes')(app);
require('./routes/region.routes')(app);
require('./routes/unit.routes')(app);
require('./routes/category.routes')(app);
require('./routes/device.routes')(app);
require('./routes/company.routes')(app);
// require('./routes/image.routes')(app);

const router = require('./routes/ticket.routes')
app.use('/api/tickets', router)

// Start the server
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening on ${process.env.PORT || 8080}`);
});
