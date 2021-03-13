const mongoose= require('mongoose')

const Schema = mongoose.Schema;
const taskSchema = new Schema({

    Task: {
        type : String
    },
    Status:{
        type: String
    },
    userRef:{
        "type":Schema.Types.ObjectId, ref: 'user'
    },
    username:{
        type: String
    }
},{timestamps: true});

module.exports = mongoose.model("tasks", taskSchema);