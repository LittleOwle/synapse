// noinspection ExceptionCaughtLocallyJS

"use strict";

const fs = require("node:fs");

const loadNeuron = (data = {})  => {
    const {path, codex} = data;
    let base = __dirname;
    try {
        if (!codex.types.isString(path)) {
            const errorMessage = `${codex.errors({error: 1, id: 'neurons'})} : needs path`;
            throw new Error(errorMessage);
        }
        if (codex.types.isString(data.base)) base = data.base;
        const resolve = `${base}/${path}`;
        if (fs.existsSync(resolve) && fs.existsSync(`${resolve}/index.js`)) {
            const neuron = require(resolve);
            if (codex.types.isFunction(neuron)) return neuron;
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
    const errorMessage = `${codex.errors({error: 3, id: 'neurons'})} : ${base}/${path}`;
    throw new Error(errorMessage);
};

const errorHandler = (codex, id) => {
    const {errors, types} = codex;

    return (code, extra) => {
        let errMessage, error = 0;
        if(types.isNumberPositive(code)) error = code;
        errMessage = errors({
            error, id
        });
        if(extra) {
            if(types.isString(extra)) errMessage = `${errMessage} : ${extra}`;
            if(types.isObject(extra)) errMessage = `${errMessage} : ${JSON.stringify(extra)}`;
        }
        return errMessage;
    };
};

const parse = (data = {}) => {
    const {n, operation, codex, input, sensory} = data;
    const id = `n${n}`;
    const neuron = loadNeuron({codex, path: id});
    if(codex.types.isFunction(neuron)) {
        const {types} = codex
        neuron({input, operation, codex: { types, errors: errorHandler(codex, id) }, sensory});
    }
};

module.exports = Object.freeze(parse);