"use strict"

const fs = require("fs"),
q = [
   "[\x1b[32mTurntable\x1b[0m] Vendor prefix support (2011–2017):",
   "[\x1b[32mTurntable\x1b[0m] IE version support (9,10,11,none):",
   "[\x1b[32mTurntable\x1b[0m] Path of directory (where/you/want/turntable):"
]

let a = []

function arg(x) {
	return -1 < process.argv.indexOf(x)
}

function ask(i) {
   process.stdout.write(`\n${q[i]} `);
}

function build(tt) {
	process.stdin.end()

	const dry = arg("--dry-run"),
	file = !dry && fs.readFileSync(`${__dirname}/build.scss`, "UTF-8"),
   dest = "root" === a[2] || "" === a[2] || "/" === a[2] ? "." : a[2],
   year = "" === a[0] ? 2011 : a[0],
   ie = "" === a[1] ? 9 : "none" === a[1] ? 99 : a[1],
	channel = `/* Mixin' with Turntable v${tt.sass} -- by Daniel Blake */\n$browseryear:${year};$ieversion:${ie};`,
   output = `\n path: ${"." === dest ? "root" : dest}\n year: ${year}\n ie: ${99 === ie ? "none" : ie}\n`

   fs.stat(dest, err => { 
		if (err) fs.mkdir(dest)
	})

   if (dry) {
      process.stdout.write(`\n\n[\x1b[36mTurntable\x1b[0m] ".channel.yml" preview:\n\n${output}\n\n`)
	} else {
		const combined = channel + file

      fs.writeFile("./.channel.yml", output.trim(), err => {
		   if (err) throw err
      })

		fs.writeFile(`${dest}/_turntable.scss`, combined.trim(), err => {
			if (err) throw err
			process.stdout.write(`\n[\x1b[32mTurntable\x1b[0m] ".channel.yml" file created\n[\x1b[32mTurntable\x1b[0m] "_turntable.scss" placed at ${dest}/\n\n`)
		})
   }
}

exports.start = tt => {
   process.stdin.on("data", data => {
      a.push(data.toString().trim())
      a.length < q.length ? ask(a.length) : build(tt)
   })
   ask(0)
}
