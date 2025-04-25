# Use official Node image
FROM node:18

# Install build tools to compile bcrypt and other native modules
RUN apt-get update && apt-get install -y \
  build-essential \
  python3 \
  make \
  g++

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Use nodemon from node_modules
CMD ["npm", "run", "dev"]
