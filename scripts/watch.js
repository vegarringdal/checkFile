//get typehelper
var Transpiler = require('fuse-box-typechecker').TypeHelper

// configure
var transpiler = Transpiler({
    tsConfig: './tsconfig.json',
    basePath: './',
    tsLint: './tslint.json',
    name: 'watch',
    shortenFilenames: true,
    yellowOnLint: true,
    emit: true,
    clearOnEmit: true
});

// start watch, will only emit when there is no errors
transpiler.runWatch('./src');

