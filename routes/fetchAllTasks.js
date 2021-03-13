const express = require('express');
const router = express.Router();
const taskModel = require("../models/TaskModel");

//api to fetch all tasks irrespective to user
router.post('/',(req,res) =>{
    taskModel.find().then(taskDocs=>{
        var resArr= [];
        taskDocs.forEach(element => {
            // building response json with required fields 
            var tasksJson = {
                Task : element.task,
                Status : element.Status,
                Assignee :element.username
            }
            resArr.push(tasksJson);
        });
        res.json({
            statusCode :200,
            message : "Data retrieved successfully",
            data : resArr
        });
    }).catch(err=>{
        res.json({
            statusCode :500,
            message : "Error while finding tasks "+err,
            data : ""
        });
    })  
})

module.exports = router;