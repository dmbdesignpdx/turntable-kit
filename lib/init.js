"use strict"

const fs = require("fs"),
https = require("https"),
info = require("./info"),
child = require("child_process").exec,
q = [
	"[\x1b[32mTurntable\x1b[0m] Channel format (YAML or JSON):",
   "[\x1b[32mTurntable\x1b[0m] Vendor prefix support (2011–2018):",
   "[\x1b[32mTurntable\x1b[0m] IE version support (9,10,11,none):",
   "[\x1b[32mTurntable\x1b[0m] Path of directory (where/you/want/turntable):"
]

let a = []


// Error handling
function toss(err) {
	return process.stdout.write(`${err}\n`)
}

function handle(err) {
	if (err) toss(err)
}


// Build Functions
function ask(question) {
   process.stdout.write(`\n${q[question]} `)
}

function build() {
	let file = "", 
	dest = a[3].replace(/\/$/,""), 
	year = a[1], 
	ie = a[2],
	output = {},
	format = a[0]

	// Set defaults
	if ("" === format || "YAML" === format) format = "YML"
	if ("" === dest) dest = "."
	if ("" === year) year = "2011"
	if ("" === ie) ie = "9"

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

	// Fetch current SCSS version
	function fetchVersion() {
		process.stdout.write(`\n[\x1b[35mTurntable\x1b[0m] Fetching library ...`)

		return new Promise(res => {
			https.get(info.urlVer, response => {
				let body = ""

				response.on("data", chunk => {
					process.stdout.write(".")
					body += chunk
				})
				
				response.on("end", () => {
					res(body.trim())
				})
				
			}).on("error", err => toss(err))
		})
	}

	// Fetch and build SCSS file, build Channel
	fetchVersion().then(version => {
		https.get(info.urlBuild, response => {
			let full = "", 
			body = ""
	
			response.on("data", data => {
				process.stdout.write(".")
				body += data
			})
	
			response.on("end", () => {
				file = body.trim()
				full = `/* Mixin' with Turntable v${version} -- by Daniel Blake */\n$browseryear:${year};$ieversion:${"none" === ie ? "99" : ie};${file}`
	
				if ("YML" === format) {
					// Write YAML version
					let yaml = ""
					for (const key of Object.keys(output)) {
						const value = output[key]
						yaml = `${yaml}${key}: ${value}\n`
					}

					fs.writeFile("./.channel.yml", yaml, handle)

				} else {
					// Write JSON version
					fs.writeFile("./.channel.json", JSON.stringify(output,null,3), handle)
				}

				fs.writeFile(`${dest}/_turntable.scss`, full.trim(), buildErr => {
					if (buildErr) toss(buildErr)
					process.stdout.write(`\n\n[\x1b[32mTurntable\x1b[0m] ".channel.${format.toLowerCase()}" and "_turntable.scss" files created!\n\n`)
				})
			})

		}).on("error", err => toss(err))
	})

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
