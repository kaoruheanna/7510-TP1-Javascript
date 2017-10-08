var expect = require("chai").expect;
var should = require('should');
var assert = require('assert');

var Interpreter = require('../src/interpreter');


describe("Interpreter", function () {

    var db = [
        "varon(juan).",
        "varon(pepe",
        "varon(hector)."
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
    });

    afterEach(function () {
        // runs after each test in this block
    });


    describe('Interpreter', function () {

        it('El parseo debe ser invalido', function () {
            assert(interpreter.parseDB(db).err == 1);
        });

    });

});


