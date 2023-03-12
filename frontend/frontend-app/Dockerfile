<<<<<<< HEAD
FROM node:18-alpine

WORKDIR /user/src/app 

COPY ./package.json ./

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm","start"]
=======
FROM node:18-alpine

WORKDIR /user/src/app 

COPY ./package.json ./

RUN npm install
RUN npm install axios

COPY . .

EXPOSE 3000

CMD ["npm","start"]
>>>>>>> origin/ele
