const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username
    const password = req.body.password

    Admin.create({
        username: username,
        password: password
    })
    .then(function(value){
        if(value){
            res.json({msg: "Admin created successfully"})
        }else{
            res.json({msg: "Could not create Admin"})
        }
    })
});

router.post('/courses', adminMiddleware, (req, res) => {
    // Implement course creation logic
    const title = req.body.title
    const description = req.body.description
    const imageLink = req.body.imageLink
    const price = req.body.price

    Course.create({
        title,
        description,
        imageLink,
        price
    })
    .then(function(value){
        if(value){
            res.json({msg: "Course created successfully", courseId: value._id})
        }else{
            res.json({msg: "Could not create Course"})
        }
    })
});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({
      
    }).then(function(response){
        res.json({
            courses: response
        })
    })
});

module.exports = router;