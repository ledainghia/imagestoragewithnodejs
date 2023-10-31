# Sử dụng hình ảnh Nginx đã có sẵn
FROM nginx

# Sao chép tệp cấu hình Nginx tùy chỉnh vào hình ảnh
COPY nginx.conf /etc/nginx/nginx.conf

# Không cần sao chép dữ liệu từ express-app ở đây, vì dữ liệu sẽ được chia sẻ thông qua volumes

# Expose cổng mà Nginx chạy (mặc định là 80)
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]