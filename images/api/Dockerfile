# FROM node:latest

# WORKDIR /usr/app

# COPY package*.json .

# RUN npm install --quiet

# COPY ./ ./

# CMD ["npm", "start"]



# Use an official Node.js image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/app

# Install nodemon globally
RUN npm install -g nodemon

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application to the container
COPY . .

EXPOSE 3000

# Specify the command to run on container start
CMD ["npm", "run", "dev"]

