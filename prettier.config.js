// prettier.config.js
/**
 * @type {import('prettier').Config}
 * @see https://www.prettier.cn/docs/options.html
 *
 * Prettier 代码格式化配置
 */
export default {
  // 是否在对象或数组的最后一个元素后面加逗号
  // "none" - 不加逗号
  // "es5"  - ES5 允许的地方加（对象、数组）
  // "all"  - 所有可能的地方都加（包括函数参数）
  trailingComma: 'none',

  // 是否使用单引号，默认为 false（使用双引号）
  singleQuote: true,

  // 语句末尾是否加分号，默认为 true（加分号）
  semi: false,

  // 每行的最大字符数，超过后换行
  printWidth: 50,

  // 箭头函数参数是否使用括号
  // "always" - 始终加括号  (x) => {}
  // "avoid"  - 仅在多个参数时加括号 x => {}
  arrowParens: 'avoid',

  // Markdown 文本的换行策略
  // "always"   - 超过 printWidth 强制换行
  // "never"    - 不自动换行
  // "preserve" - 保持原始换行
  proseWrap: 'always',

  // 是否允许 Prettier 对三元表达式进行格式化（实验性）
  experimentalTernaries: true,

  // 指定每个 tab（缩进）对应的空格数
  tabWidth: 2,

  // 是否使用 tab 进行缩进（false 表示使用空格）
  useTabs: false,

  // 对象键名是否加引号
  // "as-needed"   - 仅在必须时加引号
  // "consistent"  - 只要有一个键需要引号，就所有键都加引号
  // "preserve"    - 保持原样
  quoteProps: 'consistent',

  // 在 JSX 代码中是否使用单引号，默认为 false（使用双引号）
  jsxSingleQuote: false,

  // 在对象的大括号 `{}` 内部是否添加空格
  // true  - { foo: bar }
  // false - {foo: bar}
  bracketSpacing: true,

  // 在 JSX 中，是否把 `>` 放在同一行
  // false - <Tag attr="value">\n  Children\n</Tag>
  // true  - <Tag attr="value">Children</Tag>
  bracketSameLine: false,

  // 旧版的 JSX `>` 同行配置（已被 bracketSameLine 取代，保持 false）
  jsxBracketSameLine: false,

  // 是否让 Vue 的 `<script>` 和 `<style>` 代码缩进
  vueIndentScriptAndStyle: false,

  // 是否让每个属性都单独占一行（适用于 HTML, Vue, JSX）
  singleAttributePerLine: false,

  // 统一换行符
  // "lf"  - 仅使用 LF（Linux, macOS 默认）
  // "crlf" - 使用 CRLF（Windows 默认）
  // "cr"  - 仅使用 CR（极少使用）
  // "auto" - 根据文件原始格式决定
  endOfLine: 'auto',

  // 控制 HTML 空格敏感性
  // "css"    - 遵循 CSS 规则（默认）
  // "strict" - 保留所有空格
  // "ignore" - 忽略所有空格
  htmlWhitespaceSensitivity: 'css',

  // 嵌入代码的格式化方式
  // "auto" - 让 Prettier 自动决定
  // "off"  - 不格式化嵌入代码
  embeddedLanguageFormatting: 'auto'
}
