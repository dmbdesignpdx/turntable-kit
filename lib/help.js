"use strict"

module.exports = () => process.stdout.write(`\n
Turntable Kit - Help

Usage:
   dj [command]

Commands:
(Build)
   adjust    use ".channel.yml" or ".channel.json" to adjust your "_turntable.scss"
   init      run initialization wizard
   update    fetch the latest version of the SCSS library

(Info)
   help      print this dialogue
   version   print the Turntable Kit version

`)
