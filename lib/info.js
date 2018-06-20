"use strict"

const fs = require("fs"),
path = require("path")

function toss(err) {
	return process.stdout.write(`${err}\n`)
}

module.exports = {
	get channel() {
		let data = null

		// Check for YAML first
		try {
			fs.openSync(".channel.yml", "r")
			this.type = "yml"
		} catch (e) {
			if ("ENOENT" !== e.code) toss(e)
		}

		// Check for JSON if no YAML
		if (null === this.type) {
			try {
				fs.openSync(".channel.json", "r")
				this.type = "json"
			} catch (e) {
				if ("ENOENT" !== e.code) toss(e)
			}
		}

		// Adjust accordingly
		if ("yml" === this.type) {
			const file = fs.readFileSync(".channel.yml", "UTF-8"),
			keys = file.match(/\w+(?=:)/g),
			values = file.match(/[^\:|\s]+(?=\n|$)/g)
			data = {}

			keys.forEach((key, index) => {
				data[key] = values[index]
			})

		} else if ("json" === this.type) {
			data = JSON.parse(fs.readFileSync(".channel.json", "UTF-8"))
		}

		return data
	},

	get node() {
		const where = path.join(__dirname, "../package.json")
		let pkg = JSON.parse(fs.readFileSync(`${where}`,"UTF-8"))
		return pkg.version
	},

	get scss() {
		try {
			const data = this.turntable.match(/\d\.\d\.\d/).toString()
			return data
		} catch (e) {
			toss(e)
			return null
		}
	},

	get turntable() {
		try {
			const data = fs.readFileSync(`${this.channel.path}/_turntable.scss`, "UTF-8")
			return data	
		} catch (e) {
			toss(e)
			return null
		}
	},

	type: null,
	urlBuild: "https://cdn.jsdelivr.net/gh/dmbdesignpdx/turntable@0/kit/build.scss",
	urlVer: "https://cdn.jsdelivr.net/gh/dmbdesignpdx/turntable@0/kit/version.txt"

}
