# Workflows: IA Hub Personal

> **Versión:** 1.0  
> **Fecha:** 07 Octubre 2025  
> **Estado:** Definición Completa - Pre-Implementación

---

## 🎯 Executive Summary

Este documento define los workflows concretos del hub, priorizados y detallados end-to-end. Cada workflow especifica trigger, pasos, herramientas, datos y dependencias.

**Workflows identificados:** 17  
**Workflows P0 (MVP):** 4  
**Workflows P1 (Segunda Ola):** 5  
**Workflows P2+:** 8

---

## 📊 Priorization Matrix

### Criterios de Scoring

| Criterio                      | Peso | Descripción                                                 |
| ----------------------------- | ---- | ----------------------------------------------------------- |
| **Pain Level**                | 30%  | Cuánto duele el problema HOY (1=leve, 10=insoportable)      |
| **Usage Frequency**           | 25%  | Cuántas veces lo usarías (1=mensual, 10=múltiple diario)    |
| **Implementation Complexity** | 20%  | Esfuerzo requerido (10=trivial, 1=muy complejo)             |
| **Foundational**              | 15%  | Otros workflows dependen de este (1=standalone, 10=crítico) |
| **Quick Win**                 | 10%  | Resultados visibles rápido (1=gradual, 10=inmediato)        |

### Workflow Scores

| ID  | Workflow               | Pain | Freq | Complex | Found | QWin | **TOTAL** | Tier  |
| --- | ---------------------- | ---- | ---- | ------- | ----- | ---- | --------- | ----- |
| A1  | Captura Rápida Ideas   | 10   | 10   | 8       | 10    | 10   | **9.50**  | 🔥 P0 |
| D1  | Project Dashboard      | 8    | 10   | 7       | 9     | 8    | **8.45**  | 🔥 P0 |
| E2  | Auto-Tagging           | 7    | 8    | 6       | 9     | 7    | **7.65**  | 🔥 P0 |
| C1  | IA Context Persistente | 9    | 8    | 5       | 8     | 7    | **7.65**  | 🔥 P0 |
| E1  | Búsqueda Semántica     | 7    | 7    | 6       | 7     | 6    | **6.70**  | ⚠️ P1 |
| F1  | Daily Note Auto        | 6    | 10   | 7       | 6     | 8    | **7.10**  | ⚠️ P1 |
| W0  | Project Scaffolding    | 8    | 4    | 5       | 7     | 8    | **6.55**  | ⚠️ P1 |
| B1  | Email → Tasks          | 9    | 5    | 4       | 5     | 5    | **6.20**  | ⚠️ P1 |
| A2  | Captura Recursos       | 7    | 6    | 6       | 6     | 7    | **6.55**  | ⚠️ P1 |
| D2  | GitHub ↔ Obsidian      | 6    | 5    | 5       | 6     | 6    | **5.75**  | 🟡 P2 |
| C2  | Code Review Pre-PR     | 7    | 3    | 5       | 4     | 7    | **5.45**  | 🟡 P2 |
| A3  | Code Snippets          | 6    | 4    | 6       | 5     | 6    | **5.50**  | 🟡 P2 |
| D3  | Weekly Review          | 5    | 1    | 5       | 5     | 6    | **4.50**  | 🟡 P2 |
| B2  | Newsletter Processing  | 4    | 2    | 5       | 3     | 5    | **3.75**  | 🔵 P3 |
| C3  | Doc Generation         | 5    | 2    | 4       | 3     | 4    | **3.85**  | 🔵 P3 |
| F2  | Focus Mode             | 6    | 3    | 6       | 2     | 6    | **4.80**  | 🔵 P3 |
| G1  | Learning Log           | 4    | 2    | 5       | 4     | 4    | **3.80**  | 🔵 P3 |
| G2  | Tech Radar             | 3    | 1    | 6       | 2     | 4    | **3.05**  | 🔵 P3 |

---

## 🔥 TIER P0: MVP Absoluto

Workflows críticos que deben implementarse PRIMERO. Sin estos, el hub no tiene valor mínimo.

---

### A1. Captura Rápida de Ideas

**Score: 9.50 | Priority: P0**

#### Pain Point

Fricción en captura de información (Notion lento/complejo) → no documento → pierdo conocimiento

#### Trigger

Tengo una idea (en PC, en móvil, en reunión)

#### Estado Actual

- **PC:** Abro Notion → espero carga → busco dónde guardar → escribo → distraído (60+ segundos)
- **Móvil:** "Lo guardo mental" → lo olvido
- **Reunión:** Nota en papel → nunca la paso a digital

#### Estado Ideal

- **PC:** `Ctrl+Shift+I` → popup → escribo → Enter → guardado (5 segundos)
- **Móvil:** Widget/app → escribo → guardado
- **Voz:** Dictado → transcrito → guardado

---

#### Workflow Detallado

```
┌─────────────────────────────────────────────────────────┐
│ FASE 1: CAPTURA (Zero Friction)                         │
└─────────────────────────────────────────────────────────┘

1. Trigger:
   - PC: Hotkey global (Ctrl+Shift+I via AutoHotkey/Quickadd)
   - Mobile: Obsidian mobile quick action o Git commit directo

2. Input Interface:
   - Quickadd popup aparece
   - Campo: "Título de idea" (obligatorio)
   - Campo: "Descripción" (opcional)
   - Sin decisiones adicionales

3. Metadata Automática:
   - Timestamp: 2025-10-07T14:23:00
   - Source: quickadd | mobile | voice
   - Status: unprocessed

┌─────────────────────────────────────────────────────────┐
│ FASE 2: STORAGE (Inmediato)                             │
└─────────────────────────────────────────────────────────┘

4. File Creation:
   - Path: 00-Inbox/ideas/YYYY-MM-DD-HHmmss-{slug}.md
   - Template aplicado (Templater)
   - Frontmatter completo

5. Git Backup:
   - Obsidian Git plugin: auto-commit cada 10 min
   - Commit message: "Idea: {título}"

┌─────────────────────────────────────────────────────────┐
│ FASE 3: AUTO-TAGGING (Background, async)                │
└─────────────────────────────────────────────────────────┘

6. Detection (1 min después):
   - n8n polling detecta nuevas notas en 00-Inbox/ideas/
   - O file watcher trigger inmediato

7. Analysis (Ollama):
   - Prompt: "Analiza esta idea y sugiere 2-4 tags relevantes"
   - Lista base de tags existentes proporcionada
   - Genera nuevos tags si necesario

8. Tag Application:
   - Actualiza frontmatter con tags sugeridos
   - Añade sección "IA Suggestions" con razonamiento
   - Git commit automático

┌─────────────────────────────────────────────────────────┐
│ FASE 4: DASHBOARD VISIBILITY (Inmediato)                │
└─────────────────────────────────────────────────────────┘

9. Dataview Query:
   - Dashboard muestra "Recent Ideas (Unprocessed)"
   - Ordenadas por fecha desc
   - Tags visibles para scan rápido

10. Weekly Review:
    - Ideas sin procesar aparecen en review checklist
    - Usuario decide: desarrollar, archivar, o convertir en proyecto
```

---

#### Herramientas

| Componente            | Herramienta              | Razón                        |
| --------------------- | ------------------------ | ---------------------------- |
| **Capture (PC)**      | Obsidian Quickadd        | Hotkey global, cero fricción |
| **Capture (Mobile)**  | Obsidian mobile          | Nativo, sync via Git         |
| **Template Engine**   | Templater                | Templates dinámicos con JS   |
| **Auto-Tag Trigger**  | n8n polling (cada 1 min) | Detecta nuevas notas         |
| **Auto-Tag Analysis** | Ollama (Llama 3.3 70B)   | Clasificación inteligente    |
| **Backup**            | Obsidian Git plugin      | Auto-commit/push             |
| **Visualization**     | Dataview queries         | Dashboard dinámico           |

---

#### Estructura de Datos

