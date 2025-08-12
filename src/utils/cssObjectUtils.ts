export function cssToJsObject(
  cssString: string
): Record<string, any> {
  // 1) 去掉 //... 与 /* ... */ 注释
  const noLineComments = cssString.replace(
    /(^|[^\S\r\n])\/\/.*$/gm,
    '$1'
  )
  const noComments = noLineComments.replace(
    /\/\*[\s\S]*?\*\//g,
    ''
  )

  // 2) 只提取第一段 {...}
  const match = noComments.match(/{([^}]*)}/)
  if (!match) return {}

  const body = match[1]
  const styleObject: Record<string, any> = {}

  // 3) 逐条声明解析
  body.split(';').forEach(line => {
    const trimmed = line.trim()
    if (!trimmed) return

    // 只切第一个冒号，避免值里的冒号被误切
    const colonIndex = trimmed.indexOf(':')
    if (colonIndex === -1) return

    const rawKey = trimmed
      .slice(0, colonIndex)
      .trim()
    const rawValue = trimmed
      .slice(colonIndex + 1)
      .trim()
    if (!rawKey || !rawValue) return

    // kebab-case -> camelCase
    const camelKey = rawKey.replace(
      /-([a-z])/g,
      (_, c: string) => c.toUpperCase()
    )

    // 不再做 px -> number 的转换，保持原样
    styleObject[camelKey] = rawValue
  })

  return styleObject
}
export function objectToCss(
  selector: string,
  styleObj: Record<string, any>
): string {
  const lines: string[] = []

  for (const [key, value] of Object.entries(
    styleObj
  )) {
    // camelCase -> kebab-case
    const kebabKey = key.replace(
      /[A-Z]/g,
      m => '-' + m.toLowerCase()
    )
    // 保持原样输出
    const cssValue = String(value)
    lines.push(`    ${kebabKey}: ${cssValue};`)
  }

  return `${selector} {\n${lines.join('\n')}\n}`
}

export function stripPx(
  styleObj: Record<string, any>
) {
  const res: Record<string, any> = {}

  for (let key in styleObj) {
    const value = styleObj[key]
    if (
      typeof value === 'string' &&
      value.endsWith('px')
    ) {
      const newVal = Number(value.split('px')[0])

      res[key] = newVal
    } else {
      res[key] = value
    }
  }

  return res
}
