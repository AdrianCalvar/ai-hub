# Discovery: IA Hub Personal Integral

> **Versión:** 1.0  
> **Fecha:** 07 Octubre 2025  
> **Estado:** Initial Discovery

---

## 🎯 Executive Summary

Propongo una arquitectura híbrida de **3 capas + 1 núcleo** que maximiza tu inversión actual (Claude Pro + hardware potente) sin añadir costes recurrentes. El sistema se centra en **Obsidian como hub central** extendido con plugins gratuitos, complementado por **Ollama (IA local)** para tareas rutinarias que no requieren Claude Pro, y **n8n (self-hosted)** como motor de automatización que conecta todo el ecosistema.

**Features más impactantes:** 
1. AI Assistant dual-tier (Claude para razonamiento complejo, Ollama local para código/repetitivas)
2. Obsidian Dataview + Tasks para gestión de proyectos sin salir del second brain
3. n8n workflows para captura automática (GitHub issues → Obsidian, emails → tareas)
4. Templater + Quickadd para creación instantánea de notas estructuradas
5. Git sync automático como backup
6. Continue.dev como copiloto de código integrado en VSCode/JetBrains
7. Arquitectura lista para expansión (Home Assistant via n8n, Nextcloud como NAS cuando escales)

**Decisión arquitectónica clave:** Evitar la trampa del "todo-en-uno SaaS". Usar herramientas UNIX-philosophy (hacer una cosa bien) orquestadas mediante scripts/n8n. Esto te da control total, cero vendor lock-in y fricción cero porque cada herramienta vive en su contexto natural (Obsidian para pensar, VSCode para codificar, terminal para automatizar).

---

## 📦 Inventario de Features Candidatas

### 🤖 Módulo: AI Core

| Feature | Descripción | Utilidad Concreta | Coste | Razonamiento |
|---------|-------------|-------------------|-------|--------------|
| **Ollama + Llama 3.3 70B** | LLM local en tu RTX 5070 | Consultas ilimitadas para debugging, refactoring, documentación | 🟢 Gratuito | Con 32GB RAM puedes correr modelos 70B quantizados. Reserva Claude Pro para arquitectura/decisiones complejas |
| **Continue.dev** | Copiloto en IDE (VSCode/IntelliJ) | Autocompletado, explicación de código, tests generados | 🟢 Gratuito | Funciona con Ollama local o Claude API. Zero fricción: atajo de teclado en tu editor habitual |
| **Obsidian Smart Connections** | RAG sobre tus notas | Claude/Ollama responde usando tu knowledge base | 🟢 Gratuito | Convierte tu second brain en contexto para la IA. No más copy-paste de notas |
| **Jan.ai (alternativa)** | UI amigable para modelos locales | Interfaz tipo ChatGPT para Ollama | 🟢 Gratuito | Opcional si prefieres GUI vs CLI. Menos flexible que Ollama puro |

### 📝 Módulo: Notes & Knowledge Management

| Feature | Descripción | Utilidad Concreta | Coste | Razonamiento |
|---------|-------------|-------------------|-------|--------------|
| **Obsidian Dataview** | SQL-like queries sobre notas | Dashboards dinámicos, listas filtradas por tags/metadata | 🟢 Gratuito | Ya usas Obsidian. Este plugin lo convierte en base de datos viva |
| **Templater** | Templates con scripting JS | Creación de notas estructuradas con 1 atajo | 🟢 Gratuito | Frontend de tu sistema. Ejemplo: `Ctrl+T` → nota de proyecto con estructura predefinida |
| **Quickadd** | Macros y capture rápido | Inbox processing en segundos | 🟢 Gratuito | Backend de captura. Ejemplo: URL → nota de recurso con metadata extraída |
| **Excalidraw** | Diagramas dentro de Obsidian | Arquitecturas, flowcharts sin cambiar de app | 🟢 Gratuito | Mantiene contexto visual junto al texto. Versionado con Git |
| **Kanban plugin** | Boards estilo Trello | Visualización de tareas sin salir de Obsidian | 🟢 Gratuito | Alternativa a Dataview tables para workflows visuales |
| **Git + Obsidian Git plugin** | Control de versiones + sync | Backup automático, historial completo, multi-dispositivo | 🟢 Gratuito | Zero friction: commit/push automático cada X minutos |

### ✅ Módulo: Task & Project Management

| Feature | Descripción | Utilidad Concreta | Coste | Razonamiento |
|---------|-------------|-------------------|-------|--------------|
| **Obsidian Tasks plugin** | GTD nativo en Obsidian | Tareas con due dates, recurrencias, prioridades | 🟢 Gratuito | Se integra con Dataview. Sintaxis natural `- [ ] tarea 📅 2025-10-15` |
| **Full Calendar plugin** | Vista de calendario | Time-blocking visual de tareas/eventos | 🟢 Gratuito | Complementa Tasks. Ver semana de un vistazo |
| **Projects plugin** | Multi-vista de proyectos | Table/Board/Calendar/Gallery del mismo dataset | 🟢 Gratuito | Más flexible que Kanban. Cambia vista según necesites |
| **Todoist integration** | Sync bidireccional (si prefieres app móvil dedicada) | Captura en móvil → aparece en Obsidian | 🟡 Freemium (free suficiente) | Solo si necesitas app móvil potente. Tasks plugin + Obsidian mobile ya cubren 80% |

