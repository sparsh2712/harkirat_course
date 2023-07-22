const express = require("express")
  const PORT = 3000;
  const app = express();
  
  var users = [];
  
  app.use(express.json());
  app.post("/signup", (req, res) => {
    var user = req.body;
    let userAlreadyExists = false;
    for (var i = 0; i<users.length; i++) {
      if (users[i].email === user.email) {
          userAlreadyExists = true;
          break;
      }
    }
    if (userAlreadyExists) {
      res.sendStatus(400);
    } else {
      users.push(user);
      res.status(201).send("Signup successful");
    }
  });
  
  app.post("/login", (req, res) => {
    var user = req.body;
    let userFound = null;
    for (var i = 0; i<users.length; i++) {
      if (users[i].email === user.email && users[i].password === user.password) {
          userFound = users[i];
          break;
      }
    }
  
    if (userFound) {
      res.json({
          firstName: userFound.firstName,
          lastName: userFound.lastName,
          email: userFound.email
      });
    } else {
      res.sendStatus(401);
    }
  });
  
  app.get("/data", (req, res) => {
    var email = req.headers.email;
    var password = req.headers.password;
    let userFound = false;
    for (var i = 0; i<users.length; i++) {
      if (users[i].email === email && users[i].password === password) {
          userFound = true;
          break;
      }
    }
  
    if (userFound) {
      let usersToReturn = [];
      for (let i = 0; i<users.length; i++) {
          usersToReturn.push({
              firstName: users[i].firstName,
              lastName: users[i].lastName,
              email: users[i].email
          });
      }
      res.json({
          users
      });
    } else {
      res.sendStatus(401);
    }
  });


  app.all('*', (req, res) => {
    res.status(404).send('Route not found');
  });
  
  app.listen(port,()=>{
    console.log(`example app listening on port${port}`)
  })


  
  