# Use an official Node.js runtime as a parent image
FROM node:22
# Install Python, pip, and required system packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    && apt-get clean

# Install Python packages
RUN pip3 install --no-cache-dir \
    tensorflow \
    numpy \
    matplotlib


# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have them)
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of your project files into the container
COPY . .

# Set a default port
ENV PORT=3000

# Expose the port that your application runs on
EXPOSE $PORT

# Define the command to run your Node.js application
CMD ["npm", "start"]
