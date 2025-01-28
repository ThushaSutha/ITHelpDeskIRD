const express = require("express");
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const auth = require("./middleware/authJwt");
const path = require('path');
const db = require("../Backend/models");
const images = db.ticket_image;
const mysql = require('mysql2');
const dbconfig = require('./config/db.config');
const database = mysql.createConnection({
    host: dbconfig.HOST,
    user: dbconfig.USER,
    password: dbconfig.PASSWORD,
    database: dbconfig.DB

});

//for pdf library import 
const puppeteer = require('puppeteer');


const app = express();

// CORS options
var corsOptions = {
    origin: "http://localhost:5173", // Ensure this matches your client URL
};

app.use(cors(corsOptions));

//--------------------------------------------------
//for pdf 
app.use(express.static(__dirname));

app.get('/data', (request, response) => {
    response.sendFile(__dirname + '/data.html');
});

app.post('/getData', (request, response) => {
    database.query('SELECT * FROM tickets', async (error, results) => {
        response.status(200).json(results);
    });
});

async function convertHTMLToPDF(htmlContent, pdfFilePath, margins = { top: '10mm', right: '10mm', bottom: '10mm', left: '10mm' }) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // Set the page content
    await page.setContent(htmlContent);
    // Generate PDF
    await page.pdf({ path: pdfFilePath, format: 'A4', margin: margins });
    // Open the generated PDF file in the default PDF viewer
    const open = await import('open');
    await open.default(pdfFilePath);
    //close the browser
    await browser.close();
}

app.get('/convertPDF', async (request, response) => {
    database.query('SELECT * FROM tickets', async (error, results) => {
        let html = '';
        if (results.length > 0) {
            html += `
            <table width="100%" border="1" cellpadding="5" cellspacing="0">
                <tr>
                    <th width="20%">ID</th>
                    <th width="10%">Description</th>
                    <th width="20%">Status</th>
                    <th width="20%">User ID</th>
                    <th width="10%">Assigned to</th>
                    <th width="10%">Category</th>
                    <th width="10%">Created at</th>
                </tr>
            `;
            results.map((row) => {
                html += `
                <tr>
                    <th>${row.id}</th>
                    <th>${row.description}</th>
                    <th>${row.status}</th>
                    <th>${row.user_id}</th>
                    <th>${row.assigned_to}</th>
                    <th>${row.category_id}</th>
                    <th>${row.createAt}</th>
                </tr>
                `;
            });
            html += `
            </table>
            `;
        }
        const date = new Date();

        const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get month (1-based) and pad with 0
        const year = date.getFullYear().toString().slice(-2); // Get last two digits of the year

        console.log("New value:", `${month}-${year}`);
        await convertHTMLToPDF(html, `./public/Report/Ticket/${month}-${year}-data.pdf`);
    });
});



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


//
app.use('/uploads', express.static('uploads'));


// Register other routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
// require('./routes/ticket.routes')(app);
require('./routes/region.routes')(app);
require('./routes/unit.routes')(app);
require('./routes/category.routes')(app);
require('./routes/device.routes')(app);
require('./routes/company.routes')(app);
require('./routes/image.routes')(app);

const router = require('./routes/ticket.routes');
const dbConfig = require("./config/db.config");
app.use('/api/tickets', router)

// Start the server
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server listening on ${process.env.PORT || 8080}`);
});
