# Small official Node base image
FROM node:20-alpine

WORKDIR /app

# Install production dependencies first (better layer caching)
COPY package*.json ./
RUN npm install --omit=dev

# Copy application code
COPY app.js server.js ./

EXPOSE 3000

CMD ["node", "server.js"]
