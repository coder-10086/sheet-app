
const mockData = [
  [
    { cell: 'C13', value: '对象实例id' },  // 属性名称
    { cell: 'D13', value: '店铺id' },  // 属性实例名称
    { cell: 'E13', value: '对象平台属性' }, // 属性类别
    { cell: 'F13', value: '数值输入框' }, // 属性样式
    { cell: 'G13', value: '长度：1-99999999999' }, // 属性样式说明
    { cell: 'H13', value: '系统生成' }, // 属性数据来源
    { cell: 'I13', value: '——' }, // 属性数据
    { cell: 'J13', value: '否' }, // 是否作为实例信息模糊搜索
    { cell: 'K13', value: '否' }, // 是否必填
    { cell: 'L13', value: '否' }, // 是否显示
    { cell: 'M13', value: '否' }, // 是否在对象画像中显示
    { cell: 'N13', value: '否' }, // 是否可编辑
    { cell: 'O13', value: '——' }, // 算法名称
    { cell: 'P13', value: '——' }, // 属性描述
    { cell: 'Q13', value: '是' }, // 是否唯一/关键属性
    { cell: 'R13', value: '一级' }, // 属性密级
  ],
  [
    { cell: 'C14', value: '对象实例编号' },  // 属性名称
    { cell: 'D14', value: '店铺编号' },  // 属性实例名称
    { cell: 'E14', value: '对象平台属性' }, // 属性类别
    { cell: 'F14', value: '数值输入框' }, // 属性样式
    { cell: 'G14', value: '长度：20' }, // 属性样式说明
    { cell: 'H14', value: '系统生成' }, // 属性数据来源
    { cell: 'I14', value: '——' }, // 属性数据
    { cell: 'J14', value: '否' }, // 是否作为实例信息模糊搜索
    { cell: 'K14', value: '否' }, // 是否必填
    { cell: 'L14', value: '否' }, // 是否显示
    { cell: 'M14', value: '否' }, // 是否在对象画像中显示
    { cell: 'N14', value: '否' }, // 是否可编辑
    { cell: 'O14', value: '——' }, // 算法名称
    { cell: 'P14', value: '——' }, // 属性描述
    { cell: 'Q14', value: '是' }, // 是否唯一/关键属性
    { cell: 'R14', value: '一级' }, // 属性密级
  ]
]

const writeData = (worksheet, list) => {
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      const cellAddress = list[i][j].cell;
      const cell = worksheet.getCell(cellAddress);
      cell.value = list[i][j].value;
    }
  }

}

export {
  mockData,
  writeData
}