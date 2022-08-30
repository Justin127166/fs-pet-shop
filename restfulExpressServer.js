const express = require('express')
const app = express()
const port = 5000
const{Pool} = require ('pg')
// const fs = require('fs')
 app.use(express.json())

const pool = new Pool({
    user: 'justi',
    password: 'Justin#127166',
    host: 'localhost',
    port: 5432,
    database: 'pets'
})

app.get('/', async (req, res)=>{
    try{
        let result = await pool.query('SELECT * FROM the_pets');
        res.send(result.rows)
    }catch (error) {
        console.log(err)
    }
})


app.get('/pets/:id', async (req, res)=>{
    try{
        const {id} = req.params
        let {rows} = await pool.query('SELECT * FROM the_pets WHERE pets_id = $1', [id]  )
        res.send(rows)
    }catch (error) {
        
        console.error(error.message)
    }
})



app.post('/pets', async (req, res)=>{
    try{
        let {name, age, kind} = req.body
        const result = await pool.query('INSERT INTO the_pets (name, age, kind) VALUES ($1,$2,$3)',[name, age, kind])
        const rows = result.rows;
        res.send(rows)
    }catch(error){
        console.error(error.message)
    }
})


app.delete('/pets/:id', async(req,res)=>{
    const {id} = req.params
    try{
        let gone = await pool.query('DELETE FROM the_pets WHERE pets_id = $1', [id])
        let rows = gone.rows
        res.send(rows)
    }catch(error){
        console.error(error)
    }
})

app.patch('/pets/:id', async(req,res)=>{
    const {id} = req.params
    try{
        const {name, age, kind} = req.body
        let update = await pool.query('UPDATE the_pets SET name = $1, age = $2, kind = $3 WHERE pets_id = $4', [name, age, kind, id])
        let rows = update.rows
        res.send(rows)
    }catch  (error){
        console.error(error)
    }
})

app.listen(port, ()=>{
    console.log('listening on port:' + port)
})



















// app.post('/pets', (req, res)=>{
//     let newData = req.body
//     fs.readFile('./pets.json', 'utf8', (err,data) =>{
//         let currentData = JSON.parse(data)
//         currentData.push(newData)
//         const combined = JSON.stringify(currentData)
//         fs.writeFile('./pets.json', combined, (err)=>{
//             res.status(200)
//             res.contentType('appliction/json')
//             res.send(newData)
//         })
//     })
// })

// app.get('/pets', function(req,res){
//     fs.readFile('pets.json', 'utf-8', function(err,data){
//         const parseData = JSON.parse(data)
//         res.send(parseData)
//     })
// })

// app.get('/pets/:id', function(req, res){
//     const id = req.params.id
//     fs.readFile('pets.json', 'utf-8', function(err,data){
//         const parseData = JSON.parse(data)
//         if(id > parseData.length || id < 0){
//             res.send('NO GO')
//         }else {
//             //const stringData = JSON.stringify(parseData[id]) 
//             res.status(200)
//             res.contentType('appliction/json')
//             res.send(parseData[id])
//         }
//     })
// })

// app.delete('/pets/:id', function(req,res){
//     const id = req.params.id
//     fs.readFile('pets.json', 'utf-8', function(err,data){
//         const parseData = JSON.parse(data)
//         let newData = parseData.splice(id, 1)
//         let jsondata = JSON.stringify(parseData)
//         fs.writeFile('./pets.json',jsondata, 'utf-8', (err) =>{
//             res.send(parseData)
//         })
//     })
// })

// app.patch('/pets/:id', (req, res) => {
//     const id = req.params.id
//     const addData = req.body
//     fs.readFile('./pets.json', 'utf-8', (err, data) => {
//         if (err) throw err;
//         const parseData = JSON.parse(data)
//         const objData = parseData[id]
//         objData.name = addData.name
//         const stringData = JSON.stringify(parseData)
//         console.log(stringData)
//         fs.writeFile('./pets.json', stringData, (err) => {
//             if (err) throw err
//             res.status(200)
//             res.contentType('application/json')
//             res.send(objData)
//         })
//     })
// })


// app.listen(port, function(){
//     console.log(`listening on port: ${port}`)
// })

