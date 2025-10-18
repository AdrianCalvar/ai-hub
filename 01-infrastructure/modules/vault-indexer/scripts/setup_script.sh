#!/bin/bash
# Setup inicial del RAG Service
# Ejecutar desde: 01-infrastructure/

set -e  # Exit on error

echo "🚀 Creando estructura del RAG Service..."

# Directorio base
RAG_DIR="modules/core/services/rag-service"

# Crear directorios
mkdir -p ${RAG_DIR}/src
mkdir -p ${RAG_DIR}/data
mkdir -p ${RAG_DIR}/tests

echo "✓ Directorios creados"

# Crear package.json
cat > ${RAG_DIR}/package.json << 'EOF'
{
  "name": "rag-service",
  "version": "1.0.0",
  "description": "RAG service for Obsidian vault search",
  "main": "dist/api.js",
  "scripts": {
    "build": "tsc",
    "dev": "tsx watch src/api.ts",
    "start": "node dist/api.js",
    "index": "tsx src/indexer.ts",
    "test": "echo \"Tests not implemented yet\""
  },
  "dependencies": {
    "express": "^4.18.2",
    "vectordb": "^0.4.9",
    "chokidar": "^3.5.3"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.3"
  }
}
EOF

echo "✓ package.json creado"

# Crear tsconfig.json
cat > ${RAG_DIR}/tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
EOF

echo "✓ tsconfig.json creado"

# Crear .gitignore
cat > ${RAG_DIR}/.gitignore << 'EOF'
node_modules/
dist/
data/*.lance
*.log
.env
EOF

echo "✓ .gitignore creado"

# Crear Dockerfile
cat > ${RAG_DIR}/Dockerfile << 'EOF'
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
EOF

echo "✓ Dockerfile creado"

# Crear docker-compose.yml
cat > ${RAG_DIR}/docker-compose.yml << 'EOF'
version: "3.8"

services:
  rag-service:
    build: .
    container_name: rag-service
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
      - ../../../../Adrian's Mind:/app/vault:ro
    environment:
      - OLLAMA_HOST=http://ollama:11434
      - VAULT_PATH=/app/vault
      - DB_PATH=/app/data/vectors.lance
      - NODE_ENV=production
    networks:
      - hub_net
    depends_on:
      - ollama

networks:
  hub_net:
    external: true

# Nota: El servicio ollama debe estar definido en ../ollama/docker-compose.yml
EOF

echo "✓ docker-compose.yml creado"

echo ""
echo "✅ Estructura base creada en ${RAG_DIR}"
echo ""
echo "📋 Próximos pasos:"
echo "  1. cd ${RAG_DIR}"
echo "  2. npm install"
echo "  3. Verificar que todo esté correcto"
