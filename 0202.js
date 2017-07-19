"use strict";

var ONE_SECOND = 1000;

function startCounting() {
  var number = 0;

  return setInterval(
    function logNumber() {
      number += 1;
      console.log(number);
    },
    ONE_SECOND
  );
}

function stopCounting(timerId) {
  clearInterval(timerId);
}

var timer = startCounting();
setTimeout(
  function stopRunning() {
    stopCounting(timer);
  },
  13 * ONE_SECOND
);
