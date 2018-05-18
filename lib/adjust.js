"use strict"

const fs = require("fs"),
info = require("./info")


module.exports = () => {
	process.stdout.write(`\n[\x1b[36mTurntable\x1b[0m] Adjusting output...\n`)

	let turntable = info.turntable,
	path = info.channel.path,
	year = info.channel.year,
	ie = info.channel.ie,
	full = ""

	if ("none" === ie) ie = "99"
	full = turntable.replace(/\$browseryear:\d\d\d\d;/,`$browseryear:${year};`)
	full = turntable.replace(/\$ieversion:\d+;/,`$ieversion:${ie};`)

	try {
		fs.statSync(path)
	} catch (e) {
		fs.mkdirSync(path)
	}

   fs.writeFile(`${path}/_turntable.scss`, full.trim(), err => {
		if (err) throw err
		process.stdout.write(`\n[\x1b[32mTurntable\x1b[0m] "_turntable.scss" output adjusted based on ".channel.json"\n\n`)
   })
}
