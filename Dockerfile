FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build Next.js application for production
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Koyeb default port configuration (overridable via process.env.PORT)
ENV PORT=8000
EXPOSE 8000

# Start production server listening on 0.0.0.0:$PORT
CMD ["npm", "start"]
