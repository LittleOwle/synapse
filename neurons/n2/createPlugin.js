"use strict";

const fs = require("node:fs");
const pluginName = (data = {}) => {
    const {input, types} = data;
    let name = "hello-plugin";
    let description = "Hello Plugin";
    if(types.isTrue(input.length === 2) && types.isTrue(input.at(0) === "--name")) {
        description = input.at(1);
        name = input.at(1)
            .replace(/\s+/g,"_")
            .replace(/^@/, "")
            .replace(/:/g, "-")
            .toLowerCase();
    }
    return {name, description};
};

const createPlugin = (data = {}) => {
    const {input, template, target, codex} = data;
    const {types} = codex;
    const {name, description} = pluginName({input, types});
    const pluginDirectory = `${target}/${name}`;

    fs.cpSync(template, pluginDirectory, {recursive: true});
    return {name, description, directory: pluginDirectory};
};

module.exports = Object.freeze(createPlugin);