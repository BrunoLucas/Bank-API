FROM node:carbon
# Create app directory
WORKDIR /home/lucas/fileserver

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN apt-get update

RUN npm install
# Install MongoDB.
# RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
# RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list
# RUN dpkg-divert --local --rename --add /sbin/initctl
# RUN apt-get update
# RUN apt-get install mongodb-10gen
# RUN mkdir -p /data/db

# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

CMD [ "npm", "start" ]

EXPOSE 8080

EXPOSE 27017
