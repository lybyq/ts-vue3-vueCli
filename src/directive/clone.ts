import { ElMessage } from 'element-plus'

const handleClick = (text: string) => {
  if(!document.getElementById('copyTarget')) {
    const copyTarget = document.createElement('input')
    copyTarget.setAttribute('style', 'position:fixed;top:0;left:0;opacity:0;z-index:-1000;')
    copyTarget.setAttribute('id', 'copyTarget')
    document.body.appendChild(copyTarget)
  }

  const input: any = document.getElementById('copyTarget')
  input.value = text
  input.select()
  document.execCommand('copy')
  ElMessage.success('复制成功')
}

const distoryInput = () => {
  if(document.getElementById('copyTarget')) {
    const copyTarget: any = document.getElementById('copyTarget')
    document.body.removeChild(copyTarget)
  }
}

export default {
  mounted(el: any, binding: any) {
    console.log(binding)
    const { modifiers } = binding
    if(modifiers.dbclick) {
      el.addEventListener('dblclick', () => handleClick(el.innerText))
      el.style.cursor = 'copy'
    } else if(modifiers.icon) {
      // 需要的时候我在弄
    } else {
      el.addEventListener('click', () => handleClick(el.innerText))
      el.style.cursor = 'copy'
    }
  },
  unmounted() {
    distoryInput()
  }
}