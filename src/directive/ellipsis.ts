export default (el: any, binding: any) => {
  el.style.width = binding.arg || 100 + 'px'
  el.style.whiteSpace = 'nowrap'
  el.style.overflow = 'hidden';
  el.style.textOverflow = 'ellipsis';
}