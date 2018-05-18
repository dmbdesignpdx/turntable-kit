"use strict"

const info = require("./info")

module.exports = () => process.stdout.write(`\nTurntable Kit v${info.node}\n\n`)
