

const express = require("express");
const cors = require("cors");

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
db.sequelize.sync();


app.get("/",(req,res)=>{
res.json({message:"New Test API"});
});


require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);








app.listen(PORT,()=>{
    console.log(`Server listening on ${PORT}`);
    
});