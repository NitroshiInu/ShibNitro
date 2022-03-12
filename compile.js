const path = require('path');
const fs = require('fs');
const solc = require('solc');

const ShibNitroPath = path.resolve(__dirname,'contract', 'ShibNitro.sol');
const source = fs.readFileSync(ShibNitroPath, 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'ShibNitro.sol': {

            content: source
        }
    },

    settings: {

        outputSelection: {

            '*':{

                '*':['*']
            }
        }
    }

};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
var contract = output.contracts['ShibNitro.sol']['ShibNitro'];
var dirName = 'bin';
const contractByteCodePath = path.join(dirName, 'ShibNitro.bin');
fs.writeFileSync(contractByteCodePath, contract.evm.bytecode.object);

const contractAbiPath = path.join(dirName, 'ShibNitro.abi');
fs.writeFileSync(contractAbiPath, JSON.stringify(contract.abi));