**Archivo creado:** `00-Inbox/ideas/2025-10-07-142300-dark-mode-optimization.md`

```yaml
---
type: idea
created: 2025-10-07T14:23:00
source: quickadd
status: unprocessed
tags: []  # Vacío inicialmente, llenado por auto-tag
ai_tags_suggested: false
---

# Dark Mode Optimization

## Descripción
Implementar toggle de dark mode con persistencia en localStorage y detección de preferencia del sistema.

## Context
Usuario mencionó dificultad para leer en modo claro durante la noche.

---

## IA Analysis (Added by auto-tag)
**Suggested Tags:** #frontend #react #ux #performance
**Reasoning:** La idea involucra implementación frontend con React, mejora de UX y considera performance (localStorage vs context).
**Confidence:** 0.85

---

## Next Steps
- [ ] Revisar implementaciones similares en otros proyectos
- [ ] Decidir: component-level vs app-level theming
- [ ] Estimar esfuerzo
```

---

#### Dependencias Críticas

**Para Fase 1 (Captura):**

- ✅ Obsidian instalado
- ✅ Vault con estructura `00-Inbox/ideas/`
- ✅ Quickadd plugin instalado y configurado
- ✅ Templater plugin con template de idea
- ⚠️ AutoHotkey script para hotkey global (Windows)

**Para Fase 2 (Storage):**

- ✅ Obsidian Git plugin configurado
- ✅ Repositorio Git remoto (GitHub)
- ✅ Auto-commit cada 10 min activado

**Para Fase 3 (Auto-Tag):**

- ✅ n8n operativo (Docker)
- ✅ Ollama con modelo cargado
- ✅ Obsidian Local REST API plugin
- ✅ n8n workflow configurado

**Para Fase 4 (Dashboard):**

- ✅ Dataview plugin instalado
- ✅ Dashboard note con query

---

#### Configuración Requerida

**Quickadd Setup:**

```javascript
// Template: idea-capture.md
---
type: idea
created: {{DATE:YYYY-MM-DDTHH:mm:ss}}
source: quickadd
status: unprocessed
tags: []
ai_tags_suggested: false
---

# {{VALUE:title}}

## Descripción
{{VALUE:description}}

## Context
{{VALUE:context}}
```

**n8n Workflow (Pseudo-code):**

```
Trigger: Polling (every 1 min)
  → Check: 00-Inbox/ideas/ for files modified in last 2 min
  → Filter: files where ai_tags_suggested = false

For each file:
  → Read content via Obsidian REST API
  → Call Ollama:
      Prompt: "Analyze and suggest tags for this idea: {{content}}"
      Context: "Existing tags in vault: {{vault_tags}}"
  → Update file frontmatter:
      tags: [{{ollama_response.tags}}]
      ai_tags_suggested: true
  → Add IA Analysis section to file
  → Git commit
```

**Dataview Query (Dashboard):**

```dataview
TABLE
  created as "Captured",
  tags as "Tags",
  status as "Status"
FROM "00-Inbox/ideas"
WHERE status = "unprocessed"
SORT created DESC
LIMIT 10
```

---

#### Fricción Eliminada

| Antes (Notion)            | Después (Obsidian Hub) | Mejora                         |
| ------------------------- | ---------------------- | ------------------------------ |
| 60+ segundos captura      | 5 segundos captura     | **12x más rápido**             |
| Decisión: ¿dónde guardar? | Cero decisiones        | **Carga cognitiva eliminada**  |
| Sin clasificación         | Tags automáticos       | **Búsqueda futura facilitada** |
| Sin backup                | Git automático         | **Cero pérdida de datos**      |
| Ideas olvidadas           | Dashboard + review     | **Procesamiento sistemático**  |

---

#### Métricas de Éxito

**Semana 1:**

- [ ] 10+ ideas capturadas
- [ ] Tiempo promedio captura < 10 segundos
- [ ] 0 ideas perdidas (Git funcionando)

**Semana 4:**

- [ ] 50+ ideas capturadas
- [ ] Auto-tagging con 80%+ precisión
- [ ] 70%+ ideas procesadas (movidas de Inbox)

---

### D1. Project Dashboard

**Score: 8.45 | Priority: P0**

#### Pain Point

Tareas mal dimensionadas, difícil ver progreso, información dispersa (GitHub + Obsidian)

#### Trigger

Abro Obsidian (inicio del día, planning, mid-day check)

#### Estado Actual

- GitHub Projects muestra issues
- No veo contexto completo de proyectos
- Tareas muy grandes intimidatorias
- Sin vista unificada de TODO el trabajo

#### Estado Ideal

- Dashboard único en Obsidian
- Vista de proyectos activos con estado
- Tareas pendientes por proyecto
- Identificación de blockers
- Next actions claras

---

#### Workflow Detallado

```
┌─────────────────────────────────────────────────────────┐
│ FASE 1: DASHBOARD ACCESS (Zero Friction)                │
└─────────────────────────────────────────────────────────┘

1. Trigger:
   - Abro Obsidian
   - Hotkey: Ctrl+Shift+D (Dashboard)
   - O desde Daily Note (link)

2. Dashboard Note Opens:
   - Path: 04-System/dashboards/main.md
   - Dataview queries se ejecutan automáticamente
   - Renderizado en <2 segundos

┌─────────────────────────────────────────────────────────┐
│ FASE 2: PROJECTS OVERVIEW                               │
└─────────────────────────────────────────────────────────┘

3. Active Projects Query:
   - Lista proyectos con status = "active"
   - Metadata: stack, due date, prioridad
   - Conteo de tasks pendientes por proyecto
   - Last activity (último commit o update)

4. Visual Indicators:
   - 🔴 Red: due date próximo (<7 días)
   - 🟡 Yellow: sin actividad >2 semanas
   - 🟢 Green: progreso reciente

┌─────────────────────────────────────────────────────────┐
│ FASE 3: TASKS BREAKDOWN                                 │
└─────────────────────────────────────────────────────────┘

5. Tasks Due Today:
   - Query: tasks con due = today
   - Agrupadas por proyecto
   - Prioridad visible

6. Overdue Tasks:
   - Query: tasks con due < today AND status != done
   - Destacadas en rojo
   - Con días de retraso

7. Blocked Tasks:
   - Query: tasks con tag #blocked
   - Muestra razón del bloqueo
   - Acción requerida para desbloquear

┌─────────────────────────────────────────────────────────┐
│ FASE 4: INSIGHTS & RECOMMENDATIONS                      │
└─────────────────────────────────────────────────────────┘

8. Weekly Summary (opcional IA):
   - Commits esta semana por proyecto
   - Tasks completed vs created
   - Velocity trend

9. AI Recommendations (futuro):
   - "Proyecto X sin actividad 3 semanas"
   - "Task Y muy grande, considera dividir"
   - "Foco recomendado hoy: Proyecto Z"

┌─────────────────────────────────────────────────────────┐
│ FASE 5: QUICK ACTIONS                                   │
└─────────────────────────────────────────────────────────┘

10. Interactions:
    - Click en proyecto → abre nota de proyecto
    - Click en task → abre task note
    - Checkbox task → marca como done (actualiza frontmatter)
    - Botón "Add Task" → Quickadd task modal
```

---

#### Herramientas

| Componente        | Herramienta                             | Razón                        |
| ----------------- | --------------------------------------- | ---------------------------- |
| **Query Engine**  | Dataview plugin                         | SQL-like queries sobre vault |
| **Data Source**   | Obsidian vault (markdown + frontmatter) | Single source of truth       |
| **Visualization** | Dataview tables/lists                   | Nativo en Obsidian           |
| **Interactions**  | Obsidian native + Tasks plugin          | Checkboxes funcionales       |
| **Styling**       | CSS snippets (opcional)                 | Dashboard más visual         |

---

#### Estructura de Datos

**Dashboard Note:** `04-System/dashboards/main.md`

````markdown
# 🎯 Hub Dashboard

