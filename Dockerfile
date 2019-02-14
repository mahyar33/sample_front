FROM node:10
WORKDIR /sample-front
COPY package.json /sample-front
RUN npm install
COPY . /sample-front
CMD npm start
EXPOSE 3000