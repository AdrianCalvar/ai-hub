// src/test-parser.ts
// Test del parser con datos de ejemplo

import { parseContextFile } from '../parser';

// Mock de un context file típico
const mockContextFile = `# Hub - Decisiones

*Última actualización: 2025-10-17 18:30:00*

---

## ✅ Decisiones Recientes

### 2025-10-17

- Decidimos usar arquitectura hexagonal gradualmente → [[2025-10-17#14:00]]
- La implementación será en fases: primero domain, luego adapters → [[2025-10-17#16:30]]
- Rechazamos usar event sourcing por ahora, complejidad innecesaria → [[2025-10-17#17:00]]

### 2025-10-16

- Preferimos TypeScript sobre JavaScript puro para mejor type safety → [[2025-10-16#11:00]]
- Usaremos Zod para validación en boundaries → [[2025-10-16#11:30]]

### 2025-10-15

- Docker Compose para local dev, Kubernetes para prod → [[2025-10-15#10:00]]
- Monorepo con Turborepo para gestionar múltiples packages → [[2025-10-15#15:00]]

---

*Este archivo es auto-generado. No edites manualmente.*`;

function testParser() {
  console.log('🧪 Testing Parser...');
  console.log('');

  const chunks = parseContextFile(
    mockContextFile,
    'Hub',
    'decision',
    '01-Projects/Hub/decisions.md'
  );

  console.log(`📊 Total chunks parsed: ${chunks.length}`);
  console.log('');

  if (chunks.length === 0) {
    console.error('❌ No chunks parsed! Something is wrong.');
    process.exit(1);
  }

  // Mostrar primer chunk en detalle
  console.log('📝 First chunk:');
  console.log(JSON.stringify(chunks[0], null, 2));
  console.log('');

  // Mostrar todos los chunks (resumido)
  console.log('📋 All chunks:');
  chunks.forEach((chunk, i) => {
    console.log(`  [${i}] ${chunk.date} - ${chunk.text.substring(0, 50)}...`);
    console.log(`      → ${chunk.dailyRef || 'no ref'}`);
  });
  console.log('');

  // Validaciones
  const expectedCount = 7;
  if (chunks.length !== expectedCount) {
    console.error(`❌ Expected ${expectedCount} chunks, got ${chunks.length}`);
    process.exit(1);
  }

  // Verificar que todos tienen fecha
  const withoutDate = chunks.filter(c => !c.date);
  if (withoutDate.length > 0) {
    console.error(`❌ ${withoutDate.length} chunks without date`);
    process.exit(1);
  }

  // Verificar que todos tienen dailyRef
  const withoutRef = chunks.filter(c => !c.dailyRef);
  if (withoutRef.length > 0) {
    console.error(`❌ ${withoutRef.length} chunks without dailyRef`);
    process.exit(1);
  }

  console.log('✅ All parser tests passed!');
}

// Ejecutar
testParser();