### 🔗 Módulo: Integration & Automation

| Feature | Descripción | Utilidad Concreta | Coste | Razonamiento |
|---------|-------------|-------------------|-------|--------------|
| **n8n (self-hosted)** | Zapier open-source | Workflows: GitHub → Obsidian, Email → Tasks, RSS → Notes | 🟢 Gratuito | Corre en Docker local. Conecta TODO sin pagar APIs |
| **Obsidian Local REST API** | API HTTP para Obsidian | Scripts externos pueden crear/modificar notas | 🟢 Gratuito | Pegamento para automatización custom. Ejemplo: CLI que crea dailynotes |
| **Shortcuts.app (macOS) / AutoHotkey (Win)** | Macros a nivel OS | Atajos globales para workflows complejos | 🟢 Gratuito | Ejemplo: `Ctrl+Shift+N` → captura clipboard en Obsidian inbox |
| **GitHub Actions (free tier)** | CI/CD para tu vault | Tests de links rotos, deploy de notas públicas | 🟢 Gratuito | 2000 mins/mes gratis. Valida integridad de tu knowledge base |

### 💻 Módulo: Development Assistant

| Feature | Descripción | Utilidad Concreta | Coste | Razonamiento |
|---------|-------------|-------------------|-------|--------------|
| **Aider (CLI)** | Pair programming con IA | Edita múltiples archivos, entiende codebase completo | 🟢 Gratuito + Claude API | Usa tu Claude Pro API. Ideal para refactors grandes |
| **Cursor (IDE alternativo)** | VSCode fork con IA nativa | Chat con codebase, edit multi-archivo | 🟡 Freemium (500 usos/mes gratis) | Alternativa a Continue.dev. Más integrado pero menos flexible |
| **Obsidian Code Snippets** | Biblioteca de código en notas | Search rápido de soluciones pasadas | 🟢 Gratuito | Tu Obsidian como StackOverflow personal. Dataview para buscar |
| **Logseq (alternativa a Obsidian)** | Outliner-first note-taking | Mejor para daily journaling estilo bullet journal | 🟢 Gratuito | Considera si prefieres outliner vs documento. Ambos usan markdown |

### 🚀 Módulo: Futuro (Arquitectura preparada, no implementar ahora)

| Feature | Descripción | Por qué considerarla ahora | Coste futuro | Razonamiento |
|---------|-------------|---------------------------|--------------|--------------|
| **Home Assistant** | Hub domótica open-source | n8n ya puede integrarse → expansión sin rediseño | 🟢 Gratuito | Decisión: usa MQTT como protocolo. n8n + Obsidian ya lo soportan |
| **Nextcloud** | NAS + suite office | Sync de archivos, calendario, contactos | 🟢 Gratuito | Alternativa a Synology. Corre en tu hardware. Integra con Obsidian vía WebDAV |
| **Portainer** | Gestión de contenedores Docker | UI para manejar tu stack self-hosted | 🟢 Gratuito | Ya necesitarás Docker para n8n. Portainer hace scaling fácil |
| **Coolify (alternativa)** | Vercel/Netlify self-hosted | Deploy de apps React/Next.js en tu server | 🟢 Gratuito | Para cuando quieras hostear tus proyectos. Integra con Git |

---

## 🔄 Workflows Habilitados

### Workflow 1: Desarrollo Asistido por IA (Dual-Tier)

**Narrativa:** Estás desarrollando una feature compleja en React. Empiezas conversando con **Claude Pro** en el navegador para diseñar la arquitectura (componentes, estado, APIs). Claude genera un plan detallado que pegas en una nota de Obsidian via Quickadd (`Ctrl+Shift+C` → "Architecture Decision"). 

Luego abres VSCode con **Continue.dev** conectado a **Ollama local (Llama 3.3 70B)**. Escribes comentarios describiendo la lógica → Continue autocompileta el código. Para refactors, usas **Aider** en terminal: `aider --model claude-sonnet-4-5` (usa tu Claude API) y le pides "extraer esta lógica a custom hooks". Aider edita múltiples archivos manteniendo consistencia.

Cuando encuentras un bug complejo, abres **Smart Connections** en Obsidian, buscas "similar bugs en proyectos pasados" → la IA te trae notas relevantes con soluciones. Copias el contexto y se lo pasas a Claude/Aider.

**Valor vs herramientas separadas:** La IA entiende tu second brain. No repites contexto. Claude Pro para diseño → Ollama para ejecución → Obsidian como memoria persistente.

---

### Workflow 2: Captura y Procesamiento de Información

**Narrativa:** Lees un artículo técnico sobre arquitectura hexagonal. En lugar de bookmarkearlo y olvidarlo, usas **Quickadd** con un atajo (`Ctrl+Shift+S`). Automáticamente:
1. Extrae metadata (título, autor, fecha)
2. Crea nota en `Resources/Architecture/` con template
3. Dispara n8n webhook que usa Ollama local para generar summary de 3 bullets
4. Añade tags inteligentes basados en contenido

Más tarde, revisando GitHub issues, marcas uno como importante. **n8n** detecta el label change → crea tarea en Obsidian con link al issue + contexto del proyecto. La tarea aparece en tu dashboard de Dataview automáticamente.

En tu daily note, escribes `- [ ] Investigar Redis para cache 📅 2025-10-15 #backend`. **Tasks plugin** la indexa. **Full Calendar** te la muestra en la vista semanal. n8n (opcional) puede crear reminder en tu calendario real (Google Calendar) vía API.