_Last updated: {{date}} {{time}}_

---

## 🚀 Active Projects

```dataview
TABLE
  status as "Status",
  length(file.tasks.where(t => !t.completed)) as "Tasks",
  due as "Due Date",
  stack as "Stack"
FROM "01-Projects"
WHERE status = "active"
SORT due ASC
```

---

## ✅ Tasks Due Today

```dataview
TASK
FROM "01-Projects"
WHERE !completed AND due = date(today)
GROUP BY file.link
```

---

## ⚠️ Overdue Tasks

```dataview
TASK
FROM "01-Projects"
WHERE !completed AND due < date(today)
GROUP BY file.link
```

---

## 🚧 Blocked Tasks

```dataview
TABLE
  file.link as "Task",
  blocked_reason as "Reason"
FROM "01-Projects"
WHERE contains(tags, "blocked")
```

---

## 📊 This Week

```dataview
TABLE
  file.tasks.where(t => t.completed).length as "Completed",
  file.tasks.where(t => !t.completed).length as "Pending"
FROM "01-Projects"
WHERE status = "active"
```

---

## 💡 Recent Ideas (Unprocessed)

```dataview
TABLE
  created as "Captured",
  tags as "Tags"
FROM "00-Inbox/ideas"
WHERE status = "unprocessed"
SORT created DESC
LIMIT 5
```

---

## 🔗 Quick Links

