# Dockerfile

# Why multi-stage build?
# Stage 1: Build the React app (requires Node.js)
# Stage 2: Serve with nginx (lightweight, production-ready)
# Benefits: Smaller final image, faster deployments, production-optimized

# ===== Build Stage =====
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files first (for better layer caching)
# If package.json hasn't changed, Docker uses cached layer
COPY package*.json ./

# Install dependencies
RUN npm ci 

# Copy source code
COPY . .

# Build the application
# This creates /app/dist directory with static files
RUN npm run build

# ===== Production Stage =====
FROM nginx:alpine

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built static files from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# nginx runs in foreground by default
CMD ["nginx", "-g", "daemon off;"]