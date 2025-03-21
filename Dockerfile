# Use a Node.js image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the port your Next.js app will run on
EXPOSE 3000

# Define the command to start the app in production mode
CMD ["npm", "run", "start"]
