FROM node:14

COPY ./package*.json /myfolder/ 
WORKDIR  /myfolder/
RUN npm install

COPY . /myfolder/

CMD npm run start:dev