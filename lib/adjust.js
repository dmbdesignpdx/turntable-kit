"use strict"

const fs = require("fs"),
{sass} = require("./data.js")


function output(source) {
	const file = fs.readFileSync(`${__dirname}/build.scss`, "UTF-8"),
	values = source.match(/[\w|\-|.|/]+/g),
	year = values[3],
   ie = "none" === values[5] ? 99 : values[5],
	dest = "root" === values[1] || "/" === values[1] ? "." : values[1],
	channel = `/* Mixin' with Turntable v${sass} -- by Daniel Blake */\n$browseryear:${year};$ieversion:${ie};`,
   out = channel + file

   fs.stat(dest, err => { 
		if (err) fs.mkdir(dest)
	})

   fs.writeFile(`${dest}/_turntable.scss`, out.trim(), err => {
      if (err) throw err
   })

   process.on("exit",() => process.stdout.write(`\n[\x1b[32mTurntable\x1b[0m] "_turntable.scss" output adjusted based on ".channel.yml"\n\n`))

}

module.exports = () => {
	process.stdout.write(`\n[\x1b[36mTurntable\x1b[0m] Adjusting output...\n`)

   fs.readFile("./.channel.yml", "UTF-8", (err, data) => {
		if (err) {
			process.stdout.write(`\n[\x1b[31mTurntable\x1b[0m] Pulled the plug: ".channel.yml" missing\n\n`)
		} else {
			output(data)
		}
	})

}
