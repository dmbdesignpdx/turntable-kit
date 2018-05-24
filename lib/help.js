"use strict"

module.exports = () => process.stdout.write(`\n
Turntable Kit - Help

Usage:
   dj [command]

Commands:
(Build)
   adjust    use ".channel.json" to adjust the output of "_turntable.scss"
   init      auto-initialize ".channel.json" and then build "_turntable.scss"
   update    will fetch the latest version of the library

(Info)
   help      print this dialogue
   version   print the Turntable Kit version

`)
