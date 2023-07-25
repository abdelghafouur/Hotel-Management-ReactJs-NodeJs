const express = require("express");
const router = new express.Router();
const conn = require("../db/conn");
const multer = require("multer");
const moment = require("moment")


// img storage confing
var imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"./uploads");
    },
    filename:(req,file,callback)=>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
});


// img filter
const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(null,Error("only image is allowd"))
    }
}

var upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})





// register userdata
router.post("/getdata",upload.single("photo"),(req,res)=>{
    const {NumChamb} = req.body;
    const {NmbCouchage} = req.body;
    const {NumEtage} = req.body;
    const {NmbBain} = req.body;
    const {Prix} = req.body;
    const {Type} = req.body;
    const {filename} = req.file;

  
    if(!NumChamb || !NmbCouchage || !NumEtage || !NmbBain || !Prix  || !Type || !filename){
        res.status(422).json({status:422,message:"fill all the details"})
    }
    
    try {
        
        
        conn.query("INSERT INTO chambre SET ?",{NumChamb:NumChamb,NumEtage:NumEtage,NmbCouchage:NmbCouchage,NmbBain:NmbBain,Type:Type,image:filename,Prix:Prix},(err,result)=>{
            if(err){
                console.log("error")
            }else{
                console.log("data added")
                res.status(201).json({status:201,data:req.body})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});

// get user data
router.get("/getdata",(req,res)=>{
    try {
        conn.query("SELECT * FROM chambre",(err,result)=>{
            if(err){
                console.log("error")
            }else{
                console.log("data get")
                res.status(201).json({status:201,data:result})
            }
        })
    } catch (error) {
        res.status(422).json({status:422,error})
    }
});
router.post('/', function(req, res){
    var mysql = req.app.get('mysql');
    var sql = "INSERT INTO pokemon (pokemonname, evolutionlevel) VALUES(?,?)";
    var sql2 = "INSERT INTO location (locationname) VALUES(?, ?)";
    var insert1 = [req.body.pokemonname, req.body.evolutionlevel];
    var insert2 = [req.body.locationname];
    var first_sql = mysql.pool.query(sql, insert1, function(error, results, fields){
        if(error){
                res.write(JSON.stringify(error));
                        res.end();
        } else {
            var second_sql = mysql.pool.query(sql2, insert2, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
            });
            res.redirect('/location');
        }
    });
})

module.exports = router;