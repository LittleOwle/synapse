"use strict";

const fs = require("node:fs");
const { expect } = require("chai");
const neurons = require("../neurons");
const n2 = require("../neurons/n2");
const mock = require("./mock");

const workspaceTest = `${__dirname}/workspaceTest`;
const settings = `${__dirname}/workspaceTest/synapse.json`;

const fakePluginTest = `${__dirname}/workspaceTest/plugins/testplugin`;
const pluginTest = `${__dirname}/workspaceTest/plugins/this-test_plugin@1.0.0`;

describe("n2: from neurons", () => {
    beforeEach(() => {
        if (!fs.existsSync(workspaceTest)) {
            fs.mkdirSync(workspaceTest, {recursive: true});
        }
    });
    afterEach(() => {
        if (fs.existsSync(workspaceTest)) {
            fs.rmSync(workspaceTest, {recursive: true, force: true});
        }
    });
    it("action 1", async () => {
        expect(fs.existsSync(settings)).to.be.false;

        const data = mock.neurons({input: ["--name", "testplugin"], n: 2, operation: {action: 1}});
        const result = neurons(data);
        expect(fs.existsSync(settings)).to.be.true;
        expect(result).to.be.an('undefined');
        expect(fs.existsSync(fakePluginTest)).to.be.false;
        expect(fs.existsSync(`${workspaceTest}/plugins`)).to.be.true;
        expect(fs.existsSync(`${workspaceTest}/workspaces`)).to.be.true;
        expect(fs.existsSync(`${workspaceTest}/workspaces/apps`)).to.be.true;
        expect(fs.existsSync(`${workspaceTest}/workspaces/packages`)).to.be.true;
    });
    it("action 2", async () => {
        expect(fs.existsSync(settings)).to.be.false;

        const data = mock.neurons({input: ["--name", "@this:test plugin@1.0.0"], n: 2, operation: {action: 2}});
        const result = neurons(data);
        expect(fs.existsSync(settings)).to.be.true;
        expect(result).to.be.an('undefined');
        expect(fs.existsSync(pluginTest)).to.be.true;
        expect(fs.existsSync(`${pluginTest}/plugin.json`)).to.be.true;
        expect(fs.existsSync(`${pluginTest}/index.js`)).to.be.true;
    });
});
describe("n2: direct", () => {
    beforeEach(() => {
        if (!fs.existsSync(workspaceTest)) {
            fs.mkdirSync(workspaceTest, {recursive: true});
        }
    });
    afterEach(() => {
        if (fs.existsSync(workspaceTest)) {
            fs.rmSync(workspaceTest, {recursive: true, force: true});
        }
    });
    it("action 1", async () => {
        expect(fs.existsSync(settings)).to.be.false;

        const data = mock.direct({input: ["--name", "testplugin"], operation: {action: 1}});
        const result = n2(data);
        expect(fs.existsSync(settings)).to.be.true;
        expect(result).to.be.an('object');
        expect(result).to.have.property("workRoot");
        expect(result).to.have.property("workSpaces");
        expect(result).to.have.property("plugins");

        expect(fs.existsSync(`${workspaceTest}/plugins`)).to.be.true;
        expect(fs.existsSync(`${workspaceTest}/workspaces`)).to.be.true;
        expect(fs.existsSync(`${workspaceTest}/workspaces/apps`)).to.be.true;
        expect(fs.existsSync(`${workspaceTest}/workspaces/packages`)).to.be.true;
        expect(fs.existsSync(fakePluginTest)).to.be.false;
    });
    it("action 2", async () => {
        expect(fs.existsSync(settings)).to.be.false;

        const data = mock.direct({input: ["--name", "@this:test plugin@1.0.0"], operation: {action: 2}});
        const result = n2(data);
        expect(fs.existsSync(settings)).to.be.true;
        expect(result).to.be.an('object');
        expect(result).to.have.property("name");
        expect(result).to.have.property("version");
        expect(result).to.have.property("description");
        expect(result).to.have.property("main");
        expect(result.main).to.have.property("file");
        expect(result.main).to.have.property("method");

        expect(fs.existsSync(`${workspaceTest}/plugins`)).to.be.true;
        expect(fs.existsSync(`${workspaceTest}/workspaces`)).to.be.true;
        expect(fs.existsSync(`${workspaceTest}/workspaces/apps`)).to.be.true;
        expect(fs.existsSync(`${workspaceTest}/workspaces/packages`)).to.be.true;

        expect(fs.existsSync(pluginTest)).to.be.true;
        expect(fs.existsSync(`${pluginTest}/plugin.json`)).to.be.true;
        expect(fs.existsSync(`${pluginTest}/index.js`)).to.be.true;
    });
});