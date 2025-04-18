# Use official Node image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port your app runs on (optional unless you want to access it externally)
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
