const files: any = require.context('.', true, /\.ts$/)
const directives: any = {}

files.keys().forEach((file: string) => {
  if (file === './index.ts') return
  
  /\.\/(.*)\.ts/.test(file)
  const key = RegExp.$1
  directives[key] = files(file).default || files[file]
})

export default directives