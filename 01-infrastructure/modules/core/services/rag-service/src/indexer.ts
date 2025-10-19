// src/indexer.ts
// Indexer - Lee context files y genera embeddings
import * as fs from "fs";
import * as path from "path";
import { config } from "./config";
import { parseContextFile, VaultChunk, validateChunk } from "./parser";
import { generateEmbedding } from "./embeddings";
import { saveChunks } from "./database";
import type { VaultChunkWithVector } from "./database";
import { NoteType } from "./types";

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

  const projects = items.filter((item) => {
    const fullPath = path.join(projectsPath, item);
    const stat = fs.statSync(fullPath);

    // Solo directorios, no ocultos ni especiales
    return stat.isDirectory() && !item.startsWith(".") && !item.startsWith("_");
  });

  return projects;
}

/**
 * Lee un context file específico
 */
export function readContextFile(
  project: string,
  fileName: string
): string | null {
  const filePath = path.resolve(
    config.vault.basePath,
    config.vault.projectsPath,
    project,
    fileName
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  return fs.readFileSync(filePath, "utf-8");
}

export const getNoteType = (fileName: string) => {
  return fileName.replace("s.md", "") as NoteType;
};

/**
 * Extrae todos los chunks de todos los context files
 */
export function extractAllChunks(): VaultChunk[] {
  console.log("📂 Scanning projects...");

  const projects = getProjects();
  console.log(`   Found ${projects.length} projects: ${projects.join(", ")}`);
  console.log("");

  const allChunks: VaultChunk[] = [];

  for (const project of projects) {
    console.log(`📁 Processing: ${project}`);

    for (const fileName of config.vault.contextFiles) {
      const typeName = getNoteType(fileName);
      const content = readContextFile(project, fileName);

      if (!content) {
        console.log(`   ⚠️  ${fileName} not found`);
        continue;
      }

      const sourceFile = path.join(
        config.vault.projectsPath,
        project,
        fileName
      );

      const chunks = parseContextFile(content, project, typeName, sourceFile);

      // Validar chunks
      const validChunks = chunks.filter(validateChunk);
      const invalidCount = chunks.length - validChunks.length;

      if (invalidCount > 0) {
        console.log(
          `   ⚠️  ${fileName}: ${invalidCount} invalid chunks skipped`
        );
      }

      console.log(`   ✓ ${fileName}: ${validChunks.length} chunks`);
      allChunks.push(...validChunks);
    }

    console.log("");
  }

  return allChunks;
}

/**
 * Indexar vault completo (sin guardar en DB todavía)
 */

/**
 * Indexar vault completo y guardar en LanceDB
 */
export async function indexVault() {
  console.log("🔄 ========================================");
  console.log("🔄 Starting Indexing Process");
  console.log("🔄 ========================================");
  console.log("");

  const startTime = Date.now();

  try {
    // 1. Extraer chunks
    const chunks = extractAllChunks();
    console.log(`📊 Total chunks extracted: ${chunks.length}`);
    console.log("");

    if (chunks.length === 0) {
      console.log("⚠️  No chunks to index");
      return;
    }

    // 2. Generar embeddings para TODOS los chunks
    console.log("🔄 Generating embeddings...");
    const chunksWithVectors: VaultChunkWithVector[] = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];

      if ((i + 1) % 10 === 0 || i === 0) {
        console.log(
          `   [${i + 1}/${chunks.length}] ${chunk.project}/${chunk.type}`
        );
      }

      try {
        const vector = await generateEmbedding(chunk.text);
        chunksWithVectors.push({ ...chunk, vector });
      } catch (error) {
        console.error(
          `   ❌ Error generating embedding for chunk ${chunk.id}:`,
          error
        );
        // Continuar con los demás chunks
      }
    }

    console.log(
      `✓ Embeddings generated: ${chunksWithVectors.length}/${chunks.length}`
    );
    console.log("");

    // 3. Guardar en LanceDB
    console.log("💾 Saving to vector database...");
    await saveChunks(chunksWithVectors);
    console.log("");

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("✅ ========================================");
    console.log(`✅ Indexing Completed (${duration}s)`);
    console.log("✅ ========================================");
    console.log(`📊 Total chunks indexed: ${chunksWithVectors.length}`);
    console.log(`💾 Database: ${config.db.path}`);
    console.log("");
  } catch (error) {
    console.error("❌ ========================================");
    console.error("❌ Indexing Failed");
    console.error("❌ ========================================");
    console.error(error);
    throw error;
  }
}

// CLI execution
if (require.main === module) {
  indexVault()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Fatal error:", error);
      process.exit(1);
    });
}
