const express = require('express');
const app = express();
const port = 3000
const fs = require('fs')
const jwt = require('jsonwebtoken')

app.use(express.json());
const secretKeyAdmin = "secretAdmin"
const secretKeyUser = "secretUser"

const generateJwtAdmin = (user)=>{
  const payload = {username: user.username}
  return jwt.sign(payload,secretKeyAdmin,{expiresIn: '1h'})
}
const generateJwtUser = (user)=>{
  const payload = {username: user.username}
  return jwt.sign(payload,secretKeyUser,{expiresIn: '1h'})
}

const authenticateJwtAdmin = (req,res,next) =>{
  const authHeader = req.headers.authorization
  if(authHeader){
    const token = authHeader.split(' ')[1]
    jwt.verify(token,secretKeyAdmin,(err,user)=>{
      if(err){
        return res.sendStatus(403)
      }
      req.user = user
      next()
    })
  } else{
    res.sendStatus(401)
  }
}
const authenticateJwtUser = (req,res,next) =>{
  const authHeader = req.headers.authorization
  if(authHeader){
    const token = authHeader.split(' ')[1]
    jwt.verify(token,secretKeyUser,(err,user)=>{
      if(err){
        return res.sendStatus(403)
      }
      req.user = user
      next()
    })
  } else{
    res.sendStatus(401)
  }
}


app.post('/admin/signup', (req, res) => {
  const newAdmin = {...req.body, id: Math.floor(Math.random()*1000000)}
  fs.readFile('adminProfile.json','utf-8', (err,data)=>{
    if (err) throw err
    const adminProfile = JSON.parse(data)
    const existingAdmin = adminProfile.find(a => a.username == req.body.username)
    if(existingAdmin){
      res.status(403).send("admin already exists")
    } else{
      adminProfile.push(newAdmin)
      const token = generateJwtAdmin(newAdmin)
      fs.writeFile('adminProfile.json',JSON.stringify(adminProfile),(err)=>{
        if (err) throw err
        res.status(201).json({message: 'admin created succesfully', token})
    })
    }
  })
});

app.post('/admin/login', (req, res) => {
  const {username, password} = req.headers
  fs.readFile('adminProfile.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const adminList = JSON.parse(data);
    const admin = adminList.find(a => a.username == username && a.password == password)
    if(admin){
      const token = generateJwtAdmin(admin)
      res.json({message: "logged in succesfully", token})
    } else{
      res.status(403).json({'message' : 'Admin authentication failed'})
    }
  })
});

app.post('/admin/courses', authenticateJwtAdmin, (req, res) => {
  const newCourse = {...req.body, courseID:  Math.floor(Math.random()*1000000)}
  fs.readFile('courses.json', 'utf-8', (err,data)=>{
    if (err) throw err
    const coursesList = JSON.parse(data)
    coursesList.push(newCourse)
    fs.writeFile('courses.json', JSON.stringify(coursesList),(err)=>{
      if (err) throw err
      res.status(201).send("course created successfully")
    })
  })
});

app.put('/admin/courses/:courseId', authenticateJwtAdmin, (req, res) => {
  const courseID = parseInt(req.params.courseId);
  fs.readFile('courses.json', 'utf-8', (err, data) => {
    if (err) throw err;
    var courseList = JSON.parse(data);
    const course = courseList.find(a => a.courseID === courseID);
    if (course) {
      Object.assign(course, req.body); //Object.assign copies values from req.body and updates them in course
      fs.writeFile('courses.json', JSON.stringify(courseList), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ message: 'Failed to update course' });
        } else {
          res.json({ message: 'Course updated successfully' });
        }
      });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
});


app.get('/admin/courses', authenticateJwtAdmin, (req, res) => {
  fs.readFile('courses.json', 'utf-8', (err,data)=>{
    if (err) throw err
    const courseList = JSON.parse(data)
    res.json(courseList)
  })
});

// User routes
app.post('/users/signup', (req, res) => {
  const newUser ={...req.body, id: Math.floor(Math.random()*1000000), courses : []}
  //The spread syntax ... is used to copy all enumerable properties from the req.body object into the new user object
  fs.readFile('userProfile.json','utf-8', (err,data)=>{
    if (err) throw err
    const userProfile = JSON.parse(data)
    const existingUser = userProfile.find(a => a.username == req.body.username)
    if(existingUser){
      res.status(403).send("admin already exists")
    } else{
      userProfile.push(newUser)
      const token = generateJwtUser(newUser)
      fs.writeFile('userProfile.json',JSON.stringify(userProfile),(err)=>{
        if (err) throw err
        res.status(201).json({message: 'user added succesfully', token})
    })
    }
  })
});

app.post('/users/login', (req, res) => {
  const {username, password} = req.headers
  fs.readFile('userProfile.json', 'utf-8', (err, data) => {
    if (err) throw err;
    const userList = JSON.parse(data);
    const user = userList.find(a => a.username == username && a.password == password)
    if(user){
      const token = generateJwtUser(user)
      res.json({message: "logged in succesfully", token})
    } else{
      res.status(403).json({'message' : 'User authentication failed'})
    }
  })
});

app.get('/users/courses', authenticateJwtUser, (req, res) => {
  fs.readFile('courses.json', 'utf-8', (err,data)=>{
    if (err) throw err
    const courseList = JSON.parse(data)
    res.json({courses: courseList.filter(c => c.published)})
  })
});

app.post('/users/courses/:courseId',authenticateJwtUser, (req, res) => {
  const courseID = parseInt(req.params.courseId)
  fs.readFile('userProfile.json', 'utf-8', (err,data)=>{
    if (err) throw err
    var userList = JSON.parse(data)
    fs.readFile('courses.json','utf-8', (err,data)=>{
      if (err) throw err
      const courseList = JSON.parse(data)
      const course = courseList.find(c => c.courseID == courseID && c.published)
      if(course){
        var user = userList.find(a => a.username == req.user.username)
        if(user){
          user.courses.push(course.courseID)
        } else {
          res.status(404).send("user not found")
        }
      } else{
        res.status(404).send("course not found")
      }
      fs.writeFile('userProfile.json',JSON.stringify(userList), (err)=>{
        if (err) throw err
        res.send("course purchased successfully")
      })
    })
  })
});

app.get('/users/purchasedCourses', authenticateJwtUser, (req, res) => {
  var username = req.headers.username
  fs.readFile('userProfile.json', 'utf-8', (err,data)=>{
    if (err) throw err
    const userList = JSON.parse(data)
    fs.readFile('courses.json','utf-8',(err,data)=>{
      if (err) throw err
      const courseList = JSON.parse(data)
      var purchasedCourses = courseList.filter(c => req.user.courses.includes(c.courseID))
      console.log(purchasedCourses)
      res.json(purchasedCourses)
    })
  })
});

//we can use indexof to get index of an element

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});