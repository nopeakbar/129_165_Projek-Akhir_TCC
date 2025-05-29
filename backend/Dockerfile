FROM node:20-alpine
WORKDIR /app

# Install dependencies only if needed
COPY package*.json ./
RUN npm install --production

# Copy all source code (pastikan .env juga sudah ada di sini)
COPY . .

# Expose port (optional in Cloud Run, but good practice)
EXPOSE 5003

CMD ["node", "server.js"]
