module.exports = {
    extends: ["tslint-react"],
    rules:  {
        // 限制必须使用 T[] 或 Array<T> 之中的一种来定义数组的类型
        "array-type": false,
        // import 必须排序
        "ordered-imports": false,
        // 文件最后一行必须有一个空行
        "eofline": false,
        // 禁止使用console
        "no-console": false,
        // 接口名称必须以 I 开头
        "interface-name" : false,
        // 对象字面量必须按 key 排序
        "object-literal-sort-keys": false,
        // 禁止使用 var
        "no-var-keyword": true,
        // 变量定义需要竖向对齐
        "align": true,
        // 类名与接口名必须为驼峰式
        "class-name": true,
        // 限制单行注释的规则
        "comment-format": [
            true,
            "check-space"
        ],
        // if 后面必须有 {，除非是单行 if
        "curly": true,
        // for in 内部必须有 hasOwnProperty
        "forin": false,
        // 一个缩进必须用四个空格替代
        "indent": [true, "spaces", 4],
        // 注释必须符合 JSDoc 规范
        "jsdoc-format": false,
        // 只允许在 do, for, while 或 switch 中使用 label
        "label-position": false,
        // 限制每行字符数
        "max-line-length": [
            true,
            150
        ],
        // 指定类成员的排序规则 优先级：1. static
        "member-ordering": [
            true,
            {
                "order": "statics-first"
            }
        ],
        // new 后面只必须有一个空格
        "new-parens": true,
        // 禁止使用 any
        "no-any": false,
        // 禁止使用 arguments.callee 访问 arguments 是个很昂贵的操作，因为它是个很大的对象，每次递归调用时都需要重新创建。影响现代浏览器的性能，还会影响闭包
        "no-arg": true,
        // 禁止使用位运算
        "no-bitwise": false,
        // 禁止在分支条件判断中有赋值操作
        "no-conditional-assignment": true,
        // 禁止连续超过三行空行
        "no-consecutive-blank-lines": [true, 3],
        // 禁止使用 new 来生成 String, Number 或 Boolean
        "no-construct": true,
        "no-constructor-vars": false,
        // 禁止使用debugger
        "no-debugger": false,
        // 禁止出现重复的变量定义或函数参数名
        "no-duplicate-variable": true,
        // 禁止出现空代码块
        "no-empty": false,
        // 禁止使用eval
        "no-eval": true,
        // 禁止使用 module 来定义命名空间
        "no-internal-module": true,
        // 禁止使用 namespace 来定义命名空间,使用 es6 引入模块，才是更标准的方式 允许使用 declare namespace ... {} 来定义外部命名空间
        'no-namespace': [true, 'allow-declarations'],
        // 禁止使用三斜线引入模块，三斜线仅能用于引入一个类型文件
        'no-reference': true,
        // 禁止变量名与上层作用域内的定义过的变量重复
        "no-shadowed-variable": false,
        // 禁止出现 foo['bar']，必须写成 foo.bar
        "no-string-literal": false,
        // switch 的 case 必须 return 或 break
        "no-switch-case-fall-through": true,
        // 禁止行尾有空格
        "no-trailing-whitespace": true,
        // 禁止无用的表达式
        "no-unused-expression": true,
        // 变量必须先定义后使用, Requires Type Info 的规则，无法在编辑器中显示错误，不方便修复
        "no-use-before-declare": false,
        // 统一使用 import 来引入模块，特殊情况使用单行注释允许 require 引入
        "no-var-requires": false,
        // if catch else finally 后的 { 禁止换行,以及空格检查
        "one-line": [
            true,
            "check-catch",
            "check-else",
            "check-finally",
            "check-open-brace",
            "check-whitespace"
        ],
        // 变量申明必须每行一个，for 循环的初始条件中除外
        "one-variable-per-declaration": [
            true,
            "ignore-for-loop"
        ],
        // 必须使用单引号，jsx 中必须使用双引号
        "quotemark": [
            true,
            "single",
            "jsx-double"
        ],
        // parseInt 必须传入第二个参数
        "radix": true,
        // 行尾必须有分号
        "semicolon": [
            true,
            "always"
        ],
        // switch 必须要有default
        "switch-default": true,
        // 必须使用 === 或 !==，禁止使用 == 或 !=, 允许null
        "triple-equals": [
            true,
            "allow-null-check"
        ],
        // 变量、函数返回值、函数参数等必须要有类型定义
        "typedef": false,
        // 类型定义的冒号前面必须没有空格，后面必须有一个空格
        "typedef-whitespace": [
            true,
            {
                "call-signature": "nospace",
                "index-signature": "nospace",
                "parameter": "nospace",
                "property-declaration": "nospace",
                "variable-declaration": "nospace"
            },
            {
                "call-signature": "onespace",
                "index-signature": "onespace",
                "parameter": "onespace",
                "property-declaration": "onespace",
                "variable-declaration": "onespace"
            }
        ],
        // 必须使用 isNaN(foo) 而不是 foo === NaN
        "use-isnan": false,
        // 限制变量命名规则
        "variable-name": false,
        // 限制空格的位置
        "whitespace": [
            true,
            "check-branch",
            "check-decl",
            "check-operator",
            "check-separator",
            "check-type",
            "check-typecast"
        ],
        // 必须设置类的成员的可访问性，将不需要公开的成员设为私有的，可以增强代码的可理解性，对文档输出也很友好
        "member-access": false,
        // 禁止引入 package.json 中不存在的模块
        "no-implicit-dependencies": [true, 'dev'],
        // jsx 不使用箭头函数
        "jsx-no-lambda": true,
        // 不可以使用ref字符串
        "jsx-no-string-ref": false,
        // jsx中不使用boolean
        "jsx-boolean-value": [true, "never"],
        "jsx-wrap-multiline": false,
        "jsx-self-close": false,
        // jsx不实用bind
        "jsx-no-bind": true
    }
}