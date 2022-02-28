const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
const task = require('../models/task')
const port = process.env.PORT || 8000
const app = express()


app.use(bodyParser.json())

mongoose
    .connect("mongodb://localhost:27017/tasks", {})
    .then(() => {
        console.log("Database Connected");
    })
    .catch(() => {
        console.log("Database Failed");
    });

// app.use(cors({
//     origin: '*'
// }))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (_, res) => {
    res.send("Hello")
})

app.get('/tasks', async (req, res) => {
    try {
        const data = await task.find();
        res.send(data);
        // console.log(data)
    } catch (err) {
        console.log(err);
    }
})

app.post('/add', async (req, res) => {
    try {
        const taskData = req.body;
        console.log(req.body)
        const response = await task.create(taskData)
        res.send(response)

    } catch (err) {
        console.log(err)
    }
})

app.post('/update', async (req, res) => {
    try {
        const { id, status } = req.body;
        const response = await task.updateOne({ _id: id }, { $set: { status: !status } })
        res.send(response)
    } catch (err) {
        console.log(err)
    }
})

app.post("/delete", async (req, res) => {
    try {
        const { id } = req.body;
        console.log(id)
        const response = await task.deleteOne({ _id: id })
        console.log(response)
        res.send(response)
    } catch (e) {
        console.log(e)
    }
})

app.listen(port, () => {
    console.log(`Listening at ${port}...`)
})

