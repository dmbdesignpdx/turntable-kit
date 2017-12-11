"use strict"

exports.start = () => process.stdout.write(`\n
Turntable - Node Help

   [node] dj ...

          adjust    use '.channel.yml' to adjust the output of '_turntable.scss'

            init    auto-initialize '.channel.yml' and then build '_turntable.scss'
     [--dry-run]    preview the '.channel.yml' text instead of creating the file

       --help, ?    print this dialogue

   --version, -v    print the Turntable versions of SCSS and Node

`)
