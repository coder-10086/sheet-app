import * as XLSX from 'xlsx'

const SheetUpload = () => {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // 处理读取到的工作簿数据
      // ...

      // 示例：获取第一个工作表的数据
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // 示例：将数据写入指定单元格
      const cellAddress = 'A1'; // 替换为你要写入数据的单元格地址
      worksheet[cellAddress] = { v: 'Hello, World!', t: 's' }; // 替换为你要写入的实际数据

      // 示例：将修改后的工作簿转换为二进制数据
      const excelData = XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });

      // 示例：将二进制数据转换为Blob对象
      const blobData = new Blob([excelData], { type: 'application/octet-stream' });

      // 示例：创建一个下载链接
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blobData);
      downloadLink.download = 'updated_data.xlsx';

      // 示例：模拟点击下载链接
      downloadLink.click();
    };

    reader.readAsArrayBuffer(file);
  };


  return (
    <div>
      <h2>Select Your Excel</h2>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
    </div>
  );

}

export default SheetUpload;