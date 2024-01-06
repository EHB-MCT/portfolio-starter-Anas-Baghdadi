
// const express = require("express");
// const app = express();

// /**
//  * GET endpoint, providing hello world
//  * 
//  * @param
//  * @returns
//  */

// app.get("/", (req, res) => {
//     res.send({ message: "hello"})
// })

// app.listen(3000, (err) => {
//     if(!err) {
//         console.log("running on port" + 3000);
//     }
//     else{
//         console.error(err)
//     }
// })


const app = require("./app.js")
const port = 3000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port} `);
});