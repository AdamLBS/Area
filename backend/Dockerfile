FROM node:18-alpine3.18 as base

RUN apk --no-cache add curl

# Create a directory for the application
WORKDIR /app

# Copy both package.json and package-lock.json to the working directory
COPY package*.json ./

# Install all dependencies, including dev dependencies
RUN npm install

# Production only deps stage
FROM base as production-deps

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json again (from the previous stage)
COPY --from=base /app/package*.json ./

# Clean the npm cache and install only production dependencies
RUN npm cache clean --force
RUN npm ci --only=production

# Download and run node-prune
RUN wget https://gobinaries.com/tj/node-prune --output-document - | /bin/sh && node-prune

# Build stage
FROM base as build

# Set the working directory to /app
WORKDIR /app

# Copy the application code and node_modules from the previous stages
COPY --from=production-deps /app/node_modules /app/node_modules
COPY . .
# Run the Ace build command
RUN npm run build

COPY .env build/.env
COPY run.sh build/run.sh
RUN chmod 0777 build/run.sh
# Production stage
FROM base

# Set environment variables
ENV NODE_ENV=production

# Set the working directory to /app
WORKDIR /app

# Copy node_modules and the built application from the previous stages
COPY --from=production-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app
# Expose the port
EXPOSE 3333

# Start the application
CMD ["sh", "-c", "npm run migrate"]
