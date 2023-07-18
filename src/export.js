import * as XLSX from 'xlsx'

const exportToExcel = (data) => {
  const templatePath = './assets/template.xlsx'; // 替换为模板文件的实际路径

  // 读取模板文件
  const templateData = XLSX.readFile(templatePath, { type: 'binary' });

  // 获取模板文件的第一个工作表
  const worksheet = templateData.Sheets[templateData.SheetNames[0]];

  // 将数据插入到指定的单元格范围中
  const range = XLSX.utils.decode_range(worksheet['!ref']);
  for (let i = range.s.r + 1; i <= range.e.r; i++) {
    const rowData = [];
    for (let j = range.s.c; j <= range.e.c; j++) {
      const cellAddress = XLSX.utils.encode_cell({ r: i, c: j });
      rowData.push(worksheet[cellAddress]?.v);
    }

    const dataRow = data[i - range.s.r - 1];
    rowData.forEach((cellData, index) => {
      const cellAddress = XLSX.utils.encode_cell({ r: i, c: index });
      if (cellData !== undefined) {
        worksheet[cellAddress].v = dataRow[cellData];
      }
    });
  }

  // 创建一个新的工作簿
  const workbook = XLSX.utils.book_new();

  // 将修改后的工作表添加到工作簿中
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

  // 将工作簿转换为二进制数据
  const excelData = XLSX.write(workbook, { type: 'binary', bookType: 'xlsx' });

  // 将二进制数据转换为Blob对象
  const blobData = new Blob([s2ab(excelData)], { type: 'application/octet-stream' });

  // 创建一个下载链接
  const downloadLink = document.createElement('a');
  downloadLink.href = window.URL.createObjectURL(blobData);
  downloadLink.download = 'data.xlsx';

  // 模拟点击下载链接
  downloadLink.click();
}

// 将字符串转换为ArrayBuffer对象
const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xFF;
  }
  return buf;
}


const writeToExcel = (filePath, sheetName, cellAddress, data) => {
  // 读取 Excel 文件
  const workbook = XLSX.readFile(filePath);

  // 获取工作表
  const worksheet = workbook.Sheets[sheetName];

  // 在指定单元格写入数据
  if (worksheet) {
    const cell = worksheet[cellAddress];
    if (cell) {
      cell.v = data;
    } else {
      console.error('指定的单元格不存在。');
      return;
    }
  } else {
    console.error('指定的工作表不存在。');
    return;
  }

  // 将修改后的工作簿写入新文件
  const newFilePath = filePath.replace('.xlsx', '_updated.xlsx');
  XLSX.writeFile(workbook, newFilePath);
  console.log(`已写入数据到文件: ${newFilePath}`);
}

export {
  exportToExcel,
  writeToExcel
}