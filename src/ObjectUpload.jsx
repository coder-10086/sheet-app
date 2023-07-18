import ExcelJS from 'exceljs'
import { Buffer } from 'buffer'
import { Button, message } from 'antd';
import { useState } from 'react';


const findName = (id, list, filterFiled, targetFiled) => {
  const res = list.find(item => item[filterFiled] === id)
  return res ? res[targetFiled] : ''
}

const getLastStr = str => {
  const parts = str.split('/')
  const lastPart = parts[parts.length - 1]
  return lastPart
}

const ObjectUpload = (
  {
    spaceType,
    inputType,
    pointType,
    fwbsType,
    manageObj,
    deptList,
    addCurrent,
    fieldList,
    objectName,
    selectedObj,
  }
) => {
  const [event, setEvent] = useState('');
  const objBaseInfo = [
    { cell: 'B2', value: objectName || '——' }, // 对象名称
    { cell: 'B3', value: selectedObj.objectDataCategory === '01' ? '管理对象' : selectedObj.objectDataCategory === '02' ? '服务对象' : '业务对象' }, // 对象类型
    { cell: 'B4', value: (selectedObj.syObjectClass === '01' && selectedObj.objectDataCategory === '03') ? '是' : '否' }, // 是否可配置修改事项
    { cell: 'B5', value: findName(getLastStr(selectedObj.objectManager), manageObj, 'syObjectNumber', 'syObjectName') || '——' }, // 管理对象
    { cell: 'B6', value: selectedObj.managementTeamName || '——' }, // 服务标识
    { cell: 'B7', value: selectedObj.internalObject === 1 ? '是' : '否' }, // 是否内部对象
    { cell: 'B8', value: selectedObj.managementTeamName || '——' }, // 管理组织
    { cell: 'B9', value: selectedObj.managementRoleName || '——' }, // 管理角色
    { cell: 'B10', value: `${selectedObj.syObjectDesc}\r\n 有${'xx'}个项目分类，${'xx'}个事项，${fieldList.length}个属性，${'xx'}个管理指标，${'xx'}个报表` }, // 对象概况
  ]

  const writeFieldsInfo = (worksheet) => {
    for (let i = 0; i < fieldList.length; i++) {
      for (let j = 0; j < fieldList[i].length; j++) {
        const cellAddress = fieldList[i][j].cell;
        const cell = worksheet.getCell(cellAddress);
        cell.value = fieldList[i][j].value;
      }
    }
  }

  const writeObjBaseInfo = (worksheet) => {
    for (let i = 0; i < objBaseInfo.length; i++) {
      const cellAddress = objBaseInfo[i].cell;
      const cell = worksheet.getCell(cellAddress);
      cell.value = objBaseInfo[i].value;
    }
  }

  const handleFileUpload = (event) => {
    setEvent(event)
  }

  const writeData = (worksheet) => {
    writeFieldsInfo(worksheet)
    writeObjBaseInfo(worksheet)
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
      const uint8Array = new Uint8Array(arrayBuffer);
      const buffer = Buffer.from(uint8Array);

      workbook.xlsx.load(buffer)
        .then(() => {
          const worksheet = workbook.getWorksheet('对象解码模板');

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
              downloadLink.download = `${objectName}对象解码表.xlsx`
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
    addCurrent()
    setEvent('')
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

export default ObjectUpload;