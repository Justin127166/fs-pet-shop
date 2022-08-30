const express = require('express')
const app = express()
const fs = require('fs')
const port = 5000
app.use(express.json())

app.post('/pets', (req, res)=>{
    let newData = req.body
    fs.readFile('./pets.json', 'utf8', (err,data) =>{
        let currentData = JSON.parse(data)
        currentData.push(newData)
        const combined = JSON.stringify(currentData)
        fs.writeFile('./pets.json', combined, (err)=>{
            res.status(200)
            res.contentType('appliction/json')
            res.send(newData)
        })
    })
})

app.get('/pets', function(req,res){
    fs.readFile('pets.json', 'utf-8', function(err,data){
        const parseData = JSON.parse(data)
        res.send(parseData)
    })
})

app.get('/pets/:id', function(req, res){
    const id = req.params.id
    fs.readFile('pets.json', 'utf-8', function(err,data){
        const parseData = JSON.parse(data)
        if(id > parseData.length || id < 0){
            res.send('NO GO')
        }else {
            //const stringData = JSON.stringify(parseData[id]) 
            res.status(200)
            res.contentType('appliction/json')
            res.send(parseData[id])
        }
    })
})

app.delete('/pets/:id', function(req,res){
    const id = req.params.id
    fs.readFile('pets.json', 'utf-8', function(err,data){
        const parseData = JSON.parse(data)
        let newData = parseData.splice(id, 1)
        let jsondata = JSON.stringify(parseData)
        fs.writeFile('./pets.json',jsondata, 'utf-8', (err) =>{
            res.send(parseData)
        })
    })
})

app.patch('/pets/:id', (req, res) => {
    const id = req.params.id
    const addData = req.body
    fs.readFile('./pets.json', 'utf-8', (err, data) => {
        if (err) throw err;
        const parseData = JSON.parse(data)
        const objData = parseData[id]
        objData.name = addData.name
        const stringData = JSON.stringify(parseData)
        console.log(stringData)
        fs.writeFile('./pets.json', stringData, (err) => {
            if (err) throw err
            res.status(200)
            res.contentType('application/json')
            res.send(objData)
        })
    })
})


app.listen(port, function(){
    console.log(`listening on port: ${port}`)
})