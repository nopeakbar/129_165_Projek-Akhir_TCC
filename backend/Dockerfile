FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

# Install dependencies secara bersih (npm ci), tanpa dev dependencies
RUN npm ci --omit=dev

# Copy seluruh source code setelah install dependencies (cache lebih optimal)
COPY . .

# Expose port sesuai yang server.js pakai, misal 5003
EXPOSE 5003

# Jalankan app
CMD ["node", "server.js"]
