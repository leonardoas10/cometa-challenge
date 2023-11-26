# Use an official Node runtime as a parent image
FROM node:14-alpine
WORKDIR /app
COPY package.json /app

# Install app dependencies
RUN npm install

# Copy the app source code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define environment variable
ENV REACT_APP_API_URL=http://localhost:3000

# Run the start script
CMD ["npm", "start"]
