# Turntable Kit
**Install, update, and adjust your Turntable.**

![GitHub release](https://img.shields.io/github/release/dmbdesignpdx/turntable-kit.svg?style=for-the-badge)
![Travis](https://img.shields.io/travis/dmbdesignpdx/turntable-kit.svg?style=for-the-badge)

<br>

[**Turntable**](https://github.com/dmbdesignpdx/turntable) is an SCSS Library.

Visit the wiki for [**Documentation**](https://github.com/dmbdesignpdx/turntable/wiki).

<br>

### Install locally

```bash
# Yarn
yarn add -D turntable-kit

# NPM
npm i -D turntable-kit
```

### Or install globally for CLI

Yarn:

```bash
# Yarn
yarn global add turntable-kit

# NPM
npm i -g turntable-kit
```

<br>

### Setup (local only)

#### Utilize NPX
This comes with NPM v5.2.0+

```bash
npx dj ...
```

#### Or add a script to your package.json

```json
"scripts": {
	"dj": "dj"
}
```

then use:

```bash
yarn run dj ...
# or
npm run dj ...
```

<br>

### Commands

#### Auto initialize and build

```bash
dj init
```

Input the following values:
- Channel format: **[YAML or JSON]** (default: YAML)
- Vendor prefix support: **[ 2011&ndash;2018 ]** (default: 2011)
- IE version support: **[ 9 | 10 | 11 | none ]** (default: 9)
- Path of directory: **&lt;where/you/want/turntable&gt;** (default: project root)

You can just hit `enter` for the **default** value.

<br>

#### Build Turntable with a Channel

Manually create/edit a **.channel.yml** or **.channel.json** file at the root:

YAML:

```yaml
path: <where/you/want/turntable>
year: <vendor prefix support>
ie: <version support>
```

JSON:

```json
{
	"path": "<where/you/want/turntable>",
	"year": "<vendor prefix support>",
	"ie": "<version support>"
}
```

And then run:

```bash
dj adjust
```

<br>

#### Fetch the latest SCSS file

```bash
dj update
```

<br>

#### Print version

```bash
dj version
```

<br>

#### Help

```bash
dj help
```
