const readline = require('readline');
const fs = require('fs');

let data = [];
exports.parse = (req, res, filename) => {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(filename),
        console: false
    });
    readInterface.on('line',  function (line){
        const array =['Solutions','Fails','Resolution time','Building time','Nodes'];
        line = line.replace('�','');
        const match = array.filter(obj => line.startsWith(obj,1));
        const number = line.replace( /^\D+/g, '');
        if(match.length > 0) {
            const donneeFinal = match + ":" + number;
            data.push(donneeFinal);
        }


    /*  function(line) {
      if(line.includes("Solutions")) {
          line = line.replace('�','');
          const number = line.replace( /^\D+/g, '');
          data.push(number);
      }*/
    }).on('close', () => {
        console.log(data)
        res.send(data);
        readInterface.close();
        data = [];
    });


}
