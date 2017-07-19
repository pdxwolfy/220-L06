"use strict";

function afterNSeconds(callback, seconds) {
  setTimeout(callback, 1000 * seconds);
}

afterNSeconds(
  function() {
    console.log("Hello");
  },
  5
);
