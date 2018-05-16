"use strict"

const {sass, node} = require("./data")

module.exports = () => process.stdout.write(`\nTurntable\n  - Library Version ${sass}\n  - Kit Version ${node}\n\n`)