**Valor vs herramientas separadas:** Captura en contexto → procesamiento automático → aparición en múltiples vistas. Cero friction: un click o un atajo.

---

### Workflow 3: Gestión de Proyectos Sin Salir de Obsidian

**Narrativa:** Tienes 3 proyectos activos: app de finanzas personales, blog técnico, refactor de sistema legacy. Cada uno es una nota en `Projects/` con frontmatter YAML:

```yaml
---
project: Personal Finance App
status: active
stack: [React, TypeScript, Supabase]
due: 2025-12-01
---
```

Tu dashboard usa **Dataview** para generar tabla dinámica:

```dataview
TABLE status, stack, due
FROM "Projects"
WHERE status = "active"
SORT due ASC
```

Cada proyecto tiene sub-notas enlazadas (features, bugs, decisiones). Usas **Kanban plugin** para visualizar tareas por status. Arrastras una card de "In Progress" a "Done" → el markdown se actualiza → Dataview refleja el cambio.

Para planning semanal, abres **Projects plugin** en vista Calendar. Arrastras tareas a días específicos. Tu second brain es ahora tu Trello + Notion + Jira.

**Valor vs herramientas separadas:** Todo en texto plano. Git versiona cambios. Búsqueda global encuentra cualquier cosa. No pagas Notion/Jira. Dataview = SQL sobre tus pensamientos.

---

### Workflow 4: AI-Powered Code Review y Documentación

**Narrativa:** Terminas un PR grande. Antes de subirlo, usas script custom que:
1. Exporta el diff via Git
2. Llama a **Ollama local** (Llama 3.3 70B) via API: "Resume cambios en 5 bullets + identifica potential issues"
3. Crea nota en `Code Reviews/PR-{number}.md` con el análisis
4. Genera checklist de testing basada en los cambios

Subes el PR. **n8n** detecta el webhook de GitHub → comenta en el PR con link a tu nota de Obsidian (si tienes Obsidian Publish, o simplemente te notifica a ti).

Después del merge, otro workflow de n8n:
1. Extrae commits del PR
2. Actualiza nota del proyecto con "Recent Changes"
3. Si commits mencionan issues, las marca como completadas en Tasks

**Valor vs herramientas separadas:** IA local = reviews ilimitados. Historial en Obsidian = aprendes de reviews pasados. n8n = pegamento sin código.

---

### Workflow 5: Inbox Zero con AI Triage

**Narrativa:** Tu email recibe newsletters técnicas, notificaciones de GitHub, invitaciones a meetings. **n8n** monitorea tu inbox con reglas:

- **Newsletter técnica** → Llama a Ollama para extraer 3 insights clave → Crea nota en `Inbox/Articles/` con metadata
- **GitHub mention** → Crea tarea en Obsidian con prioridad alta + link directo
- **Meeting invite** → Extrae agenda → Crea nota de prep en `Meetings/` con template + añade al calendario

Cada mañana, abres `Inbox/` en Obsidian. Ves notas procesadas listas para revisar (no emails crudos). Arrastras las importantes a carpetas de proyectos. Las triviales las borras en bulk.

**Valor vs herramientas separadas:** IA clasifica y extrae valor antes de que veas nada. Obsidian = vista unificada de TODO lo que requiere atención. n8n = mayordomo digital.

---

## 🗺️ Landscape de Tecnologías

### Categoría: Modelos de IA Local

**Contexto:** Con RTX 5070 Super (12GB VRAM) y 32GB RAM, puedes correr modelos quantizados 70B o modelos full 30B.

| Modelo | Tamaño | Uso ideal | Rendimiento esperado | Pros | Contras |
|--------|--------|-----------|---------------------|------|---------|
| **Llama 3.3 70B (Q4)** | ~40GB | Razonamiento complejo, código | ~8 tok/s | Calidad cercana a GPT-4 | Lento para chat rápido |
| **Qwen 2.5 Coder 32B** | ~20GB | Generación de código | ~15 tok/s | Especializado en código, soporta 128k context | Menos versátil para texto general |
| **DeepSeek Coder V2 16B** | ~10GB | Autocomplete, debugging | ~25 tok/s | Rápido, excelente code completion | No rivaliza con 70B en arquitectura |
| **Mixtral 8x7B (Q5)** | ~30GB | Balanceado code+text | ~12 tok/s | MoE = eficiente, multilenguaje | Inconsistente en español |

**Recomendación:** Instala **Llama 3.3 70B Q4** como default + **DeepSeek Coder 16B** para autocomplete en Continue.dev. Usa DeepSeek en día a día (rápido), Llama 3.3 cuando necesites razonamiento complejo. Reserva Claude Pro para decisiones críticas.

---

### Categoría: IDE + AI Copilot

**Opción A: Continue.dev (Open Source)**

**Pros:**
- Funciona en VSCode, JetBrains, Neovim
- Soporta Ollama local Y Claude API
- Configurable vía JSON (añade context rules custom)
- Gratuito ilimitado si usas Ollama

**Contras:**
- Setup inicial requiere configurar models
- UI menos pulida que Cursor

**Opción B: Cursor (Freemium)**

**Pros:**
- Zero config: funciona out-of-the-box
- Composer mode = edita múltiples archivos conversacionalmente
- Integración nativa con Claude
- UI elegante

