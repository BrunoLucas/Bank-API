FROM node:carbon
# Create app directory
WORKDIR /home/lucas/fileserver

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apt-get update

RUN npm install

# Bundle app source
COPY . .

CMD [ "npm", "start" ]

EXPOSE 8080

EXPOSE 27017
