# tslint-config-ivweb
[![npm package](https://img.shields.io/npm/v/tslint-config-ivweb.svg?style=flat-square)](https://www.npmjs.org/package/tslint-config-ivweb)
[![NPM downloads](http://img.shields.io/npm/dt/tslint-config-ivweb.svg?style=flat-square)](https://npmjs.org/package/tslint-config-ivweb)

TSLint shareable config for the IVWEB TypeScript style guide.

## Installation

```
$ npm install --save-dev tslint typescript tslint-config-ivweb
```

## Usage

Once the `tslint-config-ivweb` package is installed, you can use it by specifying `ivweb`.
create `tslint.config` and copy this.
```js
{
  "extends": ["tslint-config-ivweb"],
  "linterOptions": {
    "exclude": ["**/node_modules/**"]
  },
  "rules": {
  // your own special config rule
  }
}
```

### use in cli

```
./node_modules/.bin/tslint ./**/*.ts
```

### use in vscode

- install tslint plugin
- use `Cmd +` or `Ctrl +`
- set `tslint.autoFixOnSave` as `true`

### use in webstorm

- open setting
- search `tslint`
- set `enable` as true, and chose `Search for tslint.json`