**Contras:**
- 500 requests/mes en free tier (luego 20$/mes)
- Fork de VSCode = puede quedarse atrás en features
- Lock-in: difícil migrar a otro IDE

**Recomendación:** **Continue.dev** para control total y costo cero. Si pruebas Cursor en free tier y te enamoras, considera pagar (pero entonces superas presupuesto). Continue + Ollama local = solución definitiva a largo plazo.

---

### Categoría: Gestión de Tareas

| Herramienta | Pros | Contras | Coste | Mejor para |
|-------------|------|---------|-------|-----------|
| **Obsidian Tasks** | Nativo en second brain, sintaxis markdown | Sin app móvil nativa | 🟢 Gratis | Quien ya vive en Obsidian |
| **Todoist** | App móvil excelente, recurrencias potentes | Sync premium = 4€/mes | 🟡 Freemium | Quien necesita captura móvil constante |
| **Logseq** | Outliner = ideal para journals diarios | Curva aprendizaje si vienes de Obsidian | 🟢 Gratis | Preferencia por bullets vs documentos |
| **Notion** | Databases visuales, colaboración | Sincronización lenta, no markdown puro | 🟡 Freemium | Teams (innecesario para uso personal) |

**Recomendación:** **Obsidian Tasks** + **Projects plugin** + **Dataview**. Para móvil, usa Obsidian app + Tasks syntax (es suficiente). Si tu flujo móvil es crítico y Obsidian mobile no convence, añade Todoist free tier (~50 proyectos suficiente) con sync vía n8n webhook.

---

### Categoría: Automatización y Workflows

**Opción A: n8n (Self-Hosted)**

**Pros:**
- Open-source, 400+ integraciones nativas
- UI visual para workflows complejos
- Webhooks, scheduled triggers, polling
- Gratis ilimitado en Docker local
- Puede llamar a Ollama local via HTTP

**Contras:**
- Requiere servidor siempre encendido (tu PC o mini-PC)
- Setup inicial: Docker, configuración

**Opción B: Zapier/Make (Cloud)**

**Pros:**
- Zero setup, funciona inmediatamente
- Más integraciones que n8n

**Contras:**
- Free tier muy limitado (5 zaps en Zapier, 1000 ops/mes en Make)
- Suscripción ~20€/mes para uso real
- No puede acceder a Ollama local

**Opción C: Scripts custom (Python/TypeScript)**

**Pros:**
- Control total, cero dependencias
- Gratis

**Contras:**
- Mantenimiento manual
- No hay UI visual
- Cada integración requiere código

**Recomendación:** **n8n self-hosted**. Lo corres en Docker en tu PC (si está encendida 24/7) o en una Raspberry Pi (~35€ one-time). La inversión de tiempo en setup (2-3 horas) vale la pena: workflows ilimitados, acceso a Ollama local, integraciones nativas con GitHub/Gmail/RSS/etc. Si no quieres servidor dedicado, empieza con scripts custom para workflows críticos.

---

### Categoría: Knowledge Management

**Obsidian vs Logseq vs Notion**

| Criterio | Obsidian | Logseq | Notion |
|----------|----------|--------|--------|
| **Filosofía** | Note-first (documentos) | Outliner-first (bullets) | Database-first (tables) |
| **Formato** | Markdown puro | Markdown + org-mode | Propietario (export limitado) |
| **Plugins** | 1000+ community | ~200 community | No extensible |
| **Graph view** | Excelente | Bueno | Básico |
| **Mobile** | App nativa buena | App nativa buena | App nativa excelente |
| **Sync** | Obsidian Sync (8€/mes) o Git gratis | Sync gratis | Gratis |
| **Local-first** | ✅ Sí | ✅ Sí | ❌ No |
| **Colaboración** | Limitada (via Sync o Git) | Limitada | Excelente |

**Recomendación:** Ya usas **Obsidian** → sigue con él. Es el mejor para second brain técnico (links bidireccionales + graph + markdown + plugins). Logseq solo si realmente prefieres outliner. Notion solo si necesitas colaborar en tiempo real (pero para uso personal, Obsidian superior).

---

## 🏗️ Arquitectura Conceptual

