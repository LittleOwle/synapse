"use strict";

const errorMessages = {
    1: "Insufficient data",
    2: "Command not found",
    3: "Module does not exist",
    4: "Invalid type",
    5: "Configuration file 'synapse.json' not found. Run 'init' to create it",
    6: "'plugins' directory is not configured",
    7: "'plugins' directory does not exist",
    8: "Plugin not found",
    9: "Invalid plugin structure",
    10: "Invalid action",
    11: "Could not create file",
    12: "File not found",
    13: "Empty File",
};

const errorHandler = (data = {}) => {
    const {error = 0, id} = data;
    let message = "unknown error";
    let identifier = "[neurons]"
    if(Number(error) >= 1 && errorMessages[error]) message = errorMessages[error];
    if(id) identifier = id;
    return `[${identifier}] Error: ${message}`;
};

module.exports = Object.freeze(errorHandler);