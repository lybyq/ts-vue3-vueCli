const formatNumber = (num: string): string => {
  num += '';
  let strs = num.split('.');
  let x1 = strs[0];
  let x2 = strs.length > 1 ? '.' + strs[1] : '';
  let rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2
}

export default {
  mounted(el: any, binding: any) {
    const { value, modifiers, arg } = binding
    console.log(binding)
    if(!value) return
    let formatValue = value
    if(modifiers.toFixed) {
      formatValue = value.toFixed(arg)
    }
    if(modifiers.price) {
      formatValue = formatNumber(formatValue)
    }
    el.innerText = formatValue
  },
  updated(el: any, binding: any) {
    const { value, modifiers, arg } = binding
    if(!value) return
    let formatValue = value
    if(modifiers.toFixed) {
      formatValue = value.toFixed(arg)
    }
    if(modifiers.price) {
      formatValue = formatNumber(formatValue)
    }
    el.innerText = formatValue
  },

}