const express = require('express');
const router = express.Router();
const taskModel = require("../models/TaskModel");
const userModel = require("../models/UserModel");

// api to fetch task respective to user
router.post('/', (req, res) => {
    var userEmail = req.body.useremail;

    //checking whether the user exists or not
    userModel.findOne({ email: userEmail }).then(userDoc => {
        if (userDoc != undefined && userDoc != null && userDoc != "") {

            // get tasks respective to the user
            taskModel.find({
                userRef: userDoc._id
            }).then(taskDocs => {
                var resArr = [];
                taskDocs.forEach(element => {
                    var tasksJson = {
                        Task: element.task,
                        Status: element.Status,
                        Assignee: element.username
                    }
                    resArr.push(tasksJson);
                })

                res.json({
                    statusCode: 200,
                    message: "Task retrieved successfully",
                    data: resArr
                });
            }).catch(err => {
                res.json({
                    statusCode: 500,
                    message: "Error while finding tasks " + err,
                    data: ""
                });
            })
        } else {
            res.json({
                statusCode: 500,
                message: "User not found with given emailId.",
                data: ""
            });
        }
    }).catch(err => {
        res.json({
            statusCode: 500,
            message: "Error while finding user " + err,
            data: ""
        });
    })

})

module.exports = router;