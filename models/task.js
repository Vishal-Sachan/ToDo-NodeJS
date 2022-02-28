const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
    },
    status: {
        type: Boolean
    }
})

module.exports = mongoose.model("task", taskSchema);