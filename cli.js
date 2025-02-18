#!/usr/bin/env node
"use strict";

const synapseDir = __dirname;
const workspaceDir = process.cwd();
const token_request = process.argv.at(2);
const data_request = process.argv.slice(3);

const request = {
    cmd: token_request,
    input: data_request
};
const sensory = {
    workspace: workspaceDir,
    synapse: synapseDir
};

require(`${synapseDir}/interpreter.js`)({request, sensory});