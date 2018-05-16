#!/usr/bin/env node

"use strict"

const init = require("./lib/init"),
adjust = require("./lib/adjust"),
help = require("./lib/help"),
vers = require("./lib/version")


function check(a) {
	return -1 < process.argv.indexOf(a)
}

switch(true) {
   case check("init"):
      init()
		break
	case check("help"):
		help()
      break
	case check("adjust"):
		adjust()
      break
	case check("version"):
		vers()
      break
	default:
		process.stdout.write(`[\x1b[35mTurntable\x1b[0m] Use "dj help" for command references\n`)
}
