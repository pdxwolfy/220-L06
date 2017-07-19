"use strict";

var show = {
  assertEqual: function(actualValue, expectedValue) { // jshint ignore:line
    var self = this;
    var ERROR = "ERROR ***************************************";

    var assertArrayEqual = function(actual, expected) {
      var index;

      if (actual.length !== expected.length) {
        return ERROR;
      }

      for (index = 0; index < actual.length; ++index) {
        if (self.assertEqual(actual[index], expected[index]) === ERROR) {
          return ERROR;
        }
      }

      return "ok";
    };

    var assertObjectEqual = function(actual, expected) {  // jshint ignore:line
      var actualKeys = Object.keys(actual).sort();
      var expectedKeys = Object.keys(expected).sort();
      var key;

      if (assertArrayEqual(actualKeys, expectedKeys) === ERROR) {
        return ERROR;
      }

      for (key in actual) {
        if (self.assertEqual(actual[key], expected[key]) === ERROR) {
          return ERROR;
        }
      }

      return "ok";
    };

    var assertNumberEqual = function(actual, expected) {
      var result;

      if (isNaN(actual)) {
        result = isNaN(expected);
      } else if (Number.isFinite(actual)) {
        result = Math.abs(actual - expected) < Number.EPSILON;
      } else {
        result = (actual === expected);  // jshint ignore:line
      }

      return result ? "ok" : ERROR;
    };

    var assertScalarEqual = function(actual, expected) {
      return (actual === expected) ? "ok" : ERROR;   // jshint ignore:line
    };

    if (typeof actualValue !== typeof expectedValue) {
      return ERROR;
    } else if (Array.isArray(actualValue)) {
      return assertArrayEqual(actualValue, expectedValue);
    } else if (typeof actualValue === "object") {
      return assertObjectEqual(actualValue, expectedValue);
    } else if (typeof actualValue === "number") {
      return assertNumberEqual(actualValue, expectedValue);
    } else {
      return assertScalarEqual(actualValue, expectedValue);
    }
  },

  elementToObject: function(element) {   // jshint ignore:line
    var obj = { tagName: element.tagName };
    var i;

    for (i = 0; i < element.attributes.length; i++) {
      obj[element.attributes[i].name] = element.attributes[i].value;
    }

    var children = element.childNodes;
    if (children.length) {
      obj.children = [];
      for (i = 0; i < children.length; i++) {
        obj.children[i] = children[i];
      }
    }

    return obj;
  },

  stringify: function(value) {
    var elements;

    if (Array.isArray(value)) {
      elements = value.map(this.stringify);
      return "[" + elements.join(", ") + "]";
    // jshint ignore:start
    } else if (value == window) { // eslint-disable-line eqeqeq
      return value;
    // jshint ignore:end
    } else if (value instanceof Element) {
      return JSON.stringify(show.elementToObject(value));
    } else if (value instanceof Object) {
      return JSON.stringify(value);
    } else {
      return String(value);
    }
  },

  show: function(value) {
    var out = document.getElementById("console");
    if (out === null) {
      console.log("Failed to create <pre id='console'>");
    } else {
      out.innerHTML += "<br>" + this.stringify(value);
    }
  },

  log: function(actual, expected) {
    var result = this.assertEqual(actual, expected);

    this.show("result = " + String(result));
    if (result !== "ok") {
      this.show("      value    = " + this.stringify(actual));
      this.show("      expected = " + this.stringify(expected) + "<br>");
    }
  },

  theEnd: function() {
    this.show("********************** DONE ***********************");
  },
};
