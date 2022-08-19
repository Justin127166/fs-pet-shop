var fs = require('fs')

let subCommand = process.argv[2]
let index = process.argv[3]

if (!subCommand){
    console.log("Usage: [read | create | update | detroy")
    process.exit(1)  
}
read(subCommand)
function read(){

    if(subCommand === "read"){
        fs.readFile("pets.json", "utf-8", function(error,data){
            if(error){
                console.log("Firt Mistake")
                process.exit(1)
            }else{
                let petData = JSON.parse(data)
                console.log(petData)   
            }
        })
    }else if (subCommand === "read" && index){
        fs.readFile('pets.json', 'utf-8', function(error, data){
            if(error){
                console.log('out of range')
            }else{
                console.log(petData[index])
            }
        })
    }
}





// fs.readFile('pets.json', 'utf-8',  (error, data) => {
//     JSON.parse(data)
//     if (process.argv[2]){
//         console.log(error)
//     }else{
//         console.log(data)
//     }
// })