```
┌─────────────────────────────────────────────────────────────┐
│                     CAPA DE INTERFAZ                         │
│  (Donde interactúas - Zero Friction Interfaces)              │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│   Obsidian   │   VSCode/    │   Terminal   │   Web Browser   │
│   (Notes +   │   IntelliJ   │   (Scripts)  │   (Claude Pro)  │
│    Tasks)    │   (Code)     │              │                 │
└──────┬───────┴──────┬───────┴──────┬───────┴──────┬──────────┘
       │              │              │              │
       │              │              │              │
┌──────▼──────────────▼──────────────▼──────────────▼──────────┐
│                   CAPA DE APLICACIÓN                          │
│              (Herramientas Especializadas)                    │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│  Continue.dev│  Aider CLI   │  Obsidian    │   Templater/    │
│  (Copilot)   │ (AI Edits)   │  Plugins:    │   Quickadd      │
│              │              │  - Dataview  │   (Macros)      │
│              │              │  - Tasks     │                 │
│              │              │  - Smart Conn│                 │
└──────┬───────┴──────┬───────┴──────┬───────┴──────┬──────────┘
       │              │              │              │
       │         ┌────▼──────────────▼─────┐        │
       │         │   NÚCLEO DE IA          │        │
       │         │  (Decision Router)       │        │
       │         ├─────────┬────────────────┤        │
       │         │ Claude  │ Ollama Local   │        │
       │         │  Pro    │ (Llama 3.3 70B)│        │
       │         │ (Cloud) │ + DeepSeek 16B │        │
       │         └─────────┴────────────────┘        │
       │                      │                      │
┌──────▼──────────────────────▼──────────────────────▼─────────┐
│                   CAPA DE INTEGRACIÓN                         │
│            (Pegamento entre Componentes)                      │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│     n8n      │  Obsidian    │  Git Sync    │   Custom        │
│ (Workflows)  │  Local API   │  (Backup +   │   Scripts       │
│              │  (HTTP)      │   Multi-dev) │   (Node/Python) │
└──────────────┴──────────────┴──────────────┴─────────────────┘
       │              │              │              │
┌──────▼──────────────▼──────────────▼──────────────▼──────────┐
│                   CAPA DE DATOS                               │
│              (Almacenamiento y Estado)                        │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│   Obsidian   │  Git Repo    │  Ollama      │   SQLite DBs    │
│   Vault      │  (Remoto:    │  Models      │   (n8n, otros)  │
│  (Markdown   │   GitHub)    │  (~100GB)    │                 │
│   files)     │              │              │                 │
└──────────────┴──────────────┴──────────────┴─────────────────┘

FUTURO (Preparado, no implementar aún):
┌──────────────────────────────────────────────────────────────┐
│              EXTENSIONES OPCIONALES                           │
├──────────────┬──────────────┬──────────────┬─────────────────┤
│ Home         │  Nextcloud   │  Portainer   │  Coolify        │
│ Assistant    │  (NAS)       │  (Docker UI) │  (App Deploy)   │
│ (Domótica)   │              │              │                 │
└──────────────┴──────────────┴──────────────┴─────────────────┘
```

### Puntos de Integración Clave

**1. Obsidian ↔ IA (Bidireccional)**
- **Smart Connections plugin:** Embeddings de tus notas → RAG context para Claude/Ollama
- **Templater:** Llama a APIs (Ollama local) para generar contenido dinámico en templates
- **Quickadd:** Dispara webhooks de n8n que procesan info con IA antes de crear nota

**2. n8n ↔ Ecosistema Completo (Hub Central)**
- **GitHub:** Webhook en PR abierto → extrae diff → llama Ollama → comenta resumen
- **Gmail:** Poll cada 10min → filtra emails → extrae metadata → crea notas/tareas en Obsidian via Local REST API
- **RSS/Feedly:** Nuevos artículos → Ollama genera summary → crea nota en `Inbox/`
- **Obsidian Local API:** n8n puede CRUD notes, leer vault, ejecutar comandos de plugins

**3. Continue.dev/Aider ↔ IA Dual-Tier**
- **Continue.dev config:** Define rules tipo "usa DeepSeek para autocomplete, Llama 3.3 para chat, Claude para arquitectura"
- **Aider:** Flag `--model` permite cambiar entre Ollama local y Claude API según complejidad
- **Context providers:** Ambos pueden leer archivos de Obsidian (añades vault path) para incluir docs en prompts

**4. Git ↔ Todo (Backbone de Sincronización)**
- **Obsidian Git plugin:** Auto-commit cada 10min → push cada hora
- **GitHub Actions:** Valida vault (broken links check) en cada push
- **Multi-dispositivo:** Clonas repo en laptop/desktop → siempre sincronizado
- **Backup implícito:** GitHub = backup off-site automático

### Flujo de Datos Típico

**Ejemplo: Nueva idea para feature**
1. **Obsidian (Interface):** Escribes en daily note: "Idea: Añadir dark mode al dashboard"
2. **Quickadd (Macro):** Atajo `Ctrl+Shift+I` detecta pattern "Idea:" → trigger template
3. **Templater:** Crea nota en `Ideas/` con frontmatter (date, status: inbox)
4. **Git Sync:** Auto-commit en background
5. **Dataview (Query):** Dashboard muestra nueva idea en sección "Inbox Ideas"
6. **Manual Review:** Decides implementar → cambias status a "planned"
7. **n8n (opcional):** Detecta cambio de status → crea issue en GitHub → linkea issue en nota
8. **Continue.dev:** Abres IDE, chateas con IA: "Implementa dark mode basándote en nota Ideas/dark-mode.md"
9. **Smart Connections:** IA lee tu nota automáticamente (ya está en el context)
10. **Aider:** Escribes código siguiendo plan → Aider edita componentes
11. **Post-Implementation:** Actualizas nota con resultados → Git commit → ciclo completo documentado

---

## ⚖️ Trade-offs y Decisiones Clave

### Decisión 1: IA Cloud vs Local (Arquitectura Híbrida Recomendada)

**Opciones:**

**A) 100% Cloud (Claude Pro únicamente)**
- ✅ Calidad máxima siempre
- ✅ Zero setup técnico
- ❌ Límite de requests (rate limiting)
- ❌ Dependencia de internet
- ❌ No aprovechas RTX 5070

**B) 100% Local (Ollama únicamente)**
- ✅ Requests ilimitados
- ✅ Privacidad total
- ✅ Funciona offline
- ❌ Calidad inferior para razonamiento complejo
- ❌ Requiere aprender fine-tuning/prompting para modelos locales