- [[01-Projects/README|Projects Index]]
- [[00-Inbox/README|Inbox]]
- [[03-Daily/{{date:YYYY-MM-DD}}|Today's Note]]
- [[04-System/templates/README|Templates]]
````

**Project Note Example:** `01-Projects/personal-finance-app/README.md`

```yaml
---
type: project
status: active
stack: [react, typescript, supabase]
start_date: 2025-09-15
due_date: 2025-12-01
priority: high
repo: https://github.com/user/finance-app
---

# Personal Finance App

## 📋 Overview
App para tracking de gastos personales con categorización automática usando IA.

## 🎯 Goals
- [ ] MVP funcional para uso personal
- [ ] Categorización automática con 85%+ precisión
- [ ] Dashboard de visualización

## 📊 Progress
- Completed: 12 tasks
- Pending: 8 tasks
- Blocked: 1 task

## ✅ Tasks

### In Progress
- [ ] Implement transaction categorization with Ollama #backend #ai 📅 2025-10-15
- [ ] Design dashboard layout #frontend #ux 📅 2025-10-12

### Blocked
- [ ] Setup Supabase auth #backend #blocked 📅 2025-10-10
  - Blocked by: Waiting for Supabase approval

### Backlog
- [ ] Add budget alerts feature
- [ ] Implement recurring transactions
- [ ] Export to CSV functionality

## 🏗️ Architecture
Ver [[02-Knowledge/architecture/finance-app-architecture]]

## 📝 Decisions
- [[02-Knowledge/architecture/ADR-015-supabase-vs-firebase|ADR-015: Why Supabase]]
- [[02-Knowledge/architecture/ADR-016-ollama-categorization|ADR-016: Ollama for Categorization]]

## 📈 Metrics
- Lines of Code: ~3,500
- Test Coverage: 72%
- Performance: <100ms API response

## 🔗 Links
- [GitHub Repo](https://github.com/user/finance-app)
- [Figma Designs](https://figma.com/...)
- [Supabase Dashboard](https://app.supabase.io/...)
```

---

#### Dependencias Críticas

**Para Dashboard Básico:**

- ✅ Obsidian Dataview plugin instalado
- ✅ Estructura de vault con `01-Projects/` y `00-Inbox/`
- ✅ Al menos 2-3 proyectos de ejemplo con frontmatter consistente
- ✅ Dashboard note creado

**Para Tasks Funcionales:**

- ✅ Obsidian Tasks plugin (opcional, mejora UX)
- ✅ Sintaxis de tasks consistente en notas

**Para Interactividad:**

- ✅ CSS snippets para styling (opcional)
- ⚠️ Commander plugin para quick actions (opcional)

---

#### Configuración Requerida

**Frontmatter Schema (Project):**

```yaml
---
type: project
status: active | paused | completed | archived
stack: [tag1, tag2, tag3]
start_date: YYYY-MM-DD
due_date: YYYY-MM-DD
priority: high | medium | low
repo: URL (opcional)
---
```

**Task Syntax:**

```markdown
- [ ] Task description #tag1 #tag2 📅 YYYY-MM-DD
- [x] Completed task ✅ YYYY-MM-DD
- [ ] Blocked task #blocked 🚧
```

**CSS Snippet (opcional) para visual dashboard:**

```css
/* .obsidian/snippets/dashboard.css */
.dashboard-table {
  font-size: 0.9em;
}

.dashboard-overdue {
  background-color: #ff000020;
}

.dashboard-today {
  background-color: #ffff0020;
}
```

---

#### Fricción Eliminada

| Antes                          | Después                | Mejora                          |
| ------------------------------ | ---------------------- | ------------------------------- |
| Cambiar a GitHub Projects      | Todo en Obsidian       | **Context switching eliminado** |
| Sin vista unificada            | Dashboard único        | **Visibilidad completa**        |
| Tareas dispersas               | Agrupadas por proyecto | **Organización clara**          |
| Sin identificación de blockers | Sección dedicada       | **Acción proactiva**            |
| Progreso no visible            | Métricas en dashboard  | **Motivación y tracking**       |

---

#### Métricas de Éxito

**Semana 1:**

- [ ] Dashboard muestra 3+ proyectos activos
- [ ] Tasks agrupadas correctamente
- [ ] Acceso a dashboard < 2 segundos

**Mes 1:**

- [ ] Dashboard es punto de entrada diario
- [ ] 80%+ tasks con due dates
- [ ] Blockers identificados y trackeados

---

### E2. Auto-Tagging

**Score: 7.65 | Priority: P0**

#### Pain Point

Falta organización general, no sé dónde están las cosas, todo queda en Inbox sin clasificar

#### Trigger

Nueva nota creada en Inbox (por cualquier método de captura)

#### Estado Actual

- Creo notas sin tags
- No sé en qué carpeta ponerlas
- Todo se acumula en Inbox
- Búsqueda posterior difícil

#### Estado Ideal

- IA analiza nota automáticamente
- Sugiere tags relevantes
- Aplica tags con alta confianza
- Crea taxonomía emergente (aprende de tags existentes)

---

#### Workflow Detallado

```
┌─────────────────────────────────────────────────────────┐
│ FASE 1: DETECTION (Inmediato)                           │
└─────────────────────────────────────────────────────────┘

1. Trigger Detection:
   - Método A: n8n polling (cada 1 min) busca nuevas notas
   - Método B: File watcher (más rápido, requiere script)

2. Filtrado:
   - Solo procesa notas con ai_tags_suggested = false
   - Ignora notas en proceso de edición (<2 min de creación)

┌─────────────────────────────────────────────────────────┐
│ FASE 2: ANALYSIS (IA)                                   │
└─────────────────────────────────────────────────────────┘

3. Context Gathering:
   - Lee contenido de nota (título + descripción)
   - Carga lista de tags existentes en vault
   - Carga frecuencia de uso de cada tag

4. IA Analysis (Ollama):
   - Prompt: "Analiza esta nota y sugiere 2-4 tags"
   - Contexto: Tags existentes + sus definiciones
   - Instrucciones:
     * Prioriza tags existentes (consistencia)
     * Crea nuevo tag solo si necesario
     * Explica razonamiento

5. Response Parsing:
   - Extrae tags sugeridos
   - Extrae confianza (0-1)
   - Extrae razonamiento

┌─────────────────────────────────────────────────────────┐
│ FASE 3: APPLICATION (Smart)                             │
└─────────────────────────────────────────────────────────┘

6. Confidence-Based Application:
   - Si confidence > 0.85: Aplica tags automáticamente
   - Si 0.65 < confidence < 0.85: Añade como sugerencia
   - Si confidence < 0.65: Solo registra en log

7. File Update:
   - Actualiza frontmatter con tags
   - Añade sección "IA Tagging Analysis"
   - Marca ai_tags_suggested = true
   - Git commit con mensaje descriptivo

┌─────────────────────────────────────────────────────────┐
│ FASE 4: LEARNING & REFINEMENT                           │
└─────────────────────────────────────────────────────────┘

8. User Feedback Collection:
   - Usuario puede editar tags manualmente
   - Sistema detecta cambios (Git diff)
   - Registra: sugerido vs aplicado

9. Tag Analytics (semanal):
   - Tags más usados
   - Tags redundantes (sinónimos)
   - Sugerencias de consolidación

10. Taxonomy Evolution:
    - Dashboard muestra tag hierarchy emergente
    - Sugerencias de reorganización
```

---

#### Herramientas

| Componente          | Herramienta            | Razón                    |
| ------------------- | ---------------------- | ------------------------ |
| **Detection**       | n8n polling            | Detecta nuevas notas     |
| **IA Analysis**     | Ollama (Llama 3.3 70B) | Clasificación contextual |
| **File Operations** | Obsidian REST API      | Update frontmatter       |
| **Tag Management**  | Obsidian native        | Tags nativos de Obsidian |
| **Analytics**       | Dataview queries       | Tag usage statistics     |
| **Learning**        | SQLite DB (en n8n)     | Feedback history         |

---

#### Estructura de Datos

**Nota ANTES de auto-tag:**

```yaml
---
type: idea
created: 2025-10-07T14:23:00
source: quickadd
status: unprocessed
tags: []
ai_tags_suggested: false
---
# Optimización de Queries de Database

## Descripción
Las queries a MongoDB están tardando >500ms. Investigar índices y caching con Redis.
```

**Nota DESPUÉS de auto-tag (confidence > 0.85):**

```yaml
---
type: idea
created: 2025-10-07T14:23:00
source: quickadd
status: unprocessed
tags: [backend, database, performance, mongodb, redis]
ai_tags_suggested: true
ai_confidence: 0.92
ai_timestamp: 2025-10-07T14:24:30
---

# Optimización de Queries de Database

## Descripción
Las queries a MongoDB están tardando >500ms. Investigar índices y caching con Redis.

---

## 🤖 IA Tagging Analysis

**Suggested Tags:** #backend #database #performance #mongodb #redis

**Confidence:** 0.92 (High)

**Reasoning:**
- `#backend`: La nota trata sobre optimización server-side
- `#database`: Foco principal en queries de DB
- `#performance`: Problema de latencia identificado
- `#mongodb`: Base de datos específica mencionada
- `#redis`: Solución propuesta de caching

**Alternative Tags Considered:**
- `#optimization` (redundante con #performance)
- `#caching` (cubierto por #redis en contexto)

**Action:** Tags aplicados automáticamente (high confidence)
```

**Nota con confidence media (sugerencia):**

```yaml
---
type: resource
created: 2025-10-07T15:00:00
url: https://example.com/article
tags: []
ai_tags_suggested: true
ai_confidence: 0.72
---

# Article: Modern Frontend Architecture

[contenido...]

---

## 🤖 IA Tagging Analysis

**Suggested Tags:** #frontend #architecture #react

**Confidence:** 0.72 (Medium - Please Review)

**Reasoning:**
- `#frontend`: Artículo claramente sobre desarrollo frontend
- `#architecture`: Enfoque en patrones arquitectónicos
- `#react`: Framework mencionado, pero no único foco

**Recommendation:** Revisar manualmente. El artículo podría ser más general (#javascript) o específico (#react-patterns).

**Action:** Tags añadidos como sugerencia, requiere confirmación manual.
```

---

#### Dependencias Críticas

**Para Detection:**

- ✅ n8n operativo con workflow configurado
- ✅ Obsidian REST API plugin activo
- ✅ Polling cada 1 min configurado

**Para IA Analysis:**

- ✅ Ollama con modelo cargado (Llama 3.3 70B)
- ✅ Prompt engineering refinado
- ✅ Context de tags existentes accesible

**Para Learning:**

- ⚠️ SQLite DB para feedback storage (futuro)
- ⚠️ Script de análisis de Git diffs (futuro)

---

#### Configuración Requerida

**n8n Workflow (Pseudo-code):**

```javascript
// Workflow: Auto-Tagging System

// Node 1: Schedule Trigger (every 1 min)
Trigger: Schedule (cron: */1 * * * *)

// Node 2: Get Recent Notes
Action: Obsidian REST API - Search
  Query: {
    folder: "00-Inbox",
    filter: "ai_tags_suggested = false",
    modified_within: "2 minutes"
  }

// Node 3: For Each Note
Loop: For each note in results

  // Node 3a: Read Note Content
  Action: Obsidian REST API - Read File
    Path: {{note.path}}

  // Node 3b: Get Existing Vault Tags
  Action: Obsidian REST API - Get All Tags

  // Node 3c: Call Ollama
  Action: HTTP Request
    URL: http://localhost:11434/api/generate
    Method: POST
    Body: {
      model: "llama3.3:70b",
      prompt: `Analyze this note and suggest 2-4 relevant tags.

Note Content:
---
{{note.content}}
---

Existing tags in vault (prefer these):
{{vault_tags}}

Instructions:
1. Suggest 2-4 tags that best categorize this note
2. Prioritize existing tags for consistency
3. Create new tag only if no existing tag fits
4. Provide confidence score (0-1)
5. Explain your reasoning

Response format:
{
  "tags": ["tag1", "tag2", "tag3"],
  "confidence": 0.85,
  "reasoning": "explanation here"
}
`,
      stream: false
    }

  // Node 3d: Parse AI Response
  Action: Code (JavaScript)
    const aiResponse = JSON.parse({{ollama_response}});
    const tags = aiResponse.tags;
    const confidence = aiResponse.confidence;
    const reasoning = aiResponse.reasoning;

    return { tags, confidence, reasoning };

  // Node 3e: Apply Tags (if confidence > threshold)
  Action: IF confidence > 0.85
    Then:
      // Update frontmatter
      Action: Obsidian REST API - Update File
        Path: {{note.path}}
        Update Frontmatter: {
          tags: {{tags}},
          ai_tags_suggested: true,
          ai_confidence: {{confidence}},
          ai_timestamp: {{$now}}
        }
        Append Content: `
---

## 🤖 IA Tagging Analysis

**Suggested Tags:** {{tags.map(t => '#' + t).join(' ')}}

**Confidence:** {{confidence}} (High)

**Reasoning:**
{{reasoning}}

**Action:** Tags applied automatically (high confidence)
`

      // Git commit
      Action: Execute Command
        Command: git -C /path/to/vault commit -m "Auto-tag: {{note.filename}}"

    Else:
      // Just add suggestion
      Action: Obsidian REST API - Update File
        Append Content: `
---

## 🤖 IA Tagging Analysis

**Suggested Tags:** {{tags.map(t => '#' + t).join(' ')}}

**Confidence:** {{confidence}} (Medium - Please Review)

**Reasoning:**
{{reasoning}}

**Action:** Tags added as suggestion, requires manual confirmation.
`

// Node 4: Log Results
Action: Write to Log
  Message: "Auto-tagged {{count}} notes"
```

**Ollama Prompt Refinement:**

```python
# Prompt template almacenado en Obsidian
# Path: 04-System/prompts/auto-tagging.md

You are a knowledge classification assistant. Your task is to analyze notes and suggest relevant tags.

## Context
The user maintains a second brain in Obsidian with the following tag categories:

**Technical:**
- Languages: #javascript #typescript #python #java #react #node
- Domains: #frontend #backend #devops #database #api
- Concepts: #architecture #ddd #patterns #testing #performance

**Type:**
- #idea #resource #learning #problem #solution

**Status:**
- #todo #doing #done #blocked #archived

## Instructions
1. Read the note content carefully
2. Identify main topic(s)
3. Suggest 2-4 tags (not more, not less)
4. Prefer existing tags for consistency
5. Create new tag only if:
   - No existing tag fits well
   - The concept is recurring (not one-off)
6. Calculate confidence based on:
   - Clarity of content (clear = higher confidence)
   - Match with existing taxonomy (exact match = higher)
   - Ambiguity (multiple valid interpretations = lower)

## Output Format
Return ONLY valid JSON:
{
  "tags": ["tag1", "tag2", "tag3"],
  "confidence": 0.85,
  "reasoning": "Brief explanation of why these tags fit"
}
```

**Tag Analytics Query (Dataview):**

````dataview
// Dashboard: 04-System/dashboards/tag-analytics.md

# 📊 Tag Analytics

## Most Used Tags (Last 30 Days)
```dataview
TABLE
  length(rows) as "Count",
  rows.file.link as "Notes"
FROM ""
WHERE file.mtime > date(today) - dur(30 days)
FLATTEN file.tags as tag
GROUP BY tag
SORT length(rows) DESC
LIMIT 20
````

## Tags by Category

```dataview
TABLE
  length(rows) as "Count"
FROM ""
WHERE file.tags
FLATTEN file.tags as tag
WHERE startswith(tag, "#tech/") OR startswith(tag, "#type/") OR startswith(tag, "#status/")
GROUP BY tag
SORT tag ASC
```

## Untagged Notes

```dataview
LIST
FROM ""
WHERE !file.tags OR length(file.tags) = 0
SORT file.mtime DESC
LIMIT 20
```

## AI Tagging Stats (Last 7 Days)

```dataview
TABLE
  ai_confidence as "Confidence",
  tags as "Tags",
  file.mtime as "Tagged"
FROM ""
WHERE ai_tags_suggested = true
AND file.mtime > date(today) - dur(7 days)
SORT file.mtime DESC
```

```

---

#### Fricción Eliminada

| Antes | Después | Mejora |
|-------|---------|--------|
| Decisión manual de tags | Sugerencias automáticas | **Carga cognitiva eliminada** |
| Tags inconsistentes | Taxonomía coherente | **Búsqueda mejorada** |
| Inbox sin clasificar | Clasificación continua | **Organización mantenida** |
| Búsqueda por texto exacto | Búsqueda por concepto (tags) | **Findability 3x mejor** |
| Sin visibilidad de estructura | Tag analytics revelan patrones | **Arquitectura emergente** |

---

#### Métricas de Éxito

**Semana 1:**
- [ ] 20+ notas auto-taggeadas
- [ ] Precision: 70%+ tags correctos (validado manualmente)
- [ ] Tiempo de tagging: <2 min por nota

**Mes 1:**
- [ ] 100+ notas taggeadas
- [ ] Precision: 85%+ tags correctos
- [ ] Taxonomía estable (tags consolidados)
- [ ] Búsqueda por tags usada regularmente

---

### C1. IA con Contexto Persistente

**Score: 7.65 | Priority: P0**

#### Pain Point
Explico misma arquitectura/metodología múltiples veces a Claude/Copilot → tiempo perdido re-contextualizando

#### Trigger
Inicio sesión de coding en IDE

#### Estado Actual
- Abro Claude Pro web
- Re-explico arquitectura del proyecto
- Re-explico decisiones pasadas (ADRs)
- Re-explico patrones que uso
- Pierdo 10-15 minutos contextualizando

#### Estado Ideal
- IA en IDE conoce mi codebase
- IA conoce decisiones pasadas (ADRs en Obsidian)
- IA conoce mis patrones y preferencias
- Contexto persiste entre sesiones
- Respuestas consistentes con mi estilo

---

#### Workflow Detallado

```

┌─────────────────────────────────────────────────────────┐
│ FASE 1: PROJECT CONTEXT LOADING (Automático) │
└─────────────────────────────────────────────────────────┘

1. Trigger:

   - Abro proyecto en VSCode/IntelliJ
   - Continue.dev detecta workspace

2. Context Detection:

   - Lee .continuerc.json en proyecto
   - Identifica context providers configurados
   - Carga paths a Obsidian vault

3. Initial Indexing:
   - Indexa codebase (AST parsing)
   - Lee ADRs desde Obsidian/02-Knowledge/architecture/
   - Lee patterns desde Obsidian/02-Knowledge/patterns/
   - Carga project README desde Obsidian/01-Projects/

┌─────────────────────────────────────────────────────────┐
│ FASE 2: INTELLIGENT ASSISTANCE (Durante Coding) │
└─────────────────────────────────────────────────────────┘

4. Code Completion:

   - User escribe código
   - Continue.dev ofrece sugerencias
   - Sugerencias basadas en:
     - Codebase patterns
     - ADRs relevantes
     - Snippets de Obsidian

5. Chat Interaction:

   - User: "Añade validación a este endpoint"
   - IA (con contexto):
     - Lee ADR-005 sobre validación centralizada
     - Propone solución consistente con arquitectura
     - Referencia patrón usado en otros endpoints

6. Architecture Validation:
   - User pide implementar feature
   - IA verifica:
     - ¿Contradice algún ADR?
     - ¿Sigue patrones establecidos?
     - ¿Hay decisiones relacionadas documentadas?
   - Alerta si hay inconsistencia

┌─────────────────────────────────────────────────────────┐
│ FASE 3: LEARNING & DOCUMENTATION │
└─────────────────────────────────────────────────────────┘

7. Decision Detection:

   - Durante conversación, IA detecta decisión arquitectónica
   - Sugiere: "¿Quieres documentar esto como ADR?"
   - User confirma

8. ADR Creation (via n8n):

   - Continue.dev trigger webhook de n8n
   - n8n crea nota ADR en Obsidian con template
   - ADR pre-llenado con contexto de conversación
   - User solo completa/ajusta

9. Pattern Extraction:
   - IA detecta patrón reutilizable en código
   - Sugiere: "¿Guardar como snippet en Obsidian?"
   - Crea nota en 02-Knowledge/code-snippets/

┌─────────────────────────────────────────────────────────┐
│ FASE 4: CONTEXT REFRESH (Continuo) │
└─────────────────────────────────────────────────────────┘

10. Obsidian Changes Detection:

    - File watcher detecta cambios en vault
    - Re-indexa ADRs/patterns modificados
    - Context actualizado en Continue.dev

11. Multi-Project Memory:
    - Continue.dev mantiene contexto por proyecto
    - Al cambiar proyecto, carga contexto apropiado
    - Aprende diferencias entre proyectos

````

---

#### Herramientas

| Componente | Herramienta | Razón |
|------------|-------------|-------|
| **IDE Assistant** | Continue.dev | Open-source, flexible, context providers |
| **Primary Model** | Ollama - Llama 3.3 70B | Razonamiento complejo, local |
| **Fast Model** | Ollama - DeepSeek Coder 16B | Autocompletado rápido |
| **Context Source** | Obsidian vault (markdown) | Single source of truth |
| **Orchestration** | n8n (opcional) | ADR creation automation |
| **Indexing** | Continue.dev native | Codebase + docs indexing |

---

#### Estructura de Datos

**Continue.dev Config:** `.continuerc.json` (en cada proyecto)

```json
{
  "models": [
    {
      "title": "Llama 3.3 70B (Local)",
      "provider": "ollama",
      "model": "llama3.3:70b",
      "apiBase": "http://localhost:11434",
      "contextLength": 128000,
      "role": "chat"
    },
    {
      "title": "DeepSeek Coder",
      "provider": "ollama",
      "model": "deepseek-coder:16b",
      "apiBase": "http://localhost:11434",
      "contextLength": 16000,
      "role": "autocomplete"
    }
  ],
  "contextProviders": [
    {
      "name": "obsidian-adrs",
      "description": "Architecture Decision Records",
      "type": "file",
      "config": {
        "path": "C:/Users/{user}/obsidian-vault/02-Knowledge/architecture/*.md",
        "recursive": true
      }
    },
    {
      "name": "obsidian-patterns",
      "description": "Code Patterns & Best Practices",
      "type": "file",
      "config": {
        "path": "C:/Users/{user}/obsidian-vault/02-Knowledge/patterns/*.md",
        "recursive": true
      }
    },
    {
      "name": "project-readme",
      "description": "Project Documentation",
      "type": "file",
      "config": {
        "path": "C:/Users/{user}/obsidian-vault/01-Projects/personal-finance-app/*.md"
      }
    }
  ],
  "customCommands": [
    {
      "name": "Explain with Context",
      "prompt": "Explain this code considering our ADRs and patterns documented in Obsidian. Reference specific decisions if relevant.",
      "description": "Explain code with architectural context"
    },
    {
      "name": "Suggest Refactor",
      "prompt": "Analyze this code and suggest refactoring based on patterns in our codebase and ADRs. Maintain consistency with existing architecture.",
      "description": "Context-aware refactoring suggestions"
    },
    {
      "name": "Create ADR",
      "prompt": "Based on our conversation, draft an ADR (Architecture Decision Record). Include: Context, Decision, Consequences (positive and negative).",
      "description": "Generate ADR from conversation"
    }
  ],
  "systemMessage": "You are a coding assistant with deep knowledge of this project's architecture, patterns, and decisions documented in Obsidian. Always reference relevant ADRs and patterns when making suggestions. Maintain consistency with established architecture."
}
````

**ADR Example en Obsidian:** `02-Knowledge/architecture/ADR-005-validation-strategy.md`

````yaml
---
type: architecture-decision
status: accepted
date: 2025-09-20
project: [[01-Projects/personal-finance-app/README]]
tags: [architecture, validation, backend]
---

# ADR-005: Centralized Validation Strategy

## Status
**Accepted** - Implemented in v0.3.0

## Context
La aplicación maneja validación de datos en múltiples capas:
- Input validation (API endpoints)
- Business rule validation (services)
- Database constraints

Problema: Validación duplicada, inconsistencias, difícil de mantener.

## Decision
Implementar **validación centralizada** usando Zod schemas:

1. **Single Source of Truth:** Schemas en `/src/schemas/`
2. **Validation Middleware:** Express middleware valida antes de controllers
3. **Type Safety:** Zod infiere TypeScript types
4. **Reusabilidad:** Mismo schema para validation + type inference

```typescript
// src/schemas/transaction.schema.ts
import { z } from 'zod';

export const transactionSchema = z.object({
  amount: z.number().positive(),
  category: z.enum(['income', 'expense']),
  description: z.string().min(1).max(200),
  date: z.string().datetime()
});

export type Transaction = z.infer<typeof transactionSchema>;
````

## Consequences

### Positive

- ✅ Validación consistente en toda la app
- ✅ Type safety automático (TypeScript)
- ✅ Fácil testing de schemas
- ✅ Documentación implícita (schemas auto-documentan estructura)

### Negative

- ⚠️ Dependencia adicional (Zod)
- ⚠️ Curva aprendizaje para nuevos devs
- ⚠️ Schemas complejos pueden volverse verbosos

## Alternatives Considered

### A) Joi

- Pro: Más maduro, amplia adopción
- Contra: No type inference nativo

### B) Class-validator

- Pro: Decorators, integración con NestJS
- Contra: Menos flexible, tied to classes

### C) Validación manual

- Pro: Zero dependencies
- Contra: Duplicación, error-prone, sin type safety

## References

- [Zod Documentation](https://zod.dev)
- [[02-Knowledge/patterns/validation-pattern|Validation Pattern]]
- Implementation: `src/middleware/validation.middleware.ts`

## Related Decisions

- [[ADR-003-typescript-strict-mode]]: Type safety es priority
- [[ADR-012-error-handling]]: Validation errors mapping

---

_Este ADR es leído por Continue.dev para context-aware suggestions._

````

**Pattern Example:** `02-Knowledge/patterns/validation-pattern.md`

```markdown
# Pattern: Request Validation Middleware

## When to Use
Todo endpoint que recibe data del cliente debe validar.

## Implementation

```typescript
// src/middleware/validation.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export const validate = (schema: ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      res.status(400).json({
        error: 'Validation failed',
        details: error.errors
      });
    }
  };
};

// Usage in route
app.post('/transactions',
  validate(transactionSchema),
  transactionController.create
);
````

## Benefits

- Validación declarativa
- Separation of concerns
- Reusable middleware

## Related

- [[ADR-005-validation-strategy]]
- [[code-snippets/zod-schemas]]

````

---

#### Dependencias Críticas

**Para Context Loading:**
- ✅ Obsidian vault con ADRs/patterns documentados
- ✅ Continue.dev instalado en VSCode/IntelliJ
- ✅ Ollama con modelos cargados
- ✅ `.continuerc.json` configurado en proyectos

**Para IA Interaction:**
- ✅ Modelos Ollama running (verificar con `ollama list`)
- ✅ Context providers paths correctos
- ✅ System message definido

**Para Learning (opcional):**
- ⚠️ n8n para automatizar ADR creation
- ⚠️ Webhooks configurados desde Continue.dev

---

#### Configuración Requerida

**1. Instalación Continue.dev:**
```bash
# VSCode
code --install-extension continue.continue

# O desde Extensions marketplace: "Continue"
````

**2. Configuración Inicial:**

```bash
# Abrir Command Palette (Ctrl+Shift+P)
# Buscar: "Continue: Open Config"
# Editar .continuerc.json con config de arriba
```

**3. Verificar Ollama:**

```bash
# Listar modelos disponibles
ollama list

# Descargar si no están
ollama pull llama3.3:70b
ollama pull deepseek-coder:16b

# Test
curl http://localhost:11434/api/generate -d '{
  "model": "llama3.3:70b",
  "prompt": "Hello"
}'
```

**4. Estructura Obsidian Requerida:**

```
obsidian-vault/
├── 01-Projects/
│   └── {project-name}/
│       └── README.md          # Project overview
├── 02-Knowledge/
│   ├── architecture/
│   │   └── ADR-XXX-*.md      # Architecture decisions
│   └── patterns/
│       └── *-pattern.md       # Code patterns
```

**5. Template ADR:**

```yaml
---
type: architecture-decision
status: proposed | accepted | deprecated | superseded
date: {{date:YYYY-MM-DD}}
project: [[link-to-project]]
tags: [architecture]
---

