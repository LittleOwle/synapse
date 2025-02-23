"use strict";

const fs = require("node:fs");

const readFile = (data = {}) => {
    const {create, types, errors, file, template, content} = data;
    if(!types.isString(file)) {
        throw new Error(errors(1, `needs file path, received ${typeof file}`));
    }
    if(types.isFunction(create)) {
        create({file, template, content, types, errors});
    }
    if(!fs.existsSync(file)) {
        throw new Error(errors(12, file));
    }
    try {
        const contents = JSON.parse(fs.readFileSync(file, 'utf-8'));
        if (contents) return contents;
    } catch (err) {
        console.error(err);
    }
    throw new Error(errors(13, file));
};

module.exports = Object.freeze(readFile);