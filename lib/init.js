"use strict"

const fs = require("fs"),
{sass} = require("./data.js"),
q = [
   "[\x1b[32mTurntable\x1b[0m] Vendor prefix support (2011–2018):",
   "[\x1b[32mTurntable\x1b[0m] IE version support (9,10,11,none):",
   "[\x1b[32mTurntable\x1b[0m] Path of directory (where/you/want/turntable):"
]

let a = []


function handle(err) {
	if (err) throw err
}

function check(args) {
	return -1 < process.argv.indexOf(args)
}

function ask(question) {
   process.stdout.write(`\n${q[question]} `);
}

function build() {
	process.stdin.end()

	const dry = check("--dry-run"),
	file = !dry && fs.readFileSync(`${__dirname}/build.scss`, "UTF-8"),
   dest = "root" === a[2] || "" === a[2] || "/" === a[2] ? "." : a[2],
   year = "" === a[0] ? 2011 : a[0],
   ie = "" === a[1] ? 9 : "none" === a[1] ? 99 : a[1],
	channel = `/* Mixin' with Turntable v${sass} -- by Daniel Blake */\n$browseryear:${year};$ieversion:${ie};`,
	output = `\npath: ${"." === dest ? "root" : dest}\nyear: ${year}\nie: ${99 === ie ? "none" : ie}\n`
	let ieChange = 99 === ie ? "none" : ie
	let obj = {
		path: dest,
		year: year.toString(),
		ie: ieChange.toString()
	}

   if (dry) {
      process.stdout.write(`\n\n[\x1b[35mTurntable\x1b[0m] --dry-run has been deprecated.\n\n`)
	} else {
		const combined = channel + file

		try {
			fs.statSync(dest)
		} catch (e) {
			fs.mkdirSync(dest)
		}

		fs.writeFile("./.channel.yml", output.trim(), handle)
		
		fs.writeFile("./.channel.json", JSON.stringify(obj,null,3), handle)
		
		fs.writeFile(`${dest}/_turntable.scss`, combined.trim(), buildErr => {
			if (buildErr) throw buildErr
			process.stdout.write(`\n[\x1b[32mTurntable\x1b[0m] ".channel.yml" file created (deprecated)\n[\x1b[32mTurntable\x1b[0m] ".channel.json" file created for v0.6.0\n[\x1b[32mTurntable\x1b[0m] "_turntable.scss" placed at ${dest}/\n\n`)
		})
   }
}

module.exports = () => {
   process.stdin.on("data", data => {
		a.push(data.toString().trim())
		
		if (a.length < q.length) {
			ask(a.length)
		} else {
			build()
		}
   })
   ask(0)
}
