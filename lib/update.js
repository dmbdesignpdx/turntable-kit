"use strict"

const https = require("https"),
fs = require("fs"),
info = require("./info")

function toss(err) {
	return process.stdout.write(`${err}\n`)
}

// Rewrite turntable file
function rewriteFile(text,a) {
	const path = info.channel.path,
	year = info.channel.year,
	ie = info.channel.ie,
	full = `/* Mixin' with Turntable v${a} -- by Daniel Blake */\n$browseryear:${year};$ieversion:${"none" === ie ? "99" : ie};${text}`

	fs.writeFile(`${path}/_turntable.scss`, full, err => {
		if (err) toss(err)
		else process.stdout.write(`\n[\x1b[32mTurntable\x1b[0m] "_turntable.scss" updated!\n\n`)
	})	
}

// Fetch new version
function fetchFile(a) {
	let body = ""

	process.stdout.write(`[\x1b[35mTurntable\x1b[0m] Fetching new version (v${a}) ...`)

	// Fetch build from repo
	https.get("https://cdn.jsdelivr.net/gh/dmbdesignpdx/turntable@0/kit/build.scss", response => {
		response.on("data", data => {
			process.stdout.write(".")
			body += data
		})

		response.on("end", () => {
			rewriteFile(body,a)
		})

	}).on("error", err => toss(err))
}

module.exports = () => {
	let ver = ""
	// Check latest version from repo
	https.get("https://cdn.jsdelivr.net/gh/dmbdesignpdx/turntable@0/kit/version.txt", response => {
		process.stdout.write(`\n[\x1b[35mTurntable\x1b[0m] Checking for an update ...\n`)

		response.on("data", data => {
			process.stdout.write(".")
			ver += data
		})

		response.on("end", () => {
			const a = ver.trim()
			
			// Compare versions
			if (a === info.scss) {
				process.stdout.write(`[\x1b[35mTurntable\x1b[0m] Nothing to update!\n\n`)
			} else {
				fetchFile(a)
			}
		})
		
	}).on("error", err => toss(err))
}
