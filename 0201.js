"use strict";

var ONE_SECOND = 1000;

function startCounting() {
  var number = 0;

  setInterval(
    function logNumber() {
      number += 1;
      console.log(number);
    },
    ONE_SECOND
  );
}

startCounting();
