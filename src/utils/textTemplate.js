// 数值输入框：
// 数值区间：1~99999999999;
// 默认值：
// 提示语：
// 数值类型：数值；
// 小数位数：0；
// 精度类型：
// 进位方式：


// 文本输入框：
// 最大长度：20；
// 文本框类型：普通输入框
// 默认值：
// 提示语：


// 时间型：
// 日期类型：年-月-日 时:分:秒；
// 默认值：
// 提示语


// 选择：
// 选择类型：单选；
// 提示语：
// 展示样式：下拉框


// 日期型：
// 日期类型：
// 默认值：
// 提示语：

// 数值输入框：
const inputNumberDescribe = (obj) => {
  return `数值区间：${obj.start || ''}~${obj.end || ''}
  默认值：${obj.defaultValue || ''}
  提示语：${obj.notice || ''}
  数值类型：${obj.numberType || ''}
  小数位数：${obj.precision || ''}
  精度类型：${obj.precisionType || ''}
  进位方式：${obj.carryMode || ''}`
}

// 文本输入框：
const inputDescribe = (obj) => {
  return `最大长度：${obj.len || ''}
    文本框类型：${obj.inputType || ''}
    默认值：${obj.defaultValue || ''}
    提示语：${obj.notice || ''}`
}

// 时间型：
const rangePickerDescribe = (obj) => {
  return `日期类型：${obj.type || ''}
    默认值：${obj.defaultValue || ''}
    提示语：${obj.notice || ''}`
}

// 选择：
const selectDescribe = (obj) => {
  return `选择类型：${obj.selectType || ''}
    提示语：${obj.notice || ''}
    展示样式：${obj.showType || ''}`
}

// 日期型：
const datePickerDescribe = (obj) => {
  return `日期类型：${obj.dateType || ''}
    默认值：${obj.defaultValue || ''}
    提示语：${obj.notice || ''}`
}

// 事项解码，流程节点描述
const getFlowDescribe = list => {
  if (list.length === 0) {
    return ''
  }
  let res = ''
  list.forEach(item => {
    res += `${item.sfbj ? '是' : '否'}、${item.sfxs ? '是' : '否'}、${item.lcjdmc};
    `
  })
  return res
}


export default {
  inputNumberDescribe,
  inputDescribe,
  rangePickerDescribe,
  selectDescribe,
  datePickerDescribe,
  getFlowDescribe
}