# ADR-XXX: [Title]

## Status
[Status]

## Context
[What is the issue we're seeing that motivates this decision?]

## Decision
[What is the change we're proposing/have agreed to?]

## Consequences
### Positive
-

### Negative
-

## Alternatives Considered
### A) [Alternative 1]
- Pro:
- Contra:

## References
-

## Related Decisions
-
```

---

#### Ejemplo de Interacción

**Escenario: Implementar nueva feature**

```
User (en Continue.dev chat):
"Necesito añadir autenticación con JWT a la API"

IA (con contexto de ADRs):
"He revisado las decisiones arquitectónicas del proyecto. Según ADR-008,
ya decidimos usar Supabase para autenticación.

¿Quieres:
A) Integrar Supabase Auth (consistente con ADR-008)
B) Implementar JWT custom (requeriría nuevo ADR para justificar cambio)

Si eliges A, puedo ayudarte con la integración siguiendo el patrón
documentado en 'patterns/supabase-auth-pattern.md'."

User:
"Opción A"

IA:
"Perfecto. Basándome en ADR-008 y el pattern establecido, aquí está
la implementación:

[código generado que sigue ADR y patterns existentes]

¿Quieres que añada tests siguiendo ADR-010 (Testing Strategy)?"
```

**Valor:** IA mantiene consistencia arquitectónica automáticamente.

---

#### Fricción Eliminada

| Antes (Claude Web)              | Después (Continue.dev + Context)     | Mejora                       |
| ------------------------------- | ------------------------------------ | ---------------------------- |
| 10-15 min re-explicando         | 0 min (context automático)           | **Tiempo ahorrado enorme**   |
| Sugerencias genéricas           | Sugerencias específicas del proyecto | **Relevancia 10x mejor**     |
| Sin memoria entre sesiones      | Contexto persistente                 | **Continuidad perfecta**     |
| Inconsistencias arquitectónicas | Validación automática vs ADRs        | **Arquitectura coherente**   |
| Documentación manual            | Sugerencias de ADRs automáticas      | **Documentación facilitada** |

---

#### Métricas de Éxito

**Semana 1:**

- [ ] Continue.dev configurado y funcional
- [ ] 3+ ADRs documentados como contexto
- [ ] IA responde usando ADRs (verificado en chat)

**Mes 1:**

- [ ] 10+ ADRs en vault
- [ ] 5+ patterns documentados
- [ ] IA sugiere ADRs cuando detecta decisiones
- [ ] 80%+ sugerencias consistentes con arquitectura

---

## ⚠️ TIER P1: Segunda Ola

Workflows de alta prioridad a implementar después del MVP estable.

---

### E1. Búsqueda Semántica en Second Brain

**Score: 6.70 | Priority: P1**

[Workflow completo detallado - omitido por brevedad, pero incluiría las mismas secciones]

---

### F1. Daily Note Automático con Contexto

**Score: 7.10 | Priority: P1**

[Workflow completo detallado]

---

### W0. Project Scaffolding System

**Score: 6.55 | Priority: P1**

[Workflow completo detallado - ver discovery anterior]

---

### B1. Email → Tasks Automático

**Score: 6.20 | Priority: P1**

[Workflow completo detallado]

---

### A2. Captura de Recursos Externos

**Score: 6.55 | Priority: P1**

[Workflow completo detallado]

---

## 🟡 TIER P2: Optimizaciones

- D2. GitHub ↔ Obsidian Sync (5.75)
- C2. Code Review Pre-PR (5.45)
- A3. Code Snippets Library (5.50)
- D3. Weekly Review Automático (4.50)

---

## 🔵 TIER P3: Nice to Have

- B2. Newsletter Processing (3.75)
- C3. Doc Generation (3.85)
- F2. Focus Mode (4.80)
- G1. Learning Log (3.80)
- G2. Tech Radar Personal (3.05)

---

## 🏗️ Implicaciones para Obsidian System

### Estructura Mínima Requerida (P0 Workflows)

```
obsidian-vault/
├── 00-Inbox/
│   ├── ideas/              # W: A1 (Captura Ideas)
│   ├── resources/          # W: A2 (Recursos) [P1]
│   ├── mobile/             # Futuro: Mobile captures
│   └── README.md
│
├── 01-Projects/            # W: D1 (Dashboard)
│   ├── _templates/
│   │   └── project.md
│   ├── {project-name}/
│   │   ├── README.md
│   │   ├── tasks.md
│   │   └── decisions/
│   └── README.md
│
├── 02-Knowledge/           # W: C1 (IA Context)
│   ├── architecture/       # ADRs
│   │   └── ADR-XXX-*.md
│   ├── patterns/           # Code patterns
│   │   └── *-pattern.md
│   ├── code-snippets/      # Reusable code [P2]
│   └── README.md
│
├── 03-Daily/               # W: F1 (Daily Notes) [P1]
│   ├── 2025-10-07.md
│   └── templates/
│       └── daily-note.md
│
├── 04-System/
│   ├── dashboards/         # W: D1
│   │   ├── main.md
│   │   └── tag-analytics.md
│   ├── templates/          # Templates globales
│   │   ├── idea.md
│   │   ├── project.md
│   │   ├── adr.md
│   │   └── resource.md
│   ├── prompts/            # W: E2 (Auto-Tag)
│   │   └── auto-tagging.md
│   └── automation-logs/    # n8n execution logs
│
└── .obsidian/
    ├── plugins/
    │   ├── dataview/
    │   ├── templater/
    │   ├── quickadd/
    │   ├── obsidian-git/
    │   └── obsidian-local-rest-api/
    └── snippets/
        └── dashboard.css
