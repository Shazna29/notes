FROM node:14
WORKDIR /notesapplication
COPY package.json .
RUN npm install
COPY . .
CMD npm start