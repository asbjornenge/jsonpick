#!/usr/bin/env node
var path = require('path')
var argv = require('minimist')(process.argv.slice(2), {
    default : {
        newline : true,
    }
})

function halp() {
    console.log('USAGE')
    console.log('    jsonpick [OPTIONS] <file.json> key.path.to.value')
    console.log('OPTIONS')
    console.log('    newline - Print a newline char (default true)')
}

var pathToFile = function (static_param) {
    if (static_param[0] != '/') static_param = process.cwd()+'/'+static_param
    return path.resolve(static_param)
}

function ref(obj, str) {
    return str.split('.').reduce(function(last, curr) {
        return last[curr]
    }, obj) 
}

if (argv.h || argv.help) { halp(); process.exit(0) }
if (process.argv.length < 3) { halp(); process.exit(1) }
var data = require(pathToFile(process.argv[2]))
if (!process.argv[3]) { console.log(data); process.exit(0) }
if (typeof argv.newline == 'boolean') console.log(ref(data, process.argv[3]))
else process.stdout.write(ref(data, process.argv[3]))
