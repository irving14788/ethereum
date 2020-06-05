const path = require('path');
const fs = require('fs-extra');
const solc = require('solc');

const buildPath = path.resolve(__dirname,'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname,'contracts','Campaign.sol');
const source = fs.readFileSync(campaignPath,'utf8');


//tiene propiedades una es interface y bytecode
const output = solc.compile(source,1).contracts;

// if doesn't exists create
fs.ensureDirSync(buildPath);

for(let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath,contract.replace(':','')+".json"),
        output[contract]
    );
}
