# Sử dụng hình ảnh Node.js để xây dựng ứng dụng React
FROM node:latest AS builder

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc trong container
COPY package*.json ./

# Cài đặt các phụ thuộc của ứng dụng
RUN npm install  --force

# Sao chép tất cả các tệp và thư mục trong thư mục gốc của ứng dụng React vào thư mục làm việc trong container
COPY . .

# Xây dựng ứng dụng React và sao chép kết quả vào thư mục 'dist'
RUN npm run build


# Sử dụng hình ảnh Nginx để chạy ứng dụng đã xây dựng
FROM nginx:alpine

# Sao chép các tệp đã xây dựng từ bước trước (builder stage) vào thư mục root của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d


# Port mà Nginx sẽ lắng nghe
EXPOSE 80

# Khởi chạy Nginx khi container được khởi động
CMD ["nginx", "-g", "daemon off;"]
