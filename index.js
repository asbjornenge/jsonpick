#!/usr/bin/env node
var path = require('path')
var argv = require('minimist')(process.argv.slice(2), {
    default : {
        newline : true,
        file : false
    }
})

function halp() {
    console.log('USAGE')
    console.log('    jsonpick [OPTIONS] key.path.to.value')
    console.log('OPTIONS')
    console.log('    newline - Print a newline char (default true)')
    console.log('    file    - /path/to/file.json')
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

var resp = function(data) {
    if (argv['_'].length == 0) return console.log(JSON.stringify(data, null, 2)) 
    if (typeof argv.newline == 'boolean') console.log(ref(data, argv['_'][0]))
    else process.stdout.write(ref(data, argv['_'][0]))
}

if (argv.file) return resp(require(pathToFile(argv.file)))
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(data) {
    resp(JSON.parse(data))
});
