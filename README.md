## linters
lint js、ts、style。

### install

use command global

```
npm install linters -g

linter js
```

use command in project

```
npm install linters -D
```
config in package.json

```
{
    "script": {
        "lintjs": "./node_modules/.bin/linters js"
    }
}
```
use by npm
```
npm run lintjs
```


### lint js
1. create .eslintrc.js in root dir, and intall pkg;
2. use command in your project ```linters js```;

### lint ts
1. create `tslint.json` in root dir, and intall pkg;
2. use command in your project ```linters ts```;

### lint style
1. create `.stylelintrc` in root dir, and intall pkg;
2. use command in your project ```linters style```;