// src/indexer.ts
// Indexer - Lee context files y genera embeddings

import * as fs from 'fs';
import * as path from 'path';
import { config } from './config';
import { parseContextFile, VaultChunk, validateChunk } from './parser';
import { generateEmbedding } from './embeddings';

/**
 * Obtiene lista de proyectos del vault
 */
export function getProjects(): string[] {
  const projectsPath = path.resolve(
    config.vault.basePath,
    config.vault.projectsPath
  );

  if (!fs.existsSync(projectsPath)) {
    throw new Error(`Projects path not found: ${projectsPath}`);
  }

  const items = fs.readdirSync(projectsPath);

  const projects = items.filter(item => {
    const fullPath = path.join(projectsPath, item);
    const stat = fs.statSync(fullPath);
    
    // Solo directorios, no ocultos ni especiales
    return stat.isDirectory() 
      && !item.startsWith('.') 
      && !item.startsWith('_');
  });

  return projects;
}

/**
 * Lee un context file específico
 */
export function readContextFile(
  project: string,
  type: 'tasks' | 'ideas' | 'decisions' | 'blockers'
): string | null {
  const filePath = path.resolve(
    config.vault.basePath,
    config.vault.projectsPath,
    project,
    `${type}.md`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, 'utf-8');
}

/**
 * Extrae todos los chunks de todos los context files
 */
export function extractAllChunks(): VaultChunk[] {
  console.log('📂 Scanning projects...');
  
  const projects = getProjects();
  console.log(`   Found ${projects.length} projects: ${projects.join(', ')}`);
  console.log('');

  const allChunks: VaultChunk[] = [];

  for (const project of projects) {
    console.log(`📁 Processing: ${project}`);

    for (const type of config.vault.contextFiles) {
      const typeName = type.replace('.md', '') as 'tasks' | 'ideas' | 'decisions' | 'blockers';
      const content = readContextFile(project, typeName);

      if (!content) {
        console.log(`   ⚠️  ${type} not found`);
        continue;
      }

      const sourceFile = path.join(
        config.vault.projectsPath,
        project,
        type
      );

      const chunks = parseContextFile(content, project, typeName, sourceFile);
      
      // Validar chunks
      const validChunks = chunks.filter(validateChunk);
      const invalidCount = chunks.length - validChunks.length;

      if (invalidCount > 0) {
        console.log(`   ⚠️  ${type}: ${invalidCount} invalid chunks skipped`);
      }

      console.log(`   ✓ ${type}: ${validChunks.length} chunks`);
      allChunks.push(...validChunks);
    }

    console.log('');
  }

  return allChunks;
}

/**
 * Indexar vault completo (sin guardar en DB todavía)
 */
export async function indexVault() {
  console.log('🔄 ========================================');
  console.log('🔄 Starting Indexing Process');
  console.log('🔄 ========================================');
  console.log('');

  const startTime = Date.now();

  try {
    // 1. Extraer chunks
    const chunks = extractAllChunks();
    console.log(`📊 Total chunks extracted: ${chunks.length}`);
    console.log('');

    if (chunks.length === 0) {
      console.log('⚠️  No chunks to index');
      return;
    }

    // 2. Generar embeddings (por ahora solo test con los primeros 3)
    console.log('🔄 Generating embeddings (testing with first 3)...');
    const testChunks = chunks.slice(0, 3);

    for (let i = 0; i < testChunks.length; i++) {
      const chunk = testChunks[i];
      console.log(`   [${i + 1}/${testChunks.length}] ${chunk.project}/${chunk.type}: ${chunk.text.substring(0, 40)}...`);
      
      const embedding = await generateEmbedding(chunk.text);
      console.log(`      ✓ Embedding generated (${embedding.length} dims)`);
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log('');
    console.log('✅ ========================================');
    console.log(`✅ Indexing Test Completed (${duration}s)`);
    console.log('✅ ========================================');
    console.log(`📊 Total chunks: ${chunks.length}`);
    console.log(`🧪 Tested: ${testChunks.length} chunks`);
    console.log('');

  } catch (error) {
    console.error('❌ ========================================');
    console.error('❌ Indexing Failed');
    console.error('❌ ========================================');
    console.error(error);
    throw error;
  }
}

// CLI execution
if (require.main === module) {
  indexVault()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}