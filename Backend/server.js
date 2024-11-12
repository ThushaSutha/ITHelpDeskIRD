

const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

//parse request of content-type - application/json
app.use(express.json());
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