**C) Híbrido (RECOMENDADO)**
- ✅ Claude Pro para decisiones críticas (arquitectura, code reviews finales)
- ✅ Ollama local para tareas repetitivas (autocompletado, refactors simples, summaries)
- ✅ Aprovecha lo mejor de ambos mundos
- ✅ Optimiza coste: Claude Pro ya lo pagas, Ollama es gratis
- ⚠️ Requiere disciplina para decidir qué IA usar en cada caso

**Recomendación:** Opción C (Híbrida). Regla práctica: si la tarea requiere <30 segundos de pensamiento, usa Ollama. Si requiere arquitectura/estrategia, usa Claude Pro. Con el tiempo desarrollarás intuición.

---

### Decisión 2: Obsidian Plugins vs Herramientas Externas

**Opciones:**

**A) Maximizar Plugins de Obsidian (Todo dentro)**
- ✅ Interfaz unificada, un solo programa
- ✅ Sincronización implícita (todo en el vault)
- ❌ Limitado por capacidades de plugins (JS en sandbox)
- ❌ Performance puede degradarse con muchos plugins

**B) Stack Separado (Obsidian + apps especializadas)**
- ✅ Cada herramienta hace lo que mejor sabe
- ✅ Performance óptima
- ❌ Context switching entre apps
- ❌ Sincronización manual o vía automatización

**C) Híbrido: Core en Obsidian + Automatización Externa (RECOMENDADO)**
- ✅ Obsidian como "source of truth" (notas, tareas)
- ✅ n8n/scripts para automatización pesada
- ✅ Continue.dev/Aider en su contexto natural (IDE)
- ⚠️ Requiere configurar integraciones

**Recomendación:** Opción C. Obsidian es excelente para captura y búsqueda, pero no intentes forzarlo a hacer procesamiento pesado. Ejemplo: usa Obsidian para VER tareas, pero n8n para CREAR tareas desde emails automáticamente.

---

### Decisión 3: Git Sync vs Obsidian Sync

**Opción A: Obsidian Sync (Oficial)**
- ✅ Zero configuración
- ✅ End-to-end encrypted
- ✅ Sync instantáneo
- ❌ 8€/mes (fuera de presupuesto)
- ❌ No es control de versiones real

**Opción B: Git + GitHub (RECOMENDADO)**
- ✅ Gratis
- ✅ Control de versiones completo (historial, branches, diffs)
- ✅ Funciona como backup off-site
- ✅ Obsidian Git plugin automatiza todo
- ⚠️ Setup inicial (10-15 minutos)
- ⚠️ Conflictos si editas simultáneamente en múltiples dispositivos (raro en uso personal)

**Opción C: Syncthing (P2P)**
- ✅ Gratis
- ✅ Sync rápido entre dispositivos en misma red
- ❌ No es backup off-site
- ❌ No hay historial de versiones
- ⚠️ Requiere ambos dispositivos online

**Recomendación:** Git + GitHub. El control de versiones es invaluable para un second brain técnico. Casos reales: "¿Qué pensaba sobre X hace 6 meses?" → `git log --grep="tema X"`. Además, gratis y backup automático.

---

### Decisión 4: Continue.dev vs Cursor vs GitHub Copilot

| Criterio | Continue.dev | Cursor | GitHub Copilot |
|----------|--------------|--------|----------------|
| **Coste** | 🟢 Gratis con Ollama | 🟡 20€/mes (después de 500 free) | 🟡 10€/mes |
| **Modelos** | Cualquiera (Ollama, Claude, OpenAI) | Claude, GPT-4 | GPT-4 only |
| **IDE** | VSCode, JetBrains, Neovim | Cursor (VSCode fork) | VSCode, JetBrains |
| **Chat con codebase** | ✅ Sí | ✅✅ Excelente | ⚠️ Limitado |
| **Multi-file edits** | Via Aider integration | ✅✅ Composer mode | ❌ No |
| **Configurabilidad** | ✅✅ Total (JSON config) | ⚠️ Limitada | ⚠️ Limitada |
| **Privacy** | ✅ Local con Ollama | ❌ Cloud | ❌ Cloud |

**Recomendación:** 
- **Primario:** Continue.dev + Ollama (gratis, privado, flexible)
- **Complemento:** Aider CLI para multi-file edits pesados
- **Considera Cursor:** Si tras 2 semanas con Continue.dev sientes que necesitas algo más pulido Y estás dispuesto a pagar 20€/mes

---

### Decisión 5: Self-Hosted vs Cloud para Automatización

**Contexto:** n8n puede correr self-hosted (Docker) o en n8n Cloud.

**Opción A: n8n Cloud**
- ✅ Zero setup
- ✅ Siempre disponible
- ❌ 20€/mes para 2500 executions
- ❌ No puede acceder a Ollama local

**Opción B: n8n Self-Hosted en tu PC (RECOMENDADO si PC 24/7)**
- ✅ Gratis ilimitado
- ✅ Acceso a Ollama local
- ✅ Acceso a Obsidian Local REST API
- ⚠️ Tu PC debe estar encendida
- ⚠️ Setup inicial: Docker + configuración

**Opción C: n8n en Raspberry Pi / Mini PC**
- ✅ Gratis ilimitado
- ✅ Siempre disponible (consumo ~5W)
- ✅ Acceso a red local (Ollama si está en misma red)
- ❌ Inversión inicial ~35-60€ (Raspberry Pi 4/5)

