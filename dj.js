#!/usr/bin/env node

"use strict"

const init = require("./lib/init.js"),
mix = require("./lib/mix.js"),
help = require("./lib/help.js"),
vers = require("./lib/version.js"),

tt = {
   sass: "0.1.0",
   node: "0.1.0"
}

function arg(a,b) {
	return -1 < process.argv.indexOf(a) || -1 < process.argv.indexOf(b)
}

switch(true) {
   case arg("init", "-i"):
      init.start(tt)
		break
	case arg("help", "?"):
		help.start()
      break
	case arg("adjust", "-a"):
		mix.start(tt)
      break
	case arg("version", "-v"):
		vers.start(tt)
      break
      default : process.stdout.write("[\x1b[35mTurntable\x1b[0m] Try using --help for command references\n")
}
