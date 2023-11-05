# Sử dụng hình ảnh Node.js có sẵn để xây dựng ứng dụng React
FROM node:latest as builder

# Tạo thư mục làm việc
WORKDIR /app

# Sao chép tệp package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các gói phụ thuộc
RUN npm install

# Sao chép mã nguồn ứng dụng vào thư mục làm việc
COPY . .

# Xây dựng ứng dụng React
RUN npm run build

# Sử dụng hình ảnh nginx để phục vụ ứng dụng React đã xây dựng
FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf

# Sao chép các tệp đã xây dựng từ bước trước vào thư mục của Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Cấu hình cổng mà Nginx sẽ lắng nghe
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]

