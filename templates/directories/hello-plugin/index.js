// plugins/hello-plugin/index.js
"use strict";

const hello = () => {
    console.log("Hello world! This is a Synapse plugin.");
};

module.exports = Object.freeze({
    "hello": hello
});