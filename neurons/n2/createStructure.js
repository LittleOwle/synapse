"use strict";

const fs = require("node:fs");
const path = require("node:path");

const createDirectory = (data = {}) => {
    const {workspace, types, errors, workRoot} = data;
    let {target} = data;
    if(!types.isString(target) || !types.isString(workspace)) {
        throw new Error(errors(1));
    }
    if(target.startsWith("./") || target.split("/").length === 1) {
        if(workRoot) {
            target = path.resolve(workspace, workRoot, target);
        } else target = path.resolve(workspace, target);
    }
    if(!fs.existsSync(target)) {
        fs.mkdirSync(target, {recursive: true});
    }
    return target;
};

const makeN1Operation = (data = {}) => {
    const {action = 2, sensory, codex, n1, file, template, content} = data;
    const operation = {action, file, template, content};
    const request = {sensory, codex, operation};
    return n1(request);
};

const pluginOperation = (data = {}) => {
    const {input, sensory, codex, n1, plugin, settings, target} = data;
    const {synapse} = sensory;
    const pluginTemplate = `${synapse}/templates/directories/hello-plugin`;
    const {name, directory, description} = plugin({
        input, settings, codex,
        template: pluginTemplate, target
    });
    const file = `${directory}/plugin.json`;
    const pluginSettings = makeN1Operation({
        sensory, codex, n1, file
    });
    pluginSettings.name = name;
    pluginSettings.description = `plugin ${description}`;
    fs.unlinkSync(file);
    return makeN1Operation({
        action: 1, sensory, codex, n1, file, content: pluginSettings
    });
};

const createStructure = (data = {}) => {
    const {input, plugin, sensory, codex, n1} = data;
    const {types, errors} = codex;
    const {synapse, workspace} = sensory;
    let action = 1;
    let settingsTemplate = `${synapse}/templates/files/workspace.json`;
    let settingsFile = `${workspace}/synapse.json`;

    if(fs.existsSync(`${workspace}/synapse.json`)) action = 2;

    const n1request = {
        action, sensory, codex, n1,
        file: settingsFile, template: settingsTemplate
    };
    const settings = makeN1Operation(n1request);

    const {plugins, workRoot, workSpaces} = settings;
    const pluginsDir = createDirectory({workspace, types, errors, target: plugins});
    createDirectory({workspace, types, errors, target: workRoot});
    if(types.isArray(workSpaces)) {
        for(const space of workSpaces) {
            createDirectory({workspace, types, errors, target: space, workRoot});
        }
    }
    if(plugin) return pluginOperation({input, sensory, codex, n1, plugin, settings, target: pluginsDir});
    return settings;
};

module.exports = Object.freeze(createStructure);