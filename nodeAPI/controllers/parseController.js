const readline = require('readline');
const fs = require('fs');

let data = {};
var number;
var match;
exports.parse = (req, res, filename) => {
    const readInterface = readline.createInterface({
        input: fs.createReadStream(filename),
        console: false
    });
    readInterface.on('line',  function (line){
        const array =['Solutions','Fails','Resolution time','Building time','Nodes'];
        line = line.replace('�','');

        if(line.startsWith("Nodes",1)) {
            const buffer = line.replace( /[^((\d)|(,))]/g, '');
            number = buffer.replace(/\D.*/g, '')
            match = "Nodes";
        } else {
            match = array.filter(obj => line.startsWith(obj,1));
            number = line.replace( /[^((\d)|(,))]/g, '');
        }
        if(match.length > 0) {
            data[match] = number;
        }

    }).on('close', () => {
        //console.log(data)
        res.send(data);
        readInterface.close();
        data = {};
        fs.unlinkSync(filename);
    });


}
