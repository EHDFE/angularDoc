var program = require('commander');
var path = require('path');
var pgk = require('./package.json');

// dirs to find plugins
program
.version(pgk.version)
.option('-r, --review', 'review current component;')
.option('-p, --push', 'push current component to the demo web;')
.option('-c, --create', 'create new angular directive;')
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
    case '-c':
    requireModule = require('./create');
    break;
    default:
    //requireModule = require('./src/index');
    requireModule = console.log(program.outputHelp());
    break;
}
module.exports = requireModule;