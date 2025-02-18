// noinspection ExceptionCaughtLocallyJS

"use strict";

const codex = require(`${__dirname}/codex`);
const neurons = require(`${__dirname}/neurons`);
const plugins = require(`${__dirname}/plugins`);

const errorHandler = (code, extra) => {
    const {types, errors} = codex;
    let errMessage, error = 0;
    if(types.isNumberPositive(code)) error = code;
    errMessage = errors({
        error, id: 'interpreter'
    });
    if(extra) {
        if(types.isString(extra)) errMessage = `${errMessage} : ${extra}`;
        if(types.isObject(extra)) errMessage = `${errMessage} : ${JSON.stringify(extra)}`;
    }
    return errMessage;
};

const interpreter = (data = {}) => {
    try {
        const {types, errors, cmds, tokens} = codex;
        if (!types.isObject(data)
            || !types.isObject(data.request)
            || !types.isObject(data.sensory)) {
            const errorMessage = errorHandler(1, data);
            throw new Error(errorMessage);
        }

        const {cmd, input} = data.request;
        let plugin;

        if (!types.isString(cmd)) throw new Error(errorHandler(4, "needs string type"));
        if (!types.isArray(input)) throw new Error(errorHandler(4, "needs array object"));
        if (!cmds[cmd]) {
            plugin = cmd;
        } else {
            if (!types.isNumberPositive(cmds[cmd].token)
                || !tokens[cmds[cmd].token] || !tokens[cmds[cmd].token].n) {
                throw new Error(errorHandler(2, cmd));
            }
        }

        if (plugin) {
            if(types.isFunction) {
                plugins({
                    input,
                    codex: {types, errors},
                    p: cmd,
                    workspace: data.sensory.workspace
                })
            } else console.dir(plugins);
        } else {
            const {n, action} = tokens[cmds[cmd].token];
            neurons({
                input, n, action,
                codex: {types, errors},
                sensory: data.sensory
            });
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = Object.freeze(interpreter);