"use strict";

function go(seconds) {
  setTimeout(
    function logSeconds() {
      console.log(seconds);
    },
    1000 * seconds
  );
}

function delayLog() {
  var i;

  for (i = 1; i <= 10; ++i) {
    go(i);
  }
}

delayLog();
