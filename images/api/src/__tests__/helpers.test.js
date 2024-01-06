const {
    checkStudentName
} = require("./../helpers/endpointHelpers.js");

const {checkString, checkNumber} = require("./../../src/helpers/endpointHelpers")

test("check name", () => {
    expect(checkStudentName("")).toBe(false);
    expect(checkStudentName(null)).toBe(false);
    expect(checkStudentName("i")).toBe(false);
    expect(checkStudentName(1)).toBe(false);
    expect(checkStudentName(false)).toBe(false);
    expect(checkStudentName(undefined)).toBe(false);
    expect(checkStudentName("hbfhfbehjfhefvhefvhefbehbfehbfjbfhbzhjfbzhfbhebf")).toBe(false);

    expect(checkStudentName("jan")).toBe(true);
    expect(checkStudentName("anne sophie")).toBe(true);
})


describe('checkNumber function', () => {
    it('returns true for a positive integer', () => {
        expect(checkNumber(42)).toBe(true);
        expect(checkNumber(0)).toBe(true);
    });

    it('returns false for negative numbers, floats, and non-numbers', () => {
        expect(checkNumber(-10)).toBe(false);
        expect(checkNumber(3.14)).toBe(false);
        expect(checkNumber('string')).toBe(false);
        expect(checkNumber(true)).toBe(false);
        expect(checkNumber(null)).toBe(false);
        expect(checkNumber(undefined)).toBe(false);
        expect(checkNumber({})).toBe(false);
    });
});