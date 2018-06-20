"use strict"

const fs = require("fs"),
child = require("child_process"),
info = require("./info")

function toss(err) {
	return process.stdout.write(`${err}\n`)
}

module.exports = () => {
	process.stdout.write(`\n[\x1b[36mTurntable\x1b[0m] Adjusting output...\n`)

	// Check if Channel exists
	if (info.channel) {
		let turntable = info.turntable,
		path = info.channel.path,
		year = info.channel.year,
		ie = info.channel.ie,
		full = ""
	
		if ("none" === ie) ie = "99"
		full = turntable.replace(/\$browseryear:20\d\d;/,`$browseryear:${year};`)
		full = full.replace(/\$ieversion:\d+;/,`$ieversion:${ie};`)
	
		// Make sure directory exists, create if not
		try {
			fs.statSync(path)
		} catch (e) {
			child(`mkdir -p ${path}`)
		}
	
		fs.writeFile(`${path}/_turntable.scss`, full.trim(), err => {
			if (err) toss(err)
			process.stdout.write(`\n[\x1b[32mTurntable\x1b[0m] "_turntable.scss" output adjusted based on ".channel.${info.type}"\n\n`)
		})

	// Stop if Channel isn't found
	} else {
		process.stdout.write(`\n[\x1b[31mTurntable\x1b[0m] ".channel.yml" or ".channel.json" not found!\n\n`)
	}
}
