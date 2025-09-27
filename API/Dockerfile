FROM node:20-alpine
WORkDIR usr/src/app
COPY package*.json ./
RUN npm install
COPY . . .
EXPOSE 3000
CMD ["node", "src/app.js"]