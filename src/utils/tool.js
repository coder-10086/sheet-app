import textTemplate from "./textTemplate"

const 是否判断 = (obj, field, value) => {
  const targetObj = JSON.parse(obj.attributeType)
  return targetObj[field] == value ? '是' : '否'
}

const getAttributeType = (obj) => {
  const targetObj = JSON.parse(obj.attributeType)
  let res = ''
  switch (targetObj.sxys) {
    case 'select':
      res = '选择'
      break
    case 'RangePicker':
      res = '时间型'
      break
    case 'input':
      res = '文本输入框'
      break
    case 'DatePicker':
      res = '日期型'
      break
    case 'InputNumber':
      res = '数值输入框'
      break
  }
  return res
}

const getDataSource = (obj) => {
  let res = ''
  switch (obj.dataSource) {
    case 0:
      res = '系统生成'
      break
    case 1:
      res = '手工录入'
      break
    case 5:
      res = '关联对象'
      break
    default:
      res = '手工录入'
  }
  return res
}

// 获取精度类型
const getPrecisionType = (typeCode) => {
  let res = ''
  switch (typeCode) {
    case '01':
      res = '整数'
      break
    case '02':
      res = '十位'
      break
    case '03':
      res = '百位'
      break
    case '04':
      res = '千位'
      break
    case '05':
      res = '万位'
      break
    case '06':
      res = '十万位'
      break
  }
  return res
}

// 获取进位方式
const getCarryMode = (typeCode) => {
  let res = ''
  switch (typeCode) {
    case '01':
      res = '四舍五入'
      break
    case '02':
      res = '向上取整'
      break
    case '03':
      res = '向下取整'
      break
    case '04':
      res = '见角进元'
      break
    case '05':
      res = '见分进角'
      break
  }
  return res
}

const getRangePickerType = (typeCode) => {
  let res = ''
  switch (typeCode) {
    case 'year':
      res = '年'
      break
    case 'month':
      res = '月'
      break
    case 'date':
      res = '日'
      break
  }
  return res
}

const getPickerDefault = (typeCode) => {
  let res = ''
  switch (typeCode) {
    case '01':
      res = '当前日期'
      break
    case '02':
      res = '月初'
      break
    case '03':
      res = '月末'
      break
    // TODO: 未完待续
  }
  return res
}

const getDateType = (typeCode) => {
  let res = ''
  switch (typeCode) {
    case 'date':
      res = '年-月-日 时:分'
      break
    case 'time':
      res = '年-月-日 时:分:秒'
      break
    case 'hour':
      res = '时:分'
      break
  }
  return res
}

const getRuleShowType = (typeCode) => {
  let res = ''
  switch (typeCode) {
    case 1:
      res = '展开'
      break
    case 0:
      res = '折叠'
      break
    case 2:
      res = '不显示'
      break
  }
  return res
}

const getDisplayType = (typeCode) => {
  let res = ''
  switch (typeCode) {
    case 0:
      res = '折叠'
      break
    case 1:
      res = '按分类平铺'
      break
    case 2:
      res = '按附件平铺'
      break
  }
  return res
}

const is = (obj, field, value, firstText, secondText) => {
  return obj[field] == value ? firstText : secondText
}

const getDefaultValue = (data) => {
  const res = Array.isArray(data)
  return res ? data[0]?.name : data
}

const filterLoginInfo = (list, field, value, target) => {
  const res = list.filter(item => item[field] == value)
  return res.length > 0 ? res[0][target] : ''
}

const getFlowText = (val, list) => {
  if (!val) {
    return '否'
  } else {
    return textTemplate.getFlowDescribe(list)
  }
}

const isRequired = val => {
  let res = ''
  switch (val) {
    case 1:
      res = '是'
      break
    case 2:
      res = '是*'
      break
    case 0:
      res = '否'
      break
  }
  return res
}

export default {
  是否判断,
  getAttributeType,
  getDataSource,
  getPrecisionType,
  getCarryMode,
  getRangePickerType,
  getPickerDefault,
  getDateType,
  is,
  getRuleShowType,
  getDisplayType,
  getDefaultValue,
  filterLoginInfo,
  getFlowText,
  isRequired
}