# Turntable Kit
**Use Yarn or NPM to install and update your Turntable.**

| Version |
|---------|
| 0.3.1  |

<br>

[**Turntable**](https://github.com/dmbdesignpdx/turntable) is an SCSS Library.

Visit the wiki for [**Documentation**](https://github.com/dmbdesignpdx/turntable/wiki).

<br>

### Install

Yarn:

```bash
yarn add -D turntable
```

NPM:

```bash
npm i -D turntable
```

<br>

### Setup

<br>

#### Auto Initialize and Build

```bash
dj init
```

Input the following values:
- Vendor prefix support: **[ 2011&ndash;2017 ]**
- IE version support: **[ 9 | 10 | 11 | none ]**
- Path of directory: **&lt;where/you/want/turntable&gt;**

<br>

#### Preview Build

```bash
dj init --dry-run
```

<br>

#### Build Turntable with Channel

Create a **.channel.yml** file at the root:

```yaml

path: <where/you/want/turntable>
year: <vendor prefix support>
ie: <version support>

```
And then run:

```bash
dj adjust
```

<br>

#### Print Version

```bash
dj version
```

<br>

#### Help

```bash
dj help
```
