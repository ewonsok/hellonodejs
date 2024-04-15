FROM node:21-alpine3.18

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
# Install the dependencies
RUN npm install
# Copy the rest of the application code from the host to the image
COPY . .

#map the port 3000 of the container to the port 3000 of the host
EXPOSE 3000

# Run the application index.js
CMD ["node", "index.js"]