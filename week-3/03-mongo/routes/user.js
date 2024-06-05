const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course, User } = require("../db");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username
    const password = req.body.password

    User.create({
        username,
        password
    })
    .then(function(response){
        if(response){
            res.json({
                msg: "User Creates Successfully!"
            })
        }else{
            res.status(403).json({msg: "Unable to create User!"})
        }
    })
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({})
    .then(function(response){
        res.json({courses: response})
    })
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;
    User.updateMany({
        username: username
    },{
        "$push" : {
            purchasedCourses  : courseId
        }
    })
    .then(function(response){
        res.json({msg: "Done!"})
    })
});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
 const user = await User.findOne({
        username: req.headers.username
    })
    // console.log(user.purchasedCourses)
    const courses = await Course.find({
        _id:{
            "$in": user.purchasedCourses
        }
    })
    res.json({
        courses
    })
});

module.exports = router