**Opción D: Scripts custom sin n8n**
- ✅ Gratis
- ✅ Control total
- ❌ Mantenimiento continuo
- ❌ Sin UI visual

**Recomendación:** 
- **Fase 1:** Empieza con scripts custom para workflows críticos (ej: GitHub → Obsidian)
- **Fase 2:** Si ves que tienes 3+ workflows automatizados, invierte tiempo en n8n self-hosted
- **Fase 3:** Si n8n te encanta y quieres disponibilidad 24/7, considera Raspberry Pi (~40€ one-time)

---

### Decisión 6: Obsidian Tasks vs Todoist vs Sistema Custom

**Opción A: Solo Obsidian Tasks**
- ✅ Nativo, zero friction
- ✅ Integración con Dataview
- ✅ Markdown = portable
- ❌ App móvil de Obsidian menos ágil que Todoist

**Opción B: Todoist como frontend + Obsidian como backend**
- ✅ Excelente app móvil
- ✅ Captura rápida en móvil
- ✅ Todoist free tier = 5 proyectos, 5 colaboradores (suficiente personal)
- ⚠️ Sync bidireccional requiere n8n o script

**Opción C: Sistema custom (Dataview + frontmatter)**
- ✅ Máxima flexibilidad
- ✅ Queries SQL-like potentes
- ❌ Requiere disciplina en estructura
- ❌ Más complejo de mantener

**Recomendación:** Empieza con Obsidian Tasks (opción A). Si después de 2 semanas sientes que la captura móvil es un blocker, añade Todoist free tier con sync unidireccional (Todoist → Obsidian via n8n). La mayoría de gente sobrestima cuánto necesita la app móvil.

---

### Decisión 7: Estructura del Vault (CRÍTICA)

**Opción A: PARA (Projects, Areas, Resources, Archives)**
- ✅ Framework probado
- ✅ Claro dónde va cada cosa
- ⚠️ Requiere decisiones: ¿esto es Project o Area?

**Opción B: Zettelkasten (Atomic notes + links)**
- ✅ Flexibilidad máxima
- ✅ Emergencia de conocimiento via links
- ⚠️ Curva aprendizaje alta
- ⚠️ Puede ser caótico sin disciplina

**Opción C: Híbrido: PARA + Zettelkasten (RECOMENDADO)**
- ✅ Folders para estructura (PARA)
- ✅ Links para relaciones (Zettelkasten)
- ✅ Lo mejor de ambos mundos

**Estructura Recomendada:**

```
vault/
├── 00-Inbox/              # Captura rápida sin procesar
├── 01-Projects/           # Proyectos activos (< 3 meses)
│   ├── _templates/
│   └── project-name/
├── 02-Areas/              # Responsabilidades continuas
│   ├── Development/
│   ├── Learning/
│   └── Personal/
├── 03-Resources/          # Referencias y materiales
│   ├── Code-Snippets/
│   ├── Architecture/
│   └── Tools/
├── 04-Archives/           # Proyectos completados
├── 05-Daily/              # Daily notes
├── 06-Templates/          # Templates de Templater
├── Meta/                  # Dashboards, índices, MOCs
└── Attachments/           # Imágenes, PDFs
```

**Reglas de Oro:**
1. **Inbox procesado semanalmente** (domingos)
2. **Projects → Archive** cuando completan
3. **Daily notes automáticos** (Templater)
4. **Tags para temas transversales**, folders para contexto
5. **Links bidireccionales** para relacionar conceptos

---

## 🚀 Roadmap de Implementación Sugerido

### Fase 0: Fundación (Semana 1)
**Objetivo:** Sistema básico funcional

**Tareas:**
1. Instalar Ollama + Llama 3.3 70B (2h)
2. Configurar Continue.dev en VSCode (30min)
3. Instalar plugins esenciales de Obsidian:
   - Dataview
   - Tasks
   - Templater
   - Quickadd
   - Obsidian Git
4. Configurar Git sync en vault (30min)
5. Crear estructura PARA en vault (1h)
6. Crear 3 templates básicos (Project, Daily, Resource)

**Checkpoint:** Puedes capturar ideas en Obsidian, hacer commits automáticos, y usar Continue.dev con Ollama local.

---

### Fase 1: Workflows Core (Semana 2-3)
**Objetivo:** Automatizar capturas y desarrollar músculo motor

**Tareas:**
1. Configurar Quickadd para capturas específicas:
   - URL → Resource note
   - Idea → Project inbox
   - Code snippet → Code library
2. Crear dashboard de Dataview con:
   - Active projects
   - Tasks por fecha
   - Recent captures
3. Configurar Smart Connections (embeddings)
4. Instalar Aider CLI + probarlo en proyecto real
5. Crear 2-3 scripts custom para workflows más frecuentes

**Checkpoint:** Capturas ocurren con 1 atajo de teclado. Dashboard muestra vista unificada. IA tiene contexto de tu vault.

---

### Fase 2: Automatización Avanzada (Semana 4-6)
**Objetivo:** Integración externa y workflows complejos

**Tareas:**
1. Setup n8n en Docker (self-hosted)
2. Crear workflows n8n:
   - GitHub issues → Obsidian tasks
   - RSS feeds → Obsidian inbox
   - Email filtering → Task creation
3. Configurar Obsidian Local REST API
4. Optimizar modelos Ollama:
   - Probar Qwen 2.5 Coder
   - Probar DeepSeek Coder
   - Configurar model switching en Continue.dev
