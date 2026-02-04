FROM oven/bun:1.3.8-alpine AS base

# Set the environment
ENV NEXT_PUBLIC_APP_ENV=production

ARG SOURCE_COMMIT
ENV SOURCE_COMMIT=${SOURCE_COMMIT}

# -----------------------------------

# Install dependencies
FROM base AS depends
WORKDIR /app

# Copy workspace structure needed for dependency resolution
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code after dependencies are installed
COPY . .

# Build the website
RUN bun run build

# Run the app
FROM node:alpine3.22 AS runner
WORKDIR /app

RUN apk add --no-cache curl

COPY --from=depends /app/node_modules ./node_modules
COPY --from=depends /app/public ./public
COPY --from=depends /app/.next ./.next
COPY --from=depends /app/package.json ./package.json

# Verify the build output
RUN ls -la

# Expose the app port
EXPOSE 3000
ENV HOSTNAME="0.0.0.0"
ENV PORT=3000

# Use the correct path to server.js
CMD ["npm", "start"]
