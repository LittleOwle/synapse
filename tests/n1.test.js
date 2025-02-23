"use strict";

const fs = require("node:fs");
const { expect } = require("chai");
const neurons = require("../neurons");
const n1 = require("../neurons/n1");
const mock = require("./mock");

const workspaceTest = `${__dirname}/workspaceTest`;
const file = "{workspaceRoot}/synapse.json";
const fullPathFile = file.replace("{workspaceRoot}", workspaceTest);
const template = "{templatesRoot}/files/workspace.json";
const timestamp = Date.now();
const contentObject = {test: timestamp};
const contentString = JSON.stringify(contentObject);

describe("n1: from neurons", () => {
    before(() => {
        if (!fs.existsSync(workspaceTest)) {
            fs.mkdirSync(workspaceTest, {recursive: true});
        }
    });
    after(() => {
        if (fs.existsSync(workspaceTest)) {
            fs.rmSync(workspaceTest, {recursive: true, force: true});
        }
    });

    it("action 1", async () => {
        expect(fs.existsSync(fullPathFile)).to.be.false;
        const data = mock.neurons({input: [], n: 1, operation: {action: 1, file, template}});
        const result = neurons(data);
        expect(result).to.be.an('undefined');
        expect(fs.existsSync(fullPathFile)).to.be.true;
        fs.unlinkSync(fullPathFile);
        expect(fs.existsSync(fullPathFile)).to.be.false;
    });
    it("action 2", async () => {
        expect(fs.existsSync(fullPathFile)).to.be.false;
        const msgError = "[n1] Error: File not found";
       try {
            const data = mock.neurons({input: [], n: 1, operation: {action: 2, file}});
            neurons(data);
        } catch (err) {
            expect(err.message).to.include(msgError);
        }

        const data = mock.neurons({input: [], n: 1, operation: {action: 1, file, template}});
        const result = neurons(data);
        expect(result).to.be.an('undefined');
        expect(fs.existsSync(fullPathFile)).to.be.true;
        fs.unlinkSync(fullPathFile);
        expect(fs.existsSync(fullPathFile)).to.be.false;
    });

});
describe("n1: direct", () => {
    before(() => {
        if (!fs.existsSync(workspaceTest)) {
            fs.mkdirSync(workspaceTest, {recursive: true});
        }
    });
    after(() => {
        if (fs.existsSync(workspaceTest)) {
            fs.rmSync(workspaceTest, {recursive: true, force: true});
        }
    });

    it("action 1 from template", async () => {
        expect(fs.existsSync(fullPathFile)).to.be.false;
        const data = mock.direct({operation: {action: 1, file, template}});
        const result = n1(data);
        expect(result).to.be.an('object');
        expect(result).to.have.property("workRoot");
        expect(result).to.have.property("workSpaces");
        expect(result).to.have.property("plugins");
        expect(fs.existsSync(fullPathFile)).to.be.true;
        fs.unlinkSync(fullPathFile);
        expect(fs.existsSync(fullPathFile)).to.be.false;
    });
    it("action 1 from object", async () => {
        expect(fs.existsSync(fullPathFile)).to.be.false;
        const data = mock.direct({operation: {action: 1, file, content: contentObject}});
        const result = n1(data);
        expect(result).to.be.an('object');
        expect(result).to.have.property("test");
        expect(result.test).to.equal(timestamp);
        expect(fs.existsSync(fullPathFile)).to.be.true;
        fs.unlinkSync(fullPathFile);
        expect(fs.existsSync(fullPathFile)).to.be.false;
    });
    it("action 1 from string", async () => {
        expect(fs.existsSync(fullPathFile)).to.be.false;
        const data = mock.direct({operation: {action: 1, file, content: contentString}});
        const result = n1(data);
        expect(result).to.be.an('object');
        expect(result).to.have.property("test");
        expect(result.test).to.equal(timestamp);
        expect(fs.existsSync(fullPathFile)).to.be.true;
        fs.unlinkSync(fullPathFile);
        expect(fs.existsSync(fullPathFile)).to.be.false;
    });

    it("action 2 from template", async () => {
        expect(fs.existsSync(fullPathFile)).to.be.false;
        const msgError = "[Test] Error: File not found";
        try {
            const data = mock.direct({operation: {action: 2, file}});
            n1(data);
        } catch (err) {
            expect(err.message).to.include(msgError);
        }
        const data = mock.direct({operation: {action: 1, file, template}});
        const result = n1(data);
        expect(result).to.be.an('object');
        expect(result).to.have.property("workRoot");
        expect(result).to.have.property("workSpaces");
        expect(result).to.have.property("plugins");
        expect(fs.existsSync(fullPathFile)).to.be.true;
        fs.unlinkSync(fullPathFile);
        expect(fs.existsSync(fullPathFile)).to.be.false;
    });
    it("action 2 from object", async () => {
        expect(fs.existsSync(fullPathFile)).to.be.false;
        const msgError = "[Test] Error: File not found";
        try {
            const data = mock.direct({operation: {action: 2, file}});
            n1(data);
        } catch (err) {
            expect(err.message).to.include(msgError);
        }
        const data = mock.direct({operation: {action: 1, file, content: contentObject}});
        const result = n1(data);
        expect(result).to.be.an('object');
        expect(result).to.have.property("test");
        expect(result.test).to.equal(timestamp);
        expect(fs.existsSync(fullPathFile)).to.be.true;
        fs.unlinkSync(fullPathFile);
        expect(fs.existsSync(fullPathFile)).to.be.false;
    });
    it("action 2 from string", async () => {
        expect(fs.existsSync(fullPathFile)).to.be.false;
        const msgError = "[Test] Error: File not found";
        try {
            const data = mock.direct({operation: {action: 2, file}});
            n1(data);
        } catch (err) {
            expect(err.message).to.include(msgError);
        }
        const data = mock.direct({operation: {action: 1, file, content: contentString}});
        const result = n1(data);
        expect(result).to.be.an('object');
        expect(result).to.have.property("test");
        expect(result.test).to.equal(timestamp);
        expect(fs.existsSync(fullPathFile)).to.be.true;
        fs.unlinkSync(fullPathFile);
        expect(fs.existsSync(fullPathFile)).to.be.false;
    });
});