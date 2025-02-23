// noinspection ExceptionCaughtLocallyJS

"use strict";

const readFile = require(`${__dirname}/readFile.js`);
const createFile = require(`${__dirname}/createFile.js`);

const neuron = (data = {}) => {
    try {
        const {sensory, codex, operation} = data;
        const {workspace, synapse} = sensory;
        const {types, errors} = codex;
        const operations = {
            1: {
                create: createFile,
                types, errors
            },
            2: {
                types, errors
            }
        };
        if(!types.isObject(operation) || !types.isNumberPositive(operation.action)) {
            throw new Error(errors(10));
        }
        const {action, content} = operation;
        let {file, template} = operation;
        if(!types.isString(file)) {
            throw new Error(errors(1, `needs file path, received ${typeof file}`));
        }
        file = file.replace("{workspaceRoot}", workspace);

        if(types.isString(template)) {
            template = template.replace("{templatesRoot}", `${synapse}/templates`);
        }
        const request = {
            ...operations[action], file, template, content
        };
        return readFile(request);
    } catch (err) {
        if(process.env.DEBUG === "true") console.error(err);
        throw(err);
    }
};

module.exports = Object.freeze(neuron);