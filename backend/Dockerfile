FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 5003
CMD ["node", "server.js"]
