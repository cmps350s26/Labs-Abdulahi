import Calculator from "../js/calculator.js";
import { expect } from 'chai'

describe("Calculator", () => {

    describe("Add Method test cases", () => {
        it("add 2 and 3 should be 5", () => {
            const calculator = new Calculator();
            const result = calculator.add(2, 3)
            expect(result).to.equal(5)

        })
        it("add -2 and -3 should be -5", () => {
            const calculator = new Calculator();
            const result = calculator.add(-2, -3)
            expect(result).to.equal(-5)

        })
    })

    it("sub 2 and 3 should be -1", () => {
        const calculator = new Calculator();
        const result = calculator.sub(2, 3)
        expect(result).to.equal(-1)
    })

})