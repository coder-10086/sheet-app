import ExcelJS from 'exceljs'
import { Buffer } from 'buffer'
import { Button, message } from 'antd';
import { useState } from 'react';
import toolFunc from './utils/tool';

const MatterUpload = ({ matterDetail, addCurrent, loginList }) => {
  const [event, setEvent] = useState('');

  const getMatterBaseInfo = () => {
    let baseList = [
      { cell: 'A1', value: `${matterDetail.matterSubjectName}事项解码表_V1.0（版本号）` },
      { cell: 'C2', value: toolFunc.is(matterDetail, 'formLoadWay', 0, '组件渲染', '非组件渲染') }, // 渲染方式
      { cell: 'E2', value: matterDetail.taskList[0]?.channelName }, // 终端类型
      { cell: 'G2', value: toolFunc.is(matterDetail, 'isAbled', 1, '启用', '停用') }, // 事项状态
      { cell: 'I2', value: toolFunc.is(matterDetail, 'isBackgroundAutomatic', 1, '是', '否') }, // 事项是否显示
      { cell: 'K2', value: '否' }, // 事项是否可撤销/撤回
      { cell: 'M2', value: toolFunc.is(matterDetail, 'isApprovalRevocation', 1, '是', '否') }, // 是否审批撤销
      { cell: 'O2', value: toolFunc.is(matterDetail, 'isConfigureRevocationFunc', 1, '是', '否') }, // 审批页面是否配置撤销功能
      { cell: 'Q2', value: toolFunc.is(matterDetail, 'isRevocationOpinion', 1, '是', '否') }, // 撤销时审批意见是否必输
      { cell: 'S2', value: toolFunc.is(matterDetail, 'isShowChangeInfo', 1, '是', '否') }, // 是否展示变更清册
      { cell: 'U2', value: toolFunc.is(matterDetail, 'isTemporaryStorage', 1, '是', '否') }, // 事项是否支持暂存功能
      { cell: 'W2', value: toolFunc.is(matterDetail, 'isSplitScreen', 1, '是', '否') }, // 是否分屏
      { cell: 'Y2', value: toolFunc.is(matterDetail, 'isBottomButtonFixed', 1, '是', '否') }, // 底部按钮是否需固定
      { cell: 'AA2', value: toolFunc.is(matterDetail, 'isUpBlockchain', 1, '是', '否') }, // 是否上区块链
      { cell: 'AC2', value: toolFunc.is(matterDetail, 'isViewCompleteProcess', 1, '是', '否') }, // 是否支持查看完整流程
      { cell: 'AE2', value: toolFunc.is(matterDetail, 'approvalCommentIsDisplayed', 1, '是', '否') }, // 审批意见卡片是否显示
      { cell: 'AG2', value: toolFunc.is(matterDetail, 'isMultipleEnter', 1, '是', '否') }, // 是否多次录入
      { cell: 'AI2', value: toolFunc.is(matterDetail, 'isConfReset', 1, '是', '否') }, // 是否配置重置功能
      { cell: 'AK2', value: matterDetail.printButtonAlgName }, // 打印按钮算法名称
      { cell: 'AM2', value: matterDetail.printButtonAlgTrigAttr }, // 打印按钮名称算法触发属性
      { cell: 'AO2', value: toolFunc.is(matterDetail, 'isShowNavigation', 1, '是', '否') }, // 右侧是否显示导航栏
      { cell: 'AQ2', value: toolFunc.is(matterDetail, 'displayOnPortrait', 1, '是', '否') }, // 是否在事项画像中显示
      { cell: 'C3', value: toolFunc.is(matterDetail, 'isAttachmentDispensabled', 1, '是', '否') }, // 附件是否可容缺办理
      { cell: 'E3', value: matterDetail.materialNameStorageAttr }, // 容缺材料名称存储属性
      { cell: 'G3', value: toolFunc.getRuleShowType(matterDetail.isShowRules) }, // 规则样式
      { cell: 'I3', value: matterDetail.uniqueBusinessAttribute }, // 唯一业务属性
      { cell: 'K3', value: toolFunc.getDisplayType(matterDetail.pictureDisplayMode) }, // 业务附件展示方式
      { cell: 'M3', value: toolFunc.is(matterDetail, 'eventEntryWay', 1, '单个录入', '批量录入') }, // 页面样式
      { cell: 'O3', value: toolFunc.is(matterDetail, 'isImport', 1, '是', '否') }, // 是否导入
      { cell: 'Q3', value: '' }, // 升序属性/降序属性
      { cell: 'S3', value: matterDetail.summationAttribute }, // 合计属性
      { cell: 'U3', value: '' }, // 操作列样式算法
      { cell: 'W3', value: toolFunc.is(matterDetail, 'isDeleteAll', 1, '是', '否') }, // 是否全部删除
      { cell: 'Y3', value: toolFunc.is(matterDetail, 'isBatchProcess', 1, '是', '否') }, // 是否批处理
      { cell: 'AA3', value: toolFunc.is(matterDetail, 'listShowStyle', 0, '卡片', '清册') }, // 清册展示样式
      { cell: 'AC3', value: toolFunc.is(matterDetail, 'isShowProcessNodeRoles', 1, '是', '否') }, // 流程节点是否显示角色
      { cell: 'AE3', value: matterDetail.helpCenterAddress }, // 帮助中心地址
      { cell: 'AG3', value: matterDetail.helpCenterAlias }, // 帮助中心地址别名
      { cell: 'AI3', value: toolFunc.is(matterDetail, 'isAutoClosePrompt', 1, '是', '否') }, // 是否自动关闭提示信息
      { cell: 'AK3', value: toolFunc.is(matterDetail, 'isStateSecret', 1, '是', '否') }, // 是否上国密
      { cell: 'AM3', value: matterDetail.commentsMinNum }, // 退回时审批意见最少输入字段
      { cell: 'AO3', value: toolFunc.is(matterDetail, 'isMultiplexSign', 1, '是', '否') }, // 是否复用签字功能
    ]
    return baseList
  }

  const getFieldList = () => {
    if (matterDetail.attribute.length < 2) {
      return []
    }
    let fieldList = []
    const filterList = matterDetail.attribute.filter(item => item.controlFieldNumber === 0)
    let initFieldList = filterList.slice(2, filterList.length)
    for (let i = 0; i < initFieldList.length; i++) {
      let D = { cell: `D${9 + i}`, value: initFieldList[i].fieldName || '' } // 属性名称
      let E = { cell: `E${9 + i}`, value: initFieldList[i].alias || '' } // 属性别名
      let F = { cell: `F${9 + i}`, value: '——' } // 分步名称
      let G = { cell: `G${9 + i}`, value: toolFunc.is(initFieldList[i], 'isFuzzySearch', 1, '是', '否') } // 是否支持模糊搜索
      let H = { cell: `H${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'sfxs', 1, '是', '否') } // 是否显示
      let I = { cell: `I${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'sfbj', 1, '是', '否') } // 是否可编辑
      let J = { cell: `J${9 + i}`, value: toolFunc.isRequired(JSON.parse(initFieldList[i].attributeType).sfbt) } // 是否必填
      let K = { cell: `K${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'sfxgsf', 1, '是', '否') } // 是否修改算法
      let L = { cell: `L${9 + i}`, value: toolFunc.getDefaultValue(JSON.parse(initFieldList[i].attributeType).mrz) } // 默认值
      let M = { cell: `M${9 + i}`, value: JSON.parse(initFieldList[i].attributeType).tsy } // 提示语
      let N = { cell: `N${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'sfzwlcfztj', 1, '是', '否') } // 是否作为流程参数（分支或消息提醒）
      let O = { cell: `O${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'isrulebody', 1, '是', '否') } // 是否作为审批规则参数
      let P = { cell: `P${9 + i}`, value: toolFunc.is(initFieldList[i], 'isChildProcess', 1, '是', '否') } // 是否子流程参数
      let Q = { cell: `Q${9 + i}`, value: toolFunc.getFlowText(JSON.parse(initFieldList[i].attributeType).sfxzlcjd, JSON.parse(initFieldList[i].attributeType).lcjdsxData) } // 流程节点设置属性
      let R = { cell: `R${9 + i}`, value: toolFunc.is(initFieldList[i], 'isChangeListDisplay', 1, '是', '否') } // 是否在变更清册中展示
      let S = { cell: `S${9 + i}`, value: toolFunc.filterLoginInfo(loginList, 'num', initFieldList[i].loginInfo, 'name') } // 登录信息
      let T = { cell: `T${9 + i}`, value: '' } // 联想搜索显示属性
      let U = { cell: `U${9 + i}`, value: '' } // 联想查询类型
      let V = { cell: `V${9 + i}`, value: '' } // 画像跳转
      let W = { cell: `W${9 + i}`, value: initFieldList[i].ruleName } // 办理规则
      let X = { cell: `X${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'sfzwggsx', 1, '是', '否') } // 是否作为公共属性
      let Y = { cell: `Y${9 + i}`, value: JSON.parse(initFieldList[i].attributeType).sxxrlk } // 属性渲染列宽
      let Z = { cell: `Z${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'sfxgwhlht', 1, '是', '否') } // 是否修改为互联互通
      let AA = { cell: `AA${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'sfxgwhlht', 1, '是', '否') } // 是否显示互联互通按钮
      let AB = { cell: `AB${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'sfpzdytj', 1, '是', '否') } // 是否配置调用条件
      let AC = { cell: `AC${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'sfxsfdjtb', 1, '是', '否') } // 是否显示放大镜图标
      let AD = { cell: `AD${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i]?.timeFrame || '{}'), 'sfpzsjfw', 1, '是', '否') } // 是否配置时间范围
      let AE = { cell: `AE${9 + i}`, value: '' } // 数据范围
      let AF = { cell: `AF${9 + i}`, value: '' } // 属性样式算法
      let AG = { cell: `AG${9 + i}`, value: initFieldList[i].attributeNumber } // 属性占位列数
      let AH = { cell: `AH${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'xlkzsfs', 1, '树状', '非树状') } // 下拉框展示方式
      let AI = { cell: `AI${9 + i}`, value: '' } // 事项拥有属性和其他对象属性赋值关系
      let AJ = { cell: `AJ${9 + i}`, value: '' } // 集成读卡设备
      let AK = { cell: `AK${9 + i}`, value: '' } // 读卡属性和事项拥有属性赋值关系
      let AL = { cell: `AL${9 + i}`, value: toolFunc.is(initFieldList[i], 'isEncrypt', 1, '是', '否') } // 是否加密
      let AM = { cell: `AM${9 + i}`, value: toolFunc.is(initFieldList[i], 'isAddSignature', 1, '是', '否') } // 是否加签
      let AN = { cell: `AN${9 + i}`, value: toolFunc.is(JSON.parse(initFieldList[i].attributeType), 'sfjmzs', 1, '是', '否') } // 是否加密展示
      let listItem = [D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z, AA, AB, AC, AD, AE, AF, AG, AH, AI, AJ, AK, AL, AM, AN]
      fieldList.push(listItem)
    }
    console.log('数据格式化结果：', fieldList);
    return fieldList
  }

  const writeFieldsList = (worksheet) => {
    const fieldList = getFieldList()
    for (let i = 0; i < fieldList.length; i++) {
      for (let j = 0; j < fieldList[i].length; j++) {
        const cellAddress = fieldList[i][j].cell;
        const cell = worksheet.getCell(cellAddress);
        cell.value = fieldList[i][j].value;
      }
    }
  }

  const writeBaseInfo = (worksheet) => {
    const baseInfo = getMatterBaseInfo()
    for (let i = 0; i < baseInfo.length; i++) {
      const cellAddress = baseInfo[i].cell;
      const cell = worksheet.getCell(cellAddress);
      cell.value = baseInfo[i].value;
    }
  }

  const handleFileUpload = (event) => {
    setEvent(event)
  }

  const writeData = (worksheet) => {
    writeBaseInfo(worksheet)
    writeFieldsList(worksheet)
  }

  const handleConfirm = (event) => {
    if (!event) {
      message.warning('请上传模板')
      return
    }
    const file = event.target.files[0];

    const workbook = new ExcelJS.Workbook();
    const reader = new FileReader();

    reader.onload = function (e) {
      const arrayBuffer = e.target.result;
      const uint9Array = new Uint8Array(arrayBuffer);
      const buffer = Buffer.from(uint9Array);

      workbook.xlsx.load(buffer)
        .then(() => {
          const worksheet = workbook.getWorksheet('事项解码表模板');

          // 处理读取到的工作表数据
          // ...

          // 示例：在指定单元格写入数据并保留样式
          // const cellAddress = 'B2'; // 替换为你要写入数据的单元格地址
          // const cell = worksheet.getCell(cellAddress);
          // cell.value = 'Hello, World excel.js!'; // 替换为你要写入的实际数据


          // 数据写入
          writeData(worksheet)

          // 保存工作簿并提供下载链接
          const downloadLink = document.createElement('a');
          workbook.xlsx.writeBuffer()
            .then((buffer) => {
              const blobData = new Blob([buffer], { type: 'application/octet-stream' });
              downloadLink.href = window.URL.createObjectURL(blobData);
              downloadLink.download = `${matterDetail.matterSubjectName}事项解码表.xlsx`
              downloadLink.click();
            })
            .catch((error) => {
              message.error(`无法保存工作簿: ${error}`)
              console.error('无法保存工作簿:', error);
            });
        })
        .catch((error) => {
          message.error(`无法加载Excel文件: ${error}`)
          console.error('无法加载Excel文件:', error);
        });
    };

    reader.readAsArrayBuffer(file);
    setEvent('')
    addCurrent()
  };


  return (
    <div className='upload-box'>
      <div>
        <input className='input-file' type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
      </div>
      <Button className='button-style' type="primary" onClick={() => handleConfirm(event)}>Confirm</Button>
    </div>
  );

}

export default MatterUpload;