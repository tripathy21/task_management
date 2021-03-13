const express = require('express');
const router = express.Router();
const taskModel = require("../models/TaskModel");
const userModel = require("../models/UserModel");

//api to update task status
router.post('/', (req, res) => {
    var taskname = req.body.taskName;
    var status = req.body.taskStatus;
    var userEmail = req.body.userEmail;

    userModel.findOne({ email: userEmail }).then(userDoc => {
        if (userDoc != undefined && userDoc != null && userDoc != "") {

            taskModel.findOne({
                $and: [
                    { Task: taskname },
                    { userRef: userDoc._id }
                ]
            }).then(taskDoc => {
                if (taskDoc != undefined && taskDoc != null && taskDoc != "") {
                    taskModel.update({
                        $and: [
                            { Task: taskname },
                            { userRef: userDoc._id  }
                        ]
                    }, {
                        $set: {
                            Status: status
                        }
                    }).then(updatedTaskDoc => {
                        res.json({
                            statusCode: 200,
                            message: "Task Status updated successfully ",
                            data: ""
                        });
                    }).catch(err => {
                        res.json({
                            statusCode: 500,
                            message: "Error while updating task " + err,
                            data: ""
                        });
                    })
                } else {
                    res.json({
                        statusCode: 500,
                        message: "Task not found.",
                        data: ""
                    });
                }

            }).catch(err => {
                res.json({
                    statusCode: 500,
                    message: "Error while finding task " + err,
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

