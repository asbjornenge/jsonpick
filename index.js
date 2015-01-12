/* TODO
    - minimist
    - no-newline option process.stdout.write
    - help
    - help if no argv2
*/

function ref(obj, str) {
    str = str.split(".");
    for (var i = 0; i < str.length; i++) {
        obj = obj[str[i]];
    }
    return obj;
}
//console.log(process.argv[3])
var data = require(process.argv[2])
if (!process.argv[3]) console.log(data)
else console.log(ref(data, process.argv[3]))
