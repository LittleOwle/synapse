"use strict";

const isString = (value) => {
    return (typeof value === "string");
};

const isFunction = (value) => {
    return (typeof value === "function");
};

const isObject = (value) => {
    return (typeof value === "object" && !Array.isArray(value)
        && value !== null && Object.getPrototypeOf(value) === Object.prototype);
};

const isArray = (value) => {
    return (typeof value === "object" && Array.isArray(value));
};

const isTrue = (value) => {
    return (typeof value === "boolean" && value === true);
};

const isFalse = (value) => {
    return (typeof value === "boolean" && value === false);
};

const isNumber = (value) => {
    return (typeof value === "number" && !isNaN(value));
};

const isNumberPositive = (value) => {
    return (typeof value === "number" && Number(value) >= 0);
};

const isNull = (value) => {
    return (typeof value === "object" && value === null);
};

const checkType = {
    isArray, isFalse, isFunction, isNull, isNumber, isNumberPositive, isObject, isString, isTrue
};

module.exports = (checkType);