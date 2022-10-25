const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Dave Chapelle endpoint");
})

app.listen(7777, ()=> {
    console.log('Yer listening to port 7777');
});