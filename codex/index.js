"use strict";

const fs = require("node:fs");
const errorHandler = require(`${__dirname}/errorHandler.js`);
const checkType = require(`${__dirname}/checkType.js`);

const importMethod = (path)  => {
    try {
        const resolve = `${__dirname}/${path}`;
        if (fs.existsSync(resolve)) {
            const dep = require(resolve);
            if(checkType.isObject(dep) || checkType.isFunction(dep)) return dep;
        }
    } catch {}
    const errorMessage = `${errorHandler({error: 3, id: 'codex'})} : ${__dirname}/${path}`;
    throw new Error(errorMessage);
};

const index = {
    cmds: importMethod("commands.js"),
    tokens: importMethod("tokens.js"),
    help: importMethod("showHelp.js"),
    errors: errorHandler,
    types: checkType
};

module.exports = Object.freeze(index);