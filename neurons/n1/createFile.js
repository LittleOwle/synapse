"use strict";

const fs = require("node:fs");

const recreateFile = (file) => {
    const extension = file.split(".").pop();
    const version = `_bkp_${Date.now()}.${extension}`;
    const newFileName = file.replace(`.${extension}`, version);
    fs.renameSync(file, newFileName);
    return newFileName;
};

const createFile = (data = {}) => {
    const {file, template, content, types, errors, recreate} = data;
    let backupFile;
    if(fs.existsSync(file)) {
        if(recreate) {
            backupFile = recreateFile(file);
        } else return;
    }
    if(types.isString(template)) {
        if (!fs.existsSync(template)) {
            throw new Error(errors(12, template));
        }
        fs.copyFileSync(template, file);
        return backupFile;
    }
    if(types.isString(content) || types.isObject(content)) {
        let contents = content;
        if(types.isObject(content)) contents = JSON.stringify(content);
        fs.writeFileSync(file, contents, {encoding: "utf8"});
        return backupFile;
    }
    throw new Error(errors(11, file));
};

module.exports = Object.freeze(createFile);