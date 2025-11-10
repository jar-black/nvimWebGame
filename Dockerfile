# Use Node.js LTS version
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start the development server
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]
