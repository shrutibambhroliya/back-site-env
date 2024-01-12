const express = require('express');
const router = express.Router();
const Main = require('./schema/mainSchema');

const jwt = require('jsonwebtoken');
const jwtKey = 'abcd';

router.get('/get-data', async (req, res) => {
    try {
        const getData = await Main.find({});
        res.status(200).send(getData)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
});

router.post('/create-data', async (req, res) => {
    try {
        const createData = await Main.create({
            UserName: req.body.username,
            Name: req.body.name,
            Email: req.body.email,
            Password: req.body.password
        });
        res.status.send(createData)
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
});

router.get('/edit-data/:id', async (req, res) => {
    try {
        const editData = await Main.findById(req.params.id);
        res.status(200).send(editData);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error.message)
    }
});

router.put('/update-data/:id', async (req, res) => {
    try {
        const updateData = await Main.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send(updateData)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
});

router.delete('/delete-data/:id', verify, async (req, res) => {
    try {
        const deleteData = await Main.findByIdAndDelete(req.params.id);
        jwt.sign({ deleteData }, jwtKey, { expiresIn: "1min" }, (error, token) => {
            if (error) {
                res.status(400).send(error)
            } else {
                res.status(200).send({ deleteData, token })
            }
        })
        // res.status(200).send(deleteData)
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})

function verify(req, res, next) {
    const getToken = req.headers['authentication'];
    if (getToken) {
        jwt.verify(getToken, jwtKey, (error, valid) => {
            if (error) {
                res.status(500).send(error)
            } else {
                next()
            }
        })
    } else {
        res.send("token not found")
    }
}



module.exports = router