#!/usr/bin/env node

"use strict"

const init = require("./lib/init"),
adjust = require("./lib/adjust"),
help = require("./lib/help"),
vers = require("./lib/version"),
update = require("./lib/update")


function check(arg) {
	return -1 < process.argv.indexOf(arg)
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
	case check("update"):
		update()
		break
	default:
		process.stdout.write(`[\x1b[35mTurntable\x1b[0m] Use "dj help" for command references\n`)
}
