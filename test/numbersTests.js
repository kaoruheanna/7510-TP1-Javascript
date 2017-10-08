var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Numbers", function () {

    var db = [
        "add(zero, zero, zero).",
        "add(zero, one, one).",
        "add(zero, two, two).",
        "add(one, zero, one).",
        "add(one, one, two).",
        "add(one, two, zero).",
        "add(two, zero, two).",
        "add(two, one, zero).",
        "add(two, two, one).",
        "subtract(X, Y, Z) :- add(Y, Z, X)."
    ];

    var interpreter = null;

    before(function () {
        // runs before all tests in this block
    });

    after(function () {
        // runs after all tests in this block
    });

    beforeEach(function () {
        // runs before each test in this block
        interpreter = new Interpreter();
        interpreter.parseDB(db);
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Numbers Facts', function () {

        it('add(zero, zero, zero) should be true', function () {
            assert(interpreter.checkQuery('add(zero, zero, zero)'));
        });

        it('add(two, one, one) should be false', function () {
            assert(interpreter.checkQuery('add(two, one, one)') === false);
        });

        it('add(two, one, zero) should be true', function () {
            assert(interpreter.checkQuery('add(two, one, zero)'));
        });

        it('add(two, one, eleven) should be false', function () {
            assert(interpreter.checkQuery('add(two, one, eleven)') === false);
        });     
    });

    describe('Numbers Rules', function () {

        it('subtract(two, one, one) should be true', function () {
            assert(interpreter.checkQuery('subtract(two, one, one)') === true);
        });
        it('subtract(one, one, two) should be false', function () {
            assert(interpreter.checkQuery('subtract(one, one, two)') === false);
        });
        it('root(two, one) should be false', function () {
            assert(interpreter.checkQuery('root(two, one)') === false);
        });
    });


});