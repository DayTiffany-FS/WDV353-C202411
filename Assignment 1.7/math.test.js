const {add, subtract, multiply, divide, sqrt, max} = require("./math");

describe ("Math Functions working properly", () => {
    //test addition
    test("adds two numbers", () => {
        expect(add(5,7)).toBe(12);
        expect(add(17,3)).toBe(20);
        expect(add(0,4)).toBe(4);
    });

    //test subtraction
    test("subtracts two numbers", () => {
        expect(subtract(5,4)).toBe(1);
        expect(subtract(17,3)).toBe(14);
        expect(subtract(3,7)).toBe(-4);
    });

    //test multiplication
    test("multiplies two numbers", () => {
        expect(multiply(3,4)).toBe(12);
        expect(multiply(7,2)).toBe(14);
        expect(multiply(0,25)).toBe(0);
    });

    //test division
    test("divides two numbers", () => {
        expect(divide(4,2)).toBe(2);
        expect(divide(5,5)).toBe(1);
        expect(divide(21,3)).toBe(7);
    });

    //test square root
    test("returns the square root of a number", () => {
        expect(sqrt(9)).toBe(3);
        expect(sqrt(81)).toBe(9);
        expect(sqrt(49)).toBe(7);
    });

    //test max
    test("returns the larger of two numbers", () => {
        expect(max(7,12)).toBe(12);
        expect(max(3,15)).toBe(15);
        expect(max(-1,1)).toBe(1);
    });
});