const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const router = require("./routes/router")
require("./db/conn");
//// kkkkkkkkkkkkkkkkk
const app = express();
const port = 4000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gestion_hotel",
});
app.listen(port, () => {
  console.log("working on port" + port);
});
app.use(cors());
app.use(express.json());


app.use("/uploads",express.static("./uploads"))
app.use(router)

// main code
app.get("/MyreservationsCl/:IdRes/:IdCl", (req, res) => {
  const IdRes = req.params.IdRes;
  const sql = "SELECT * FROM reservationn where IdRes = ?";
  db.query(sql, [IdRes], (err, result) => {
    if (!err) {
      const rows = result.length === 0;
      if (rows) {
        res.send("User not found");
      } else {
        res.send(result);
      }
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});
// hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
app.get("/MyreservationsCl/:IdCl", (req, res) => {
  const IdCl = req.params.IdCl;
  const sql = "SELECT * FROM reservationn where IdCln = ?";
  db.query(sql, [IdCl], (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});


app.get("/Myreservations", (req, res) => {
  
  const sql = "SELECT * FROM reservationn ";
  db.query(sql, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
      res.send("Operation Failed  ");
    }
  });
});
// ######################


  // #############################


  app.put("/MyreservationsCl/:IdRes", (req, res) => {
    const IdRes = req.params.IdRes;
    const data = [req.body.DateDebut, req.body.NmbrNuits, IdRes];
    const sql = "UPDATE reservationn   INNER JOIN chambre on reservationn.NumChambr =chambre.NumChamb SET DateDebut = ? ,NmbrNuits = ?,PrixTotal = Prix *NmbrNuits WHERE IdRes = ?";
    db.query(sql, data, (err, result) => {
      if (!err) {
        if (result.affectedRows > 0) {
          res.send("reservation Updated Successfully");
        } else {
          res.send("reservation not found");
        }
      } else {
        console.log(err);
        res.send("Operation Failed");
      }
    });
  });
  // delete user
  app.delete("/MyreservationsCl/:IdRes", (req, res) => {
    const IdRes = req.params.IdRes;
    const sql = "Delete from reservationn where IdRes = ?";
    db.query(sql, [IdRes], (err, result) => {
      if (!err) {
        if (result.affectedRows > 0) {
          res.send("User Deleted Successfully");
        } else {
          res.send("User not found");
        }
      } else {
        console.log(err);
        res.send("Operation Failed");
      }
    });
  });


  // get all users from db
app.get("/Chambres", (req, res) => {
  const sql = "SELECT * FROM chambre";
  db.query(sql, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});

app.get("/Chambres/:NumChamb", (req, res) => {
  const NumChamb = req.params.NumChamb;
  const sql = "SELECT * FROM chambre where NumChamb = ?";
  db.query(sql,[NumChamb] ,(err, result) => {
    if (!err) {
      const rows = result.length === 0;
      if (rows) {
        res.send("User not found");
      } else {
        res.send(result);
      }
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});
// update chambre
app.put("/Chambres/:NumChamb", (req, res) => {
  const NumChamb = req.params.NumChamb;
  const data = [req.body.NmbCouchage, req.body.NmbBain, req.body.Prix, req.body.Type, NumChamb];
  const sql = "UPDATE chambre SET NmbCouchage = ?, NmbBain = ? , Prix = ?, Type = ? WHERE NumChamb = ?";
  db.query(sql, data, (err, result) => {
    if (!err) {
      if (result.affectedRows > 0) {
        res.send("chambre Updated Successfully");
      } else {
        res.send("chambre not found");
      }
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});
// delete chambre
app.delete("/Chambres/:NumChamb", (req, res) => {
  const NumChamb = req.params.NumChamb;
  const sql = "Delete from chambre where NumChamb = ?";
  db.query(sql, [NumChamb], (err, result) => {
    if (!err) {
      if (result.affectedRows > 0) {
        res.send("Chambre Deleted Successfully");
      } else {
        res.send("chambre not found");
      }
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});


app.delete("/users/:IdCl", (req, res) => {
  const IdCl = req.params.IdCl;
  const sql = "Delete from client where IdCl = ?";
  db.query(sql, [IdCl], (err, result) => {
    if (!err) {
      if (result.affectedRows > 0) {
        res.send("Chambre Deleted Successfully");
      } else {
        res.send("chambre not found");
      }
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});


app.get("/users", (req, res) => {
  const sql = "SELECT * FROM client where Role = 'user' ";
  db.query(sql, (err, result) => {
    if (!err) {
      res.send(result);
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});
// inser new user >???????????????????????????????????????????/

app.post("/User", (req, res) => {
  const data1 = [req.body.Nom, req.body.Prenom, req.body.Email, req.body.Tele, req.body.Adresse, req.body.User,req.body.Password];
  const sql1 = "INSERT INTO client VALUES(null,?,?,?,?,?,?,?,'user')";
  db.query(sql1, data1, (err, result) => {
    if (!err) {
      res.send("user added Successfully");
    } else {
      console.log(err)
      res.send("Operation Failed in reservation");
    }
  });
  });
  /*
app.post("/User", (req, res) => {
  const data1 = [req.body.Nom, req.body.Prenom, req.body.Email, req.body.Tele, req.body.Adresse];
  const data2 = [req.body.User, req.body.Password];
  const sql1 = "INSERT INTO client VALUES(null,?,?,?,?,?)";
  const sql2 = "INSERT INTO compte VALUES(null,?,?,null,1";
  db.query(sql1, data1, (err, result) => {
    if (!err) {
      
      res.send("user added Successfully");
    } else {
      db.query(sql2, data2, (err, result) => {
        if (!err) {
          
          res.send("user added Successfully");
        } else {
          console.log(err)
          res.send("Operation Failed in reservation");
        }
      });
      console.log(err)
      res.send("Operation Failed in reservation");
    }
  });
  });
*/
/*
app.post("/User", (req, res) => {
  const data1 = [req.body.Nom, req.body.Prenom, req.body.Email, req.body.Tele, req.body.Adresse, req.body.User, req.body.Password];
  const sql = "BEGIN;INSERT INTO client VALUES(null,?,?,?,?,?);INSERT INTO compte VALUES(null,?,?,null,LAST_INSERT_ID());COMMIT;";
  db.query(sql, data1, (err, result) => {
    if (!err) {
      
      res.send("user added Successfully");
    } else {
      console.log(err)
      res.send("Operation Failed in reservation");
    }
  });
  });

*/
//// #################

app.get("/Chambres/:NumChamb", (req, res) => {
  const NumChamb = req.params.NumChamb;
  const sql = "SELECT * FROM chambre where NumChamb = ?";
  db.query(sql, [NumChamb], (err, result) => {
    if (!err) {
      const rows = result.length === 0;
      if (rows) {
        res.send("chambre not found");
      } else {
        res.send(result);
      }
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});

// ###############
app.post("/Myreservations", (req, res) => {
  const data = [req.body.DateRes, req.body.DateDebut, req.body.NmbrNuits, req.body.PrixTotal, req.body.IdCln, req.body.NumChamb];
  const sql = "INSERT INTO reservationn VALUES (Null,?,?,?,?,?,?)";
  db.query(sql, data, (err, result) => {
    if (!err) {
      res.send("user added Successfully");
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});


//// ################

app.get("/compte/:User/:Password", (req, res) => {
  const User = req.params.User;
  const Password = req.params.Password;
  const sql = "SELECT * FROM client where User = ? and Password = ?";
  db.query(sql, [User,Password], (err, result) => {
    if (!err) {
      const rows = result.length === 0;
      if (rows) {
        
        res.send("User not found");
        
      } else {
        res.send(result);
        
      }
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});

// hhhhhhhhhhhhhhhhhhhhhhhhhhh
app.get("/client/:IdCl", (req, res) => {
  const IdCl = req.params.IdCl;
  const sql = "SELECT * FROM client where IdCl = ?";
  db.query(sql, [IdCl], (err, result) => {
    if (!err) {
      const rows = result.length === 0;
      if (rows) {
        res.send("client not found");
      } else {
        res.send(result);
      }
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});

////////// hhhhhhhhhhhhhhhhhhhhhhhhhhh
app.get("/MyProfile/:IdCl", (req, res) => {
  const IdCl = req.params.IdCl;
  const sql = "SELECT * FROM client  where IdCl = ?";
  db.query(sql, [IdCl], (err, result) => {
    if (!err) {
      const rows = result.length === 0;
      if (rows) {
        res.send("User not found");
      } else {
        res.send(result);
      }
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});

// update user
app.put("/MyProfile/:IdCl", (req, res) => {
  const IdCl = req.params.IdCl;
  const data = [req.body.Nom, req.body.Prenom, req.body.Email, req.body.Tele, req.body.Adresse, req.body.User, req.body.Password, IdCl];
  const sql = "UPDATE  client  set Nom =? , Prenom = ? , Email = ?, Tele = ?, Adresse = ?, User = ? , Password = ? WHERE IdCl = ? ";
  db.query(sql, data, (err, result) => {
    if (!err) {
      if (result.affectedRows > 0) {
        res.send("User Updated Successfully");
      } else {
        res.send("User not found");
      }
    } else {
      console.log(err);
      res.send("Operation Failed");
    }
  });
});