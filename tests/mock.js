"use strict";

const path = require("node:path");

const synapseDir = path.resolve(__dirname, "..");
const workspaceDir = path.resolve(__dirname, "workspaceTest");
const codexPath = path.resolve(synapseDir, "codex");

const sensory = {
    workspace: workspaceDir,
    synapse: synapseDir
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

const interpreter = (args = []) => {
    if(!Array.isArray(args) || args.length === 0) return {};
    const token_request = args.at(0);
    const data_request = args.slice(1);
    const request = {
        cmd: token_request,
        input: data_request
    };
    return {request, sensory};
};

const neurons = (data = {}) => {
    const {input = [], n = 0, operation = {}} = data;
    const {types, errors} = require(codexPath);
    return {
        input, n, operation,
        codex: {types, errors},
        sensory
    }
};

const direct = (data = {}) =>  {
    const {input = [], operation = {}} = data;
    const codex = require(codexPath);
    const {types} = codex;
    return {input, operation, codex: { types, errors: errorHandler(codex, "Test") }, sensory}
};

module.exports = Object.freeze({
    interpreter, neurons, direct
});