// noinspection DuplicatedCode

"use strict";

const {engines} = require("./package.json");

if(engines?.node) {
    try {
        const [start, end] = engines.node.replace(">=", "").split("<");
        let supported, unsupported;
        if (start) supported = start.replace("v", "").split(".")[0];
        if (end) {
            unsupported = end.replace("v", "").split(".")[0];
        } else unsupported = supported + 1;
        const {version} = process;
        const current = version.replace("v", "").split(".")[0];

        if (current >= unsupported || supported > current) {
            console.error(
                `Required node version "${engines.node}" not satisfied with current version ${version}.`,
            );
            process.exit(1);
        }
    } catch {}
}