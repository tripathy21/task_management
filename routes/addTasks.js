
const express = require('express');
const router = express.Router();
const taskModel = require("../models/TaskModel");
const userModel = require("../models/UserModel");

//api to add task respective to user

router.post('/',(req,res) =>{

    var taskname = req.body.taskName;
    var status = req.body.taskStatus;
    var userEmail = req.body.userEmail;

    //get user doc for keeping the reference of it for task
    userModel.findOne({email:userEmail}).then(userDoc => {
        if(userDoc != undefined && userDoc != null && userDoc != ""){
            var task = new taskModel();
            task.Task = taskname;
            task.Status = status;
            task.userRef = userDoc._id;
            task.username = userDoc.name ;

            //save task
            task.save().then(taskDoc => {
                res.json({
                    statusCode :200,
                    message : "Task added successfully",
                    data : taskDoc
                });
            }).catch(err => {
                res.json({
                    statusCode :500,
                    message : "Error while inserting "+err,
                    data : ""
                });
            })
        } else{
            res.json({
                statusCode :500,
                message : "User not found with given emailId.",
                data : ""
            });
        }        
    }).catch(err => {
        res.json({
            statusCode :500,
            message : "Error while finding user "+err,
            data : ""
        });
    })    
})
module.exports = router;

