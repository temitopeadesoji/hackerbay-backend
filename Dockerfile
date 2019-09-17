FROM node:10

WORKDIR /usr/app

# Copying package.json and package-lock.json using a wildcard
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]
