# Base Dockerfile - node-python-tensorflow

# Use the official Node 22 image as a base
FROM node:22

# Install Python, pip, and virtualenv
RUN apt-get update && \
    apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    python3-venv \
    build-essential \
    libgl1-mesa-glx \
    && apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create a virtual environment
RUN python3 -m venv /venv

# Install TensorFlow in the virtual environment
RUN /venv/bin/pip install --upgrade pip && \
    /venv/bin/pip install \
    numpy \
    opencv-python \
    tensorflow

# Set the PATH to include the virtual environment's binaries
ENV PATH="/venv/bin:$PATH"

# Verify installations (optional, can be removed for a cleaner image)
RUN python --version && pip show tensorflow
# Set the working directory inside the container
# The WORKDIR instruction sets the working directory for any RUN, CMD, ENTRYPOINT, COPY, and ADD instructions that follow it in the Dockerfile.
WORKDIR /app

# Copy package.json and package-lock.json (if you have them)
# The COPY instruction copies new files or directories from the source path to the container's destination path.
COPY Application/package*.json ./

# Install Node.js dependencies
# The RUN instruction executes any commands in a new layer on top of the current image and commits the results.
RUN npm install

# Copy the rest of your project files into the container
# The COPY instruction is used again to copy the rest of the project files into the container's working directory.
COPY Application/. ./

# Set a default port
# The ENV instruction sets environment variables that can be used by the running container.
ENV PORT=3000

# Expose the port that your application runs on
# The EXPOSE instruction informs Docker that the container listens on the specified network ports at runtime.
EXPOSE $PORT

# Define the command to run your Node.js application
# The CMD instruction provides defaults for an executing container.
CMD ["npm", "start"]
