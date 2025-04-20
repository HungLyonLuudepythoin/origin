# Use official Node image
FROM node:18

# Set working directory
WORKDIR /app

# Copy and install deps
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Use nodemon from node_modules
CMD ["npm", "run", "dev"]