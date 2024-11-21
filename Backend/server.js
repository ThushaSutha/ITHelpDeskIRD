

const express = require("express");
const cors = require("cors");

const config = require("./config/auth.config");
const authenticateToken = require('./config/auth');
const auth = require("./middleware/authJwt")

const PORT = process.env.PORT || 8080;

const app = express();
var corsOptions = {
    origin: "http://localhost:5173"
  };
  
  app.use(cors(corsOptions))

//parse request of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync({alter: false});

//for development purpose
// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });


app.get("/",(req,res)=>{
res.json({message:"New Test API"});
});






// Protected Route
app.get('/protected', auth.verifyToken, (req, res) => {
    res.send('This is a protected route.');
});

require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/ticket.routes')(app);








app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
    
});

app.listen();