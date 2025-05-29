FROM node:20-alpine

WORKDIR /app

COPY . .

# Gunakan npm ci agar build stabil dan cepat
RUN npm ci --omit=dev

# Port disesuaikan dengan server.js (5010 atau PORT dari env)
EXPOSE 8080

# Jalankan app
CMD ["node", "server.js"]
