#!/usr/bin/env node

/* eslint-disable no-var */
/* eslint-disable flowtype/require-valid-file-annotation */
"use strict";

try {
  const cli = require(__dirname + "./../main.js");
} catch (error) {
  console.error(error.stack || error.message || error);
  process.exitCode = 1;
}
