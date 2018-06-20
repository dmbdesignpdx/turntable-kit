# Turntable-Kit Changelog

## 0.7.0
6/20/18

New Features:
- adds both YAML and JSON support for Channel

Bug fixes:
- fixed `adjust` not updating year

Edits:
- better error handling
- housekeeping

## 0.6.4

Bug fixes:
- fixed channel output of "99" with init

Edits:
- updated `help` output text

## 0.6.3

[publish error]

## 0.6.2

Bug fixes:
- fixed an issue with `process.stdin` not responding

## 0.6.1

Bug fixes:
- fixed an issue with creating sub-directories

## 0.6.0

New Features:
- `update`: will check for a newer version of the library and fetch it
- **.channel.json**

Removes:
- `--dry-run`
- **.channel.yml**

## 0.5.2

Deprecations:
- **.channel.yml** (will be replaced with **.channel.json**)
- `--dry-run`

## 0.5.1

Bug fixes:
- fixed issue with creating a directory

## 0.5.0

Housecleaning:
- simplified modules
