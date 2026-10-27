# Multi-stage Dockerfile for FairWork AI
# Optimized for Google Cloud Run deployment

# --- Stage 1: Build Frontend (Vite + React + Tailwind) ---
FROM node:20-alpine AS client-builder
WORKDIR /app/client

# Copy client dependency manifests
COPY client/package*.json client/.npmrc* ./
RUN npm install

# Copy client source files & build production bundle
COPY client/ ./
RUN npm run build

# --- Stage 2: Production Server & Unified Runtime ---
FROM node:20-alpine AS runner
WORKDIR /app

# Set production environment
ENV NODE_ENV=production
# Google Cloud Run injects the PORT environment variable (default 8080)
ENV PORT=8080

# Copy server package manifests & install production dependencies
COPY server/package*.json server/.npmrc* ./server/
WORKDIR /app/server
RUN npm install --only=production

# Copy server source code
COPY server/ /app/server/

# Copy built frontend assets from Stage 1 into client/dist
COPY --from=client-builder /app/client/dist /app/client/dist

# Switch back to app root
WORKDIR /app

# Non-root user for security
USER node

# Expose standard Cloud Run port
EXPOSE 8080

# Start server (Express automatically serves /api routes and static frontend from client/dist)
CMD ["node", "server/index.js"]