```

### Plugins Críticos por Workflow

| Plugin                | Workflows      | Obligatorio      | Alternativa               |
| --------------------- | -------------- | ---------------- | ------------------------- |
| **Quickadd**          | A1             | ✅ Sí            | Templater (menos UX)      |
| **Templater**         | A1, D1, F1     | ✅ Sí            | Core templates (limitado) |
| **Dataview**          | D1, E2         | ✅ Sí            | N/A                       |
| **Obsidian Git**      | A1, D1, E2, C1 | ✅ Sí            | Obsidian Sync (€8/mes)    |
| **Local REST API**    | A1, E2, F1     | ✅ Sí (para n8n) | N/A                       |
| **Tasks**             | D1             | ⚠️ Recomendado   | Dataview queries          |
| **Smart Connections** | C1, E1         | ⚠️ Futuro (P1)   | Custom search             |

### Frontmatter Schemas Completos

**Idea Note:**

```yaml
---
type: idea
created: 2025-10-07T14:23:00
source: quickadd | mobile | voice
status: unprocessed | processing | processed | archived
tags: []
ai_tags_suggested: false
ai_confidence: 0.00
ai_timestamp: null
---
```

**Project Note:**

```yaml
---
type: project
status: active | paused | completed | archived
stack: [tag1, tag2]
start_date: 2025-MM-DD
due_date: 2025-MM-DD
priority: high | medium | low
repo: URL
---
```

**ADR Note:**

```yaml
---
type: architecture-decision
status: proposed | accepted | deprecated | superseded
date: 2025-MM-DD
project: [[link]]
tags: [architecture]
superseded_by: [[ADR-XXX]] (if deprecated)
---
```

**Resource Note:**

```yaml
---
type: resource
url: https://...
captured_date: 2025-MM-DD
source: telegram | extension | mobile
tags: []
summary_generated: false
reviewed: false
---
```

---

## 🚀 Implementation Roadmap

### Phase 0: Obsidian Foundation (Week 1)

**Goal:** MVP structure + basic workflows functional

**Tasks:**

1. ✅ Create vault folder structure
2. ✅ Install critical plugins (Quickadd, Templater, Dataview, Git)
3. ✅ Configure Git sync (auto-commit every 10 min)
4. ✅ Create templates (idea, project, ADR)
5. ✅ Configure Quickadd with hotkey (Ctrl+Shift+I)
6. ✅ Create basic dashboard (main.md)
7. ✅ Create 2-3 example projects with tasks
8. ✅ Test capture workflow end-to-end

**Exit Criteria:**

- [ ] Can capture idea in <10 seconds
- [ ] Dashboard shows projects/tasks correctly
- [ ] Git commits happen automatically
- [ ] All templates working

**Time Estimate:** 8-12 hours

---

### Phase 1: Auto-Tagging + IA Context (Week 2)

**Goal:** Intelligent classification + Continue.dev with context

**Tasks:**

1. ✅ Install Obsidian Local REST API plugin
2. ✅ Setup n8n workflow for auto-tagging
3. ✅ Configure Ollama with Llama 3.3 70B
4. ✅ Create auto-tagging prompt
5. ✅ Test auto-tagging on 10+ notes
6. ✅ Install Continue.dev in VSCode
7. ✅ Configure Continue.dev context providers
8. ✅ Create 3-5 ADRs from current projects
9. ✅ Test IA assistance with architectural context

**Exit Criteria:**

- [ ] Auto-tagging working with 80%+ accuracy
- [ ] Continue.dev responds using ADRs
- [ ] Context loading < 5 seconds
- [ ] Tags appearing automatically in new notes

**Time Estimate:** 10-15 hours

---

### Phase 2: P1 Workflows (Weeks 3-4)

**Goal:** Expand to high-value automations

**Priority Order:**

1. F1 - Daily Note Auto (improves habit formation)
2. W0 - Project Scaffolding (dev productivity boost)
3. A2 - Captura Recursos (extends capture system)
4. E1 - Búsqueda Semántica (unlocks vault potential)
5. B1 - Email → Tasks (automation heavy, do last)

**Exit Criteria:**

- [ ] 3+ P1 workflows operational
- [ ] Using system daily without friction
- [ ] Metrics showing improvement vs baseline

**Time Estimate:** 15-20 hours (distributed over 2 weeks)

---

### Phase 3: Refinement & P2 (Month 2+)

**Goal:** Optimize based on real usage

**Approach:**

- Track which workflows get used most
- Iterate on friction points
- Add P2 workflows only if needed
- Focus on sustainability

---

## 📊 Success Metrics

### Week 1 (Post Phase 0)

- [ ] 10+ ideas captured
- [ ] 3+ projects in dashboard
- [ ] Average capture time < 10 seconds
- [ ] Zero data loss (Git working)

### Week 2 (Post Phase 1)

- [ ] 30+ notes auto-tagged
- [ ] Continue.dev used 5+ times
- [ ] IA references ADRs in responses
- [ ] Tag precision > 80%

### Month 1 (Post Phase 2)

- [ ] 100+ notes in vault
- [ ] 2+ P1 workflows in daily use
- [ ] Time saved: 2-3 hours/week (estimated)
- [ ] Inbox processing < 15 min/day

### Month 3 (Mature System)

- [ ] 300+ notes interconnected
- [ ] All P0 + 3 P1 workflows stable
- [ ] System feels "invisible" (zero friction)
- [ ] Considering P2 expansions

---

## 🎯 Mobile Considerations

### Design Decisions (Now)

**1. Sync Strategy:** Git (not Obsidian Sync)

- **Decision:** Use Git sync exclusively
- **Rationale:** Already configured, no additional cost
- **Mobile UX:** Requires manual pull/push or Git client
- **Trade-off:** Slightly more friction vs €8/mes saved

**2. Mobile Capture Method:** Obsidian Mobile + Git

- **Primary:** Obsidian mobile app with Git sync
- **Backup:** Telegram bot → n8n → Obsidian (if mobile friction too high)
- **Folder:** All mobile captures go to `00-Inbox/mobile/`

**3. Read-Heavy vs Write-Heavy:**

- **Read:** Obsidian mobile is good for reviewing notes/dashboard
- **Write:** Quick capture needs testing (may need Telegram fallback)

### Implementation (Month 2-3)

**Test Protocol:**

1. Use Obsidian mobile for 1 week
2. Track friction points (time to capture, sync delays)
3. Decide if Telegram bot needed
4. Iterate based on real usage

**Mobile Workflows:**

- A1 (Captura Ideas): Critical - must be fast
- D1 (Dashboard): Nice to have - review only
- E2 (Auto-Tag): Works automatically (server-side)
- C1 (IA Context): Not applicable (no coding on mobile)

---

## ⚙️ Technical Dependencies Summary

### Required Infrastructure

| Component        | Purpose          | Priority | Status       |
| ---------------- | ---------------- | -------- | ------------ |
| **Obsidian**     | Core application | P0       | ✅ Ready     |
| **Git + GitHub** | Backup + sync    | P0       | ✅ Ready     |
| **Ollama**       | Local IA         | P0       | ✅ Installed |
| **n8n (Docker)** | Automation       | P0       | ⚠️ To setup  |
| **VSCode**       | IDE              | P0       | ✅ Ready     |

### Model Requirements

| Model                  | Size   | Use Case                        | When to Load      |
| ---------------------- | ------ | ------------------------------- | ----------------- |
| **Llama 3.3 70B (Q4)** | ~40GB  | Complex reasoning, architecture | Week 1            |
| **DeepSeek Coder 16B** | ~10GB  | Fast autocomplete               | Week 2 (optional) |
| **Embedding Model**    | ~500MB | Semantic search                 | Month 2 (P1)      |

### Network/API Requirements

- **Ollama API:** localhost:11434 (local, no auth)
- **Obsidian REST API:** localhost:27124 (configurable)
- **n8n:** localhost:5678 (web UI)
- **Git Remote:** GitHub (HTTPS or SSH)

---

## 🚨 Risk Mitigation

### Risk 1: Ollama Too Slow

**Likelihood:** Medium  
**Impact:** High (blocks C1, E2)

**Mitigation:**

- Test Llama 3.3 70B speed in Week 1
- If too slow (>5 sec/response): downgrade to 30B model
- Fallback: Use Claude API for critical workflows

### Risk 2: n8n Complexity Overhead

**Likelihood:** Low  
**Impact:** Medium (delays automation)

**Mitigation:**

- Start with simplest workflow (auto-tag only)
- If too complex: use Python scripts instead
- Fallback: Manual processing acceptable initially

### Risk 3: Mobile Friction Too High

**Likelihood:** Medium  
**Impact:** Medium (limits A1 usage)

**Mitigation:**

- Test mobile in Week 1
- Quick pivot to Telegram bot if needed
- Fallback: Accept mobile is read-only, capture on PC

### Risk 4: Analysis Paralysis Post-MVP

**Likelihood:** High  
**Impact:** High (project stalls)

**Mitigation:**

- Force decision point after Phase 1: implement P1 or stop
- Time-box P1 implementation: max 2 weeks
- Track usage metrics to validate value

---

## 📝 Documentation Deliverables

### Created in This Session

- ✅ `workflows.md` (this document)

### To Create Next Session

- ⚪ `obsidian-structure-spec.md` - Detailed vault design
- ⚪ `decisiones.md` - Start with ADR-001 (Sync Strategy)
- ⚪ `implementacion.md` - Phase 0 step-by-step guide

### Future Documents

- ⚪ `ideas.md` - Ad-hoc idea capture
- ⚪ `metrics.md` - Success tracking
- ⚪ `troubleshooting.md` - Common issues & fixes

---

## 🎓 Learning Resources

### For Obsidian

- [Dataview Plugin Docs](https://blacksmithgu.github.io/obsidian-dataview/)
- [Templater Examples](https://silentvoid13.github.io/Templater/)
- [Quickadd Tutorial](https://www.youtube.com/watch?v=gYK3VDQsZJo)

### For IA Integration

- [Continue.dev Documentation](https://continue.dev/docs)
- [Ollama Models Library](https://ollama.com/library)
- [ADR Template Examples](https://github.com/joelparkerhenderson/architecture-decision-record)

### For Automation

- [n8n Workflow Templates](https://n8n.io/workflows)
- [Obsidian API Documentation](https://docs.obsidian.md/Plugins/Releasing/Plugin+guidelines)

---

## 🔄 Workflow Update Protocol

**When to update this document:**

- New workflow discovered during usage
- Priority changes based on real pain points
- Implementation reveals missing dependencies
- Workflow proves ineffective (deprecate)

**How to update:**

- Add new workflow with full specification
- Re-run prioritization matrix
- Update roadmap if priorities shift
- Document in `decisiones.md` why changed

---

## ✅ Next Session Action Items

### For User

1. Review workflows P0 thoroughly
2. Validate priorities match real pain points
3. Prepare to start Phase 0 implementation
4. Decide on any customizations to structure

### For Claude (Next Session)

1. Create `obsidian-structure-spec.md` with:
   - Complete folder structure
   - All templates
   - Plugin configurations
   - Dataview queries
2. Create initial `decisiones.md` with:
   - ADR-001: Git Sync Strategy
   - ADR-002: Auto-Tagging Approach
   - ADR-003: Mobile Capture Method
3. Prepare Phase 0 implementation guide

---

**Document Version:** 1.0  
**Last Updated:** 2025-10-07  
**Status:** Complete - Ready for Review  
**Next Review:** After Phase 0 completion
