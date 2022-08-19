const http = require("http");

const fs = require("fs");

const server = http.createServer();

const PORT = 3000;

server.on("request", (req, res) => {
  fs.readFile("pets.json", "utf-8", (error, data) => {
    if (error) {
      console.log("Not working");
    } 
    if (req.url === "/pets") {
      res.status = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(data);
    }
    const pet = req.url.split("/");
    const kennel = pet[pet.length - 1]
    if(req.url === `/pets/${kennel}`){
        res.status = 200;
        res.setHeader("Content-Type", "application/json")
        const petData = JSON.parse(data)//Just passing data
        let petDataIndex = petData[kennel]//data based off of the last input of the URL

        res.end(JSON.stringify(petDataIndex))
    }else if(kennel < 0){
        res.status = 404
        console.log('hello')
        res.setHeader("Content-Type", "text/plain")//broken
        res.end('Not found')
    }
   

    // if (pet.length > 2) {
    //   res.status == 200;
    //   res.setHeader("Content-Type", "text/plain");

    //   console.log(pet);

    // };
  });


});

server.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});