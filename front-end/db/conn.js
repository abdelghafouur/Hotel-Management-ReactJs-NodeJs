const mysql = require("mysql");


const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "gestion_hotel",
});

conn.connect((error)=>{
    if(error) throw error;
    console.log("connected !")
});

module.exports = conn