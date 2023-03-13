FROM node:18-alpine

WORKDIR /user/src/app 

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install
RUN npm install http-proxy-middleware

COPY . .

EXPOSE 3000

CMD ["npm","start"]
