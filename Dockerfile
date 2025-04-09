# Stage 1: Build the application
FROM node:22-slim AS builder

WORKDIR /app

# Copy package files and install dependencies
COPY package.json /app
COPY package-lock.json /app
COPY tsconfig.json /app

COPY src /app/src
# Use npm ci for cleaner installs, ensure package-lock.json exists
RUN npm install

# Build the TypeScript code
RUN npm run build

# Prune development dependencies
RUN npm prune --production

# Stage 2: Create the final production image
FROM node:22-slim

WORKDIR /app

# Create a non-root user
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Copy built code and production dependencies from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./

# Set ownership to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Command to run the server
# The API key will be passed via environment variable at runtime
CMD ["node", "dist/index.js"]