FROM node:20-alpine

WORKDIR /app

# Copiar package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copiar source
COPY tsconfig.json ./
COPY src ./src

# Build
RUN npm run build

# Crear directorio para la base de datos
RUN mkdir -p /app/data

# Exponer puerto
EXPOSE 3000

# Start en producción
CMD ["npm", "start"]