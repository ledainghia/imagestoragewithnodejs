import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(e.target.files);
    }
  };

  const handleUpload = () => {
    if (selectedFiles) {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append('file', selectedFiles[i]);
      }

      axios
        .post('http://localhost:3001/upload', formData)
        .then((response: any) => {
          // Xử lý phản hồi từ server (ví dụ: hiển thị thông báo)
          console.log(response);
        })
        .catch((error: any) => {
          // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi)
          console.log(error);
        });
    }
  };

  const exportToExcel = () => {
    axios
      .get('http://localhost:3001/exportToExcel', {
        responseType: 'arraybuffer',
      })
      .then((response: { data: BlobPart }) => {
        // Tạo một tệp Excel từ dữ liệu binary
        const blob = new Blob([response.data], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'files.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch((error: any) => {
        console.error('Error exporting to Excel:', error);
      });
  };

  return (
    <div>
      <input type='file' multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Tải lên</button>
      {selectedFiles && (
        <div>
          <h2>Các tệp đã chọn:</h2>
          <ul>
            {Array.from(selectedFiles).map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}{' '}
      <button onClick={() => exportToExcel()}>Export to Excel</button>
    </div>
  );
}

export default App;
