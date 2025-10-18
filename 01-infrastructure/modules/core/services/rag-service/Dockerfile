FROM node:20-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copiar source
COPY tsconfig.json ./
COPY src ./src

# Build
RUN npm run build

# Exponer puertos
EXPOSE 3000

# Start
CMD ["npm", "start"]
