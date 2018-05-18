"use strict"

const fs = require("fs"),
path = require("path")

module.exports = {
	get channel() {
		try {
			const data = JSON.parse(fs.readFileSync(".channel.json","UTF-8"))
			return data
		} catch (e) {
			throw e
		}
	},

	get node() {
		const where = path.join(__dirname, "../package.json")
		let pkg = JSON.parse(fs.readFileSync(`${where}`,"UTF-8"))
		return pkg.version
	},

	get scss() {
		try {
			const data = this.turntable.match(/\d.\d.\d/).toString()
			return data
		} catch (e) {
			throw e
		}
	},

	get turntable() {
		try {
			const data = fs.readFileSync(`${this.channel.path}/_turntable.scss`, "UTF-8")
			return data	
		} catch (e) {
			throw e
		}
	},

	urlBuild: "https://cdn.jsdelivr.net/gh/dmbdesignpdx/turntable@0/kit/build.scss",
	urlVer: "https://cdn.jsdelivr.net/gh/dmbdesignpdx/turntable@0/kit/version.txt"

}
