"use strict";

const path = require("node:path");

const createPlugin = require(`${__dirname}/createPlugin.js`);
const createStructure = require(`${__dirname}/createStructure.js`);
const n1 = require(path.resolve(__dirname, "..", "n1"));

const neuron = (data = {}) => {
    const {input, sensory, codex, operation} = data;
    const {types, errors} = codex;
    const operations = {
        1: {
            input, sensory, codex, n1
        },
        2: {
            plugin: {},
            input, sensory, codex, n1
        }
    };
    if(types.isObject(operation) && types.isNumberPositive(operation.action)
        && operations[operation.action]) {
        const action = operations[operation.action];
        if(action.plugin) action.plugin = createPlugin;
        return createStructure(action);
    } else {
        throw new Error(errors(10));
    }

};

module.exports = Object.freeze(neuron);