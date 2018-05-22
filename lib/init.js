"use strict"

const fs = require("fs"),
https = require("https"),
info = require("./info"),
child = require("child_process").exec,
q = [
   "[\x1b[32mTurntable\x1b[0m] Vendor prefix support (2011–2018):",
   "[\x1b[32mTurntable\x1b[0m] IE version support (9,10,11,none):",
   "[\x1b[32mTurntable\x1b[0m] Path of directory (where/you/want/turntable):"
]

let a = []


// Task Functions
function handle(err) {
	if (err) throw err
}


// Build Functions
function ask(question) {
   process.stdout.write(`\n${q[question]} `);
}

function build() {
	let file = "", 
	dest = a[2].replace(/\/$/,""), 
	year = a[0], 
	ie = a[1],
	output = {}

	if ("" === dest) dest = "."

	if ("" === year) year = "2011"
	
	if ("" === ie) ie = "9"
	else if ("none" === ie) ie = "99"

	output = {
		"path": dest,
		"year": year,
		"ie": ie
	}

	// Test if folder exists, create if not
	try {
		fs.statSync(dest)
	} catch (e) {
		child(`mkdir -p ${dest}`)
	}

	// Fetch current version
	function fetchVersion() {
		return new Promise(res => {
			https.get(info.urlVer, response => {
				let body = ""

				response.on("data", chunk => {
					body += chunk
				})
				
				response.on("end", () => {
					res(body.trim())
				})
			})
		})
	}

	// Fetch and build SCSS file, build Channel
	fetchVersion().then(version => {
		https.get(info.urlBuild, response => {
			let full = "", 
			body = ""
	
			process.stdout.write(`\n[\x1b[35mTurntable\x1b[0m] Fetching ...`)
	
			response.on("data", data => {
				process.stdout.write(".")
				body += data
			})
	
			response.on("end", () => {
				file = body.trim()
				full = `/* Mixin' with Turntable v${version} -- by Daniel Blake */\n$browseryear:${year};$ieversion:${ie};${file}`
	
				fs.writeFile("./.channel.json", JSON.stringify(output,null,3), handle)
		
				fs.writeFile(`${dest}/_turntable.scss`, full.trim(), buildErr => {
					if (buildErr) throw buildErr
					process.stdout.write(`\n\n[\x1b[32mTurntable\x1b[0m] ".channel.json" file created\n[\x1b[32mTurntable\x1b[0m] "_turntable.scss" placed in \x1b[32m${dest}\x1b[0m\n\n`)
				})
			})
		})
	})

	// Remove YAML version of Channel
	if (fs.existsSync("./.channel.yml")) fs.unlink("./.channel.yml", handle)
}

module.exports = () => {
   process.stdin.on("data", data => {
		a.push(data.toString().trim())
		
		if (a.length < q.length) {
			ask(a.length)
		} else {
			process.stdin.pause()
			build()
		}
   })
   ask(0)
}
