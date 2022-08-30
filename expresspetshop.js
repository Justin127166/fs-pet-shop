const fs = require('fs');
const express = require('express');
//const { type } = require('os');
const app = express();
const port = 6000;

app.get('/pets', function(req,res){
    fs.readFile("pets.json", "utf-8", (error,data) => {
        res.send(data)
    })
})

app.get('/pets/:id', function(req,res){
    const id = req.params.id
    fs.readFile("pets.json", "utf-8",(error,data)=>{
        const parseData = JSON.parse(data)
        if(id >= parseData.length || id < 0){
            res.send('No Go At This Time')
        }else{
            const stringData = JSON.stringify(parseData[id])
            res.status(200)
            res.contentType('application/json')
            res.send(stringData) 
        }
    })
})

app.listen(port, function(){
    console.log(`listening on port: ${port}`)
})