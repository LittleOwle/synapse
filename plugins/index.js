// noinspection ExceptionCaughtLocallyJS

"use strict";

const fs = require("node:fs");
const path = require("node:path");

const errorHandler = (data = {}) => {
    const {codex, code, extra} = data;
    const {types, errors} = codex;
    let errMessage, error = 0;
    if(types.isNumberPositive(code)) error = code;
    errMessage = errors({
        error, id: 'plugins'
    });
    if(extra) {
        if(types.isString(extra)) errMessage = `${errMessage} : ${extra}`;
        if(types.isObject(extra)) errMessage = `${errMessage} : ${JSON.stringify(extra)}`;
    }
    return errMessage;
};

const getPluginLoader = (data = {}) => {
    const {codex, json, directory, name} = data;
    const {types} = codex;
    const settings = JSON.parse(fs.readFileSync(json, 'utf-8'));
    //
    if(!types.isObject(settings) || !types.isObject(settings.main)
        || !types.isString(settings.main.file)) {
        throw new Error(errorHandler({code: 9, codex, extra: name}));
    }
    const loaderPath = path.resolve(directory, settings.main.file);
    if(!fs.existsSync(loaderPath)) {
        throw new Error(errorHandler({code: 12, codex, extra: loaderPath}));
    }

    const plugin = require(loaderPath);
    if(!types.isFunction(plugin) || !types.isObject(plugin)) {
        throw new Error(errorHandler({code: 9, codex, extra: name}));
    }

    if(types.isFunction(plugin) || (types.isString(settings.main.method)
        && types.isFunction(plugin[settings.main.method]))) {
        let notice = `Plugin loaded`;
        if(settings.name) {
            notice = `${notice}: ${settings.name}`;
        } else notice = `${notice}: ${name}`;
        if(settings.version) notice = `${notice} (${settings.version})`;
        console.info(notice);
        return plugin;
    }

    throw new Error(errorHandler({code: 9, codex, extra: name}));
};

const loadPlugin = (data = {}) => {
    const {plugins, workspace, codex, name} = data;
    let pluginsDir = plugins;
    if(pluginsDir.startsWith("./")) pluginsDir = path.resolve(workspace, plugins);
    try {
        if (!fs.existsSync(pluginsDir)) {
            throw new Error(errorHandler({code: 7, codex, extra: pluginsDir}));
        }
        const pluginDir = path.resolve(pluginsDir, name);
        const pluginSettings = `${pluginDir}/plugin.json`;
        if (!fs.existsSync(pluginDir) || !fs.existsSync(pluginSettings)) {
            throw new Error(errorHandler({code: 8, codex, extra: pluginsDir}));
        }
        //
        return getPluginLoader({codex, json: pluginSettings, directory: pluginsDir, name});
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

const parse = (data = {}) => {
    const {workspace, codex, p, input} = data;
    const {types, errors} = codex;

    const settingsFile = `${workspace}/synapse.json`;

    if (!fs.existsSync(settingsFile)) {
        throw new Error(errorHandler({code: 5, codex}));
    }
    const {plugins} = require(settingsFile);
    if (!types.isString(plugins)) {
        throw new Error(errorHandler({code: 6, codex}));
    }

    loadPlugin({
        plugins, workspace, codex, name: p
    })({
       input,
       codex: {types, errors},
       sensory: {workspace}
   });
};

module.exports = Object.freeze(parse);