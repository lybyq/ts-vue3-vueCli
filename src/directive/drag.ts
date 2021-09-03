export default (el: any, binding: any) => {
  let _el = el
  document.onselectstart = () => false

  _el.onmousedown = (e: any) => {
    console.log(e)
    let disX = e.clientX - _el.offsetLeft
    let disY = e.clientY - _el.offsetTop
    _el.style.cursor = 'grab'
    _el.style.position = "relative";
    document.onmousemove = (e) => {
      _el.style.cursor = 'grabbing'
      let l = e.clientX - disX
      let t = e.clientY - disY;
      _el.style.left = l + "px"
      _el.style.top = t + "px"
      console.log(l, t)
    }

    document.onmouseup = (e) => {
      _el.style.cursor = 'grab'
      document.onmousemove = document.onmouseup = null
    }

    return false
  }
}