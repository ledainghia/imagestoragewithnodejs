const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const cors = require("cors"); // Import thư viện cors
const fs = require("fs"); // Import thư viện fs
const app = express();
const port = 3001;
const ExcelJS = require("exceljs"); // Import thư viện exceljs
app.use(fileUpload());

// Xác định đường dẫn tuyệt đối đến thư mục 'uploads'
const uploadDir = path.join(__dirname, "uploads");

app.use(cors()); // Sử dụng middleware cors để cho phép các yêu cầu từ các nguồn khác nhau

app.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const uploadedFiles = Array.isArray(req.files.file)
    ? req.files.file
    : [req.files.file];

  uploadedFiles.forEach((file) => {
    fileName = file.name.substring(file.name.lastIndexOf(" ") + 1);
    if (file.name.lastIndexOf(" ") === -1) {
      return res.status(400).send("No files were uploaded.");
    }
    const uploadPath = path.join(uploadDir, fileName);

    file.mv(uploadPath, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    });
  });

  res.send("Files uploaded!");
});
// Tạo một route mới để lấy danh sách tên các tệp trong thư mục uploads và xuất thành tệp Excel
app.get("/exportToExcel", (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Files");

  // Lấy danh sách tên các tệp trong thư mục uploads
  const files = fs.readdirSync(uploadDir);

  // Thêm tên các tệp vào worksheet
  files.forEach((file, index) => {
    worksheet.addRow([file]);
  });

  // Tạo một tệp Excel và gửi nó về client
  res.setHeader("Content-Type", "application/vnd.openxmlformats");
  res.setHeader("Content-Disposition", "attachment; filename=files.xlsx");
  workbook.xlsx.write(res).then(() => {
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
