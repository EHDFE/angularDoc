var program = require('commander');
var path = require('path');
var pgk = require('./package.json');

// dirs to find plugins
program
.version(pgk.version)
.option('-r ', '--review current component;')
.option('-push ', '--push current component to the demo web;')
.parse(process.argv);

var requireModule;
process.env.PORT = process.argv[3];
if(process.env.PORT === parseInt(process.env.PORT, 10) + '' && (process.env.PORT + '').length === 4) {}
else {
  process.env.PORT = 3333;
}
switch(process.argv[2]) {
    case '-r':
    requireModule = require('./compile')
    break;
    case '-p':
    requireModule = require('./push');
    break;
    default:
    requireModule = require('./src/index');
    break;
}
module.exports = requireModule;