5. Crear GitHub Actions para vault validation

**Checkpoint:** Información fluye automáticamente hacia Obsidian. n8n orquesta workflows complejos. Múltiples modelos IA según contexto.

---

### Fase 3: Refinamiento (Ongoing)
**Objetivo:** Pulir fricción y optimizar workflows

**Tareas:**
- Iterar sobre templates
- Añadir más queries de Dataview
- Refinar rules de n8n
- Expandir biblioteca de prompts para Ollama
- Optimizar velocidad de modelos (quantization)
- Crear documentación personal de workflows

**Checkpoint:** Sistema se siente natural. Fricción mínima. Alta productividad.

---

## 📊 Matriz de Decisión Rápida

### ¿Cuándo usar cada herramienta?

| Tarea | Herramienta | Razón |
|-------|-------------|-------|
| Diseñar arquitectura software | Claude Pro (web) | Razonamiento complejo |
| Autocompletar código | Continue.dev + DeepSeek 16B | Rápido, contexto local |
| Refactor multi-archivo | Aider + Claude API | Edición estructural |
| Explicar código legacy | Continue.dev + Llama 3.3 70B | Contexto amplio, gratis |
| Capturar idea rápida | Obsidian + Quickadd | Cero fricción |
| Buscar info en notas | Obsidian search + Smart Connections | RAG sobre tu knowledge |
| Procesar email en batch | n8n + Ollama | Automatización + clasificación IA |
| Revisar PR antes de merge | Script + Ollama | Análisis ilimitado |
| Generar docs de API | Aider + Llama 3.3 70B | Documentación automática |
| Planificación semanal | Obsidian + Dataview + Calendar | Vista unificada |

---

## 🎯 Métricas de Éxito

**Después de 1 mes, deberías poder:**
- [ ] Capturar cualquier idea en <5 segundos
- [ ] Encontrar cualquier nota en <10 segundos
- [ ] Generar 80% del código boilerplate con IA
- [ ] Ver estado de todos tus proyectos en 1 dashboard
- [ ] Procesar inbox a zero en <15 minutos diarios
- [ ] Tener backup automático funcionando sin pensar en ello

**Después de 3 meses:**
- [ ] Workflows automatizados reducen trabajo manual 50%+
- [ ] Second brain contiene >200 notas interconectadas
- [ ] IA local responde 90% de consultas sin usar Claude Pro
- [ ] Sistema se siente "invisible" - simplemente funciona

---

## 🔍 Próximos Pasos

**Comandos disponibles para profundizar:**

```
"Profundiza en [sección X]"
→ Análisis detallado de cualquier módulo

"Compara [opción A] vs [opción B]"
→ Comparativa exhaustiva con use cases

"Genera arquitectura detallada de [módulo]"
→ Diagrama + especificación técnica

"Workflow completo para [caso de uso]"
→ Tutorial paso a paso con ejemplos

"Setup guide para [herramienta X]"
→ Instrucciones de instalación y configuración

"Troubleshooting [problema X]"
→ Debugging y soluciones comunes
```

**Áreas que podrías querer explorar más:**
1. **Setup detallado de Ollama** (instalación, modelos, optimización)
2. **Configuración avanzada de Continue.dev** (context providers, custom rules)
3. **Templates específicos de Obsidian** (Projects, Daily notes, Code reviews)
4. **Workflows de n8n paso a paso** (GitHub integration, Email processing)
5. **Estrategia de prompts para modelos locales** (cómo obtener mejores resultados)
6. **Arquitectura de datos del vault** (frontmatter schemas, naming conventions)
7. **Scripts custom de automatización** (ejemplos en Node.js/Python)

---

## 📚 Recursos Adicionales

### Comunidades
- [Obsidian Discord](https://discord.gg/obsidian) - Plugin support y workflows
- [r/ObsidianMD](https://reddit.com/r/ObsidianMD) - Tips y showcases
- [Continue.dev Discord](https://discord.gg/continuedotdev) - AI coding help
- [n8n Community](https://community.n8n.io) - Workflow templates

### Documentación Clave
- [Dataview Documentation](https://blacksmithgu.github.io/obsidian-dataview/)
- [Templater Documentation](https://silentvoid13.github.io/Templater/)
- [Ollama Models Library](https://ollama.com/library)
- [n8n Workflow Templates](https://n8n.io/workflows)

### Inspiración
- [Obsidian Hub](https://obsidian.rocks/) - Curated resources
- [Linking Your Thinking](https://www.linkingyourthinking.com/) - PKM methodology
- [Building a Second Brain](https://www.buildingasecondbrain.com/) - Framework PARA

---

## ✅ Checklist Final

Antes de comenzar implementación, asegúrate de:
- [ ] Tener cuenta GitHub (para Git sync)
- [ ] Tener Claude Pro activo (ya lo tienes)
- [ ] ~100GB espacio libre (para modelos Ollama)
- [ ] Docker instalado (para n8n eventual)
- [ ] Backup de tu vault actual de Obsidian
- [ ] 2-3 horas disponibles para setup inicial
- [ ] Expectativas realistas: friction reduction es progresiva, no instantánea

**La primera semana será de configuración. La segunda semana empezarás a ver beneficios. Al mes, no podrás imaginar trabajar sin este sistema.**

---

**¿Por dónde quieres que profundicemos?**