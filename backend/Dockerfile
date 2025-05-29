FROM node:20-alpine
WORKDIR /app
COPY . .
COPY .env .env
RUN cat .env
RUN npm install --production
EXPOSE 5003
CMD ["node", "server.js"]