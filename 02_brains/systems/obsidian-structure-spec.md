# Obsidian Structure Specification

## 🎯 Executive Summary

Este documento define la estructura completa del vault de Obsidian para el IA Hub Personal. Especifica folders, templates, configuraciones de plugins, queries de Dataview y toda la configuración necesaria para implementar el sistema.

**Principios de Diseño:**

1. **Captura en 1 segundo** - Zero decisiones durante captura
2. **Dashboard como punto de entrada** - Abrir Obsidian = saber qué hacer
3. **Búsqueda cuando necesites** - Smart search para referencias
4. **Español pragmático** - Prosa en español, estructura/tags en inglés
5. **Folders para proyectos, tags para conceptos** - Híbrido organizacional
6. **IA como asistente** - Sugiere, tú confirmas

---

## 📁 Estructura de Carpetas Completa

### Árbol del Vault

```
obsidian-vault/
│
├── 00-Inbox/                    # LANDING ZONE - Todo entra aquí
│   ├── quick-captures/          # Capturas ultra-rápidas (1 línea)
│   ├── ideas/                   # Ideas con contexto desarrollado
│   ├── resources/               # URLs y recursos externos
│   └── _README.md               # Guía de procesamiento de inbox
│
├── 01-Projects/                 # TRABAJO ACTIVO
│   ├── _templates/              # Templates de proyecto
│   │   ├── project.md
│   │   ├── task.md
│   │   └── meeting-note.md
│   │
│   ├── {project-name}/          # Un folder por proyecto activo
│   │   ├── README.md            # Overview del proyecto
│   │   ├── tasks.md             # Todas las tasks del proyecto
│   │   ├── meetings/            # Notas de reuniones
│   │   ├── decisions/           # Decisiones específicas del proyecto
│   │   └── notes/               # Working notes, drafts, experimentos
│   │
│   └── _archive/                # Proyectos completados
│       └── {archived-project}/
│
├── 02-Knowledge/                # REFERENCIA PERMANENTE
│   ├── architecture/            # Architecture Decision Records (ADRs)
│   │   ├── ADR-001-*.md
│   │   ├── ADR-002-*.md
│   │   └── _template-adr.md
│   │
│   ├── patterns/                # Patrones de código y diseño
│   │   ├── validation-pattern.md
│   │   ├── error-handling-pattern.md
│   │   └── repository-pattern.md
│   │
│   ├── methodologies/           # Filosofías y metodologías de trabajo
│   │   ├── coding-philosophy.md
│   │   ├── response-style-ai.md
│   │   └── task-breakdown-method.md
│   │
│   ├── concepts/                # Teoría y conceptos técnicos
│   │   ├── ddd-introduction.md
│   │   ├── hexagonal-architecture.md
│   │   └── solid-principles.md
│   │
│   ├── guides/                  # Guías y procedimientos propios
│   │   ├── setup-react-project.md
│   │   ├── debugging-mongodb.md
│   │   └── deploy-to-production.md
│   │
│   ├── code-snippets/           # Snippets de código reutilizables
│   │   ├── react-custom-hooks.md
│   │   ├── typescript-utils.md
│   │   └── mongodb-queries.md
│   │
│   └── resources/               # Recursos externos y herramientas
│       ├── articles/            # Artículos técnicos procesados
│       ├── videos/              # Videos y talks catalogados
│       ├── prompts/             # Prompts de IA reutilizables
│       └── tools/               # Herramientas y utilities
│
├── 03-Daily/                    # JOURNAL Y TRACKING
│   ├── 2025-10-07.md            # Daily note del día
│   ├── 2025-10-08.md
│   ├── _templates/
│   │   └── daily-note.md
│   └── reviews/                 # Revisiones semanales/mensuales
│       ├── 2025-W41.md          # Weekly review
│       └── 2025-10.md           # Monthly review
│
├── 04-System/                   # META - Sistema mismo
│   ├── dashboards/
│   │   ├── main.md              # Dashboard principal (punto de entrada)
│   │   ├── projects.md          # Vista detallada de proyectos
│   │   ├── knowledge-map.md     # Mapa de conocimiento
│   │   └── tag-analytics.md     # Análisis de tags
│   │
│   ├── templates/               # Templates globales
│   │   ├── quick-capture.md
│   │   ├── idea.md
│   │   ├── resource.md
│   │   ├── meeting.md
│   │   └── task.md
│   │
│   ├── automation/              # Configuración y logs de automatización
│   │   ├── n8n-workflows.md     # Documentación de workflows n8n
│   │   ├── auto-tag-rules.md    # Reglas de auto-tagging
│   │   └── workflow-logs.md     # Logs de ejecución
│   │
│   └── meta/                    # Sobre el sistema
│       ├── setup-guide.md       # Guía de setup inicial
│       ├── plugin-configs.md    # Configuraciones de plugins
│       └── changelog.md         # Cambios al sistema
│
└── .obsidian/                   # Configuración de Obsidian
    ├── plugins/                 # Plugins instalados
    │   ├── dataview/
    │   ├── templater/
    │   ├── quickadd/
    │   ├── obsidian-git/
    │   └── obsidian-local-rest-api/
    ├── snippets/                # CSS snippets
    │   └── dashboard-style.css
    ├── themes/                  # Temas
    └── workspace.json           # Estado del workspace
```

---

## 📝 Templates Completos

### Template: Quick Capture

**Path:** `04-System/templates/quick-capture.md`

```markdown
---
type: quick-capture
created: { { date:YYYY-MM-DDTHH:mm:ss } }
source: quickadd
processed: false
tags: []
---

{{value}}
```

**Uso:** Captura ultra-rápida de 1 línea para procesar después.

---

### Template: Idea

**Path:** `04-System/templates/idea.md`

```markdown
---
type: idea
created: { { date:YYYY-MM-DDTHH:mm:ss } }
source: quickadd
status: unprocessed
tags: []
project: null
ai_tags_suggested: false
---

# {{value:title}}

## Descripción

{{value:description}}

## Contexto

{{value:context}}

## Próximos Pasos

- [ ] Revisar durante planning semanal
- [ ] Decidir: implementar, posponer, o descartar

---

## 🤖 Análisis IA

_La IA sugerirá tags automáticamente en ~2 minutos_
```

**Uso:** Ideas desarrolladas con contexto para evaluar después.

---

### Template: Resource

**Path:** `04-System/templates/resource.md`

```markdown
---
type: resource
url: { { value:url } }
title: "{{value:title}}"
captured: { { date:YYYY-MM-DDTHH:mm:ss } }
source: quickadd
processed: false
tags: []
summary_generated: false
---

# {{value:title}}

**URL:** [{{value:url}}]({{value:url}})  
**Capturado:** {{date:YYYY-MM-DD HH:mm}}

## Notas Iniciales

{{value:notes}}

---

## 🤖 Resumen IA

_La IA generará un resumen y sugerirá tags automáticamente_

---

## Estado

- [ ] Leído
- [ ] Procesado (movido a Knowledge o archivado)
```

**Uso:** URLs de artículos, videos, repos para procesar.

---

### Template: Meeting Note

**Path:** `04-System/templates/meeting.md`

```markdown
---
type: meeting
date: { { date:YYYY-MM-DD } }
time: { { date:HH:mm } }
project: { { value:project } }
attendees: { { value:attendees } }
tags: [meeting]
---

# {{value:title}}

**Fecha:** {{date:YYYY-MM-DD HH:mm}}  
**Asistentes:** {{value:attendees}}  
**Proyecto:** [[01-Projects/{{value:project}}/README|{{value:project}}]]

---

## 📋 Agenda

- ***

## 📝 Notas

### Tema 1

### Tema 2

---

## 🎯 Decisiones

- ***

## ✅ Action Items

- [ ]
- [ ]

---

## 🔗 Enlaces Relacionados

- ***

## 📅 Seguimiento

**Próxima reunión:**
**Temas pendientes:**
```

**Uso:** Notas estructuradas de reuniones con action items.

---

### Template: Project

**Path:** `01-Projects/_templates/project.md`

```markdown
---
type: project
status: active
stack: []
start_date: { { date:YYYY-MM-DD } }
due_date:
priority: medium
repo:
tags: [project]
---

# {{value:project_name}}

## 📋 Resumen

{{value:description}}

---

## 🎯 Objetivos

### Objetivo Principal

{{value:main_goal}}

### Objetivos Secundarios

-
- ***

## 📊 Estado del Proyecto

**Fecha de inicio:** {{date:YYYY-MM-DD}}  
**Fecha objetivo:** {{value:due_date}}  
**Estado:** 🟢 Activo  
**Progreso:** 0%

### Métricas

- **Tasks completadas:** 0 / 0
- **Blockers activos:** 0
- **Última actualización:** {{date:YYYY-MM-DD}}

---

## 🛠️ Stack Técnico

- {{value:stack}}

---

## 📁 Estructura del Proyecto
```

{{value:project_name}}/
├── README.md (este archivo)
├── tasks.md (todas las tasks)
├── meetings/ (notas de reuniones)
├── decisions/ (decisiones del proyecto)
└── notes/ (working notes)

```

---

## ✅ Tasks

Ver [[01-Projects/{{value:project_name}}/tasks|tasks.md]] para lista completa.

### En Progreso

- [ ]

### Próximas

- [ ]

### Bloqueadas

- [ ]

---

## 🏗️ Arquitectura

### Decisiones Principales

- [[02-Knowledge/architecture/ADR-XXX|ADR-XXX: Decisión relevante]]

### Patrones Utilizados

- [[02-Knowledge/patterns/pattern-name|Patrón X]]

---

## 🔗 Enlaces

**Repositorio:** {{value:repo}}
**Docs:** {{value:docs_url}}
**Deploy:** {{value:deploy_url}}

---

## 📝 Notas

### Setup Inicial

- [ ] Configurar entorno
- [ ] Instalar dependencias
- [ ] Crear estructura base

### Próximos Pasos



---

## 📚 Recursos Relacionados

-

---

*Template creado: {{date:YYYY-MM-DD}}*
```

**Uso:** Nuevo proyecto con estructura completa.

---

### Template: Task

**Nota:** Tasks se crean como ítems en `tasks.md`, no como archivos separados.

**Formato en `tasks.md`:**

```markdown
## Tasks Activas

### En Progreso

- [ ] Implementar autenticación con JWT #high #backend 📅 2025-10-15 ⏰ 14:30
      Creado: 2025-10-07 14:30
      Contexto: Sistema necesita auth para proteger endpoints
      Relacionado: [[02-Knowledge/architecture/ADR-008-auth-strategy]]

### Próximas

- [ ] Añadir tests unitarios al módulo de usuarios #medium #testing 📅 2025-10-20
      Creado: 2025-10-07 15:00

### Bloqueadas

- [ ] Integrar Stripe para pagos #high #blocked 🚧
      Creado: 2025-10-05 10:00
      Bloqueado por: Esperando aprobación de cuenta Stripe
      Contacto: finanzas@empresa.com
```

**Sintaxis:**

```
- [ ] {título} #{priority} #{tags} 📅 {due_date} ⏰ {created_time}
  Creado: {created_date}
  Contexto: {context}
  Relacionado: [[link]]
```

---

### Template: Architecture Decision Record (ADR)

**Path:** `02-Knowledge/architecture/_template-adr.md`

```markdown
---
type: architecture-decision
status: proposed
date: { { date:YYYY-MM-DD } }
project:
tags: [architecture, adr]
superseded_by: null
---

# ADR-XXX: {Título de la Decisión}

## Estado

**Propuesto** | Aceptado | Rechazado | Deprecado | Superseded

_Fecha:_ {{date:YYYY-MM-DD}}  
_Autor:_ {{author}}

---

## Contexto

_¿Qué problema o situación motivó esta decisión?_

_Describe el contexto técnico y de negocio relevante._

---

## Decisión

_¿Qué cambio o solución se propone/acordó?_

_Describe la decisión de manera clara y concisa._

### Implementación

_¿Cómo se implementará esta decisión?_

// Código ejemplo si aplica

---

## Consecuencias

### Positivas ✅

-
-

### Negativas ⚠️

-
-

### Riesgos 🚨

- ***

## Alternativas Consideradas

### Alternativa A: {Nombre}

## **Pros:**

## **Contras:**

**Razón del rechazo:**

### Alternativa B: {Nombre}

## **Pros:**

## **Contras:**

**Razón del rechazo:**

---

## Referencias

- [Documentación relevante](url)
- [[02-Knowledge/patterns/related-pattern|Patrón relacionado]]
- [[01-Projects/project-name/README|Proyecto donde se aplica]]

---

## Decisiones Relacionadas

- [[02-Knowledge/architecture/ADR-XXX|ADR-XXX]]: Decisión relacionada
- Supersede: [[ADR-YYY]] (si aplica)

---

## Notas de Implementación

_Fecha de implementación:_
_Lecciones aprendidas:_

---

_Este ADR es leído por Continue.dev para context-aware assistance._
```

---

### Template: Daily Note

**Path:** `03-Daily/_templates/daily-note.md`

````markdown
---
date: {{date:YYYY-MM-DD}}
day: {{date:dddd}}
week: {{date:YYYY-[W]ww}}
tags: [daily]
---

# {{date:dddd, DD MMMM YYYY}}

---

## 🎯 Prioridades del Día

### Top 3

1.
2.
3.

**Contexto:**  
_¿En qué proyecto(s) me enfoco hoy?_

---

## 📅 Agenda

**Auto-generada:**

<!-- Aquí n8n puede insertar agenda del día si está configurado -->

---

## ✅ Tasks Pendientes Hoy

```dataview
TASK
FROM "01-Projects"
WHERE !completed AND due = date({{date:YYYY-MM-DD}})
GROUP BY file.link
```
````

---

## 📝 Capturas y Notas

### 💡 Ideas Rápidas

<!-- Espacio para ideas que surjan durante el día -->

---

### 📞 Reuniones

<!-- Notas de reuniones o links a notas de meeting -->

---

### 🎯 Decisiones Tomadas

<!-- Qué decidiste hoy que sea relevante -->

---

### 🚧 Problemas Encontrados

<!-- Blockers o problemas con sus soluciones -->

**Problema:**

**Solución:**

---

## 💭 Reflexiones

### ✅ Qué Funcionó Bien

### 🔄 Qué Podría Mejorar

### 🎯 Foco de Mañana

---

## 📊 Resumen del Día

**Completado hoy:**

- [ ] Definir al final del día

**Creado:**

- Notas:
- Tasks:
- Commits:

**Tiempo en:**

- Coding:
- Meetings:
- Planning:

---

## 🔗 Navegación

- [[03-Daily/{{date-1d:YYYY-MM-DD}}|← Ayer]]
- [[04-System/dashboards/main|📊 Dashboard]]
- [[03-Daily/{{date+1d:YYYY-MM-DD}}|Mañana →]]

---

_Daily note generada automáticamente. Edita libremente._

````

---

### Template: Weekly Review

**Path:** `03-Daily/_templates/weekly-review.md`

```markdown
---
type: weekly-review
week: {{date:YYYY-[W]ww}}
start_date: {{monday:YYYY-MM-DD}}
end_date: {{sunday:YYYY-MM-DD}}
tags: [review, weekly]
---

# Revisión Semanal: {{date:YYYY-[W]ww}}

**Semana del {{monday:DD MMM}} al {{sunday:DD MMM YYYY}}**

---

## 📊 Métricas de la Semana

**Auto-generadas:**

### Productividad

- **Commits:** <!-- Auto-filled by n8n -->
- **Tasks Completadas:** <!-- Auto-filled -->
- **Notas Creadas:** <!-- Auto-filled -->
- **Proyectos Activos:** <!-- Auto-filled -->

### Tiempo

- **Coding:** ~X horas
- **Meetings:** ~X horas
- **Planning/Reviews:** ~X horas

---

## ✅ Logros

### Tasks Completadas

```dataview
TASK
FROM "01-Projects"
WHERE completed
AND completion >= date({{monday:YYYY-MM-DD}})
AND completion <= date({{sunday:YYYY-MM-DD}})
GROUP BY file.link
````

### Highlights

_¿Qué lograste esta semana que vale la pena celebrar?_

-
- ***

## ⏸️ Tareas Pendientes

### Tasks que Quedaron Incompletas

```dataview
TASK
FROM "01-Projects"
WHERE !completed
AND due >= date({{monday:YYYY-MM-DD}})
AND due <= date({{sunday:YYYY-MM-DD}})
GROUP BY file.link
```

### Razones

_¿Por qué quedaron pendientes?_

- ***

## 🚧 Blockers y Problemas

### Blockers Activos

_¿Qué está bloqueando progreso?_

-

### Problemas Recurrentes

_¿Hay patrones de problemas que se repiten?_

- ***

## 💡 Ideas y Capturas

### Ideas Generadas Esta Semana

```dataview
LIST
FROM "00-Inbox/ideas"
WHERE created >= date({{monday:YYYY-MM-DD}})
AND created <= date({{sunday:YYYY-MM-DD}})
SORT created DESC
```

### Ideas Procesadas

_¿Qué ideas se convirtieron en tasks o proyectos?_

- ***

## 📚 Aprendizajes

### Qué Aprendí

_Conceptos nuevos, tecnologías, patrones_

-

### Decisiones Arquitectónicas

_ADRs creados esta semana_

```dataview
LIST
FROM "02-Knowledge/architecture"
WHERE date >= date({{monday:YYYY-MM-DD}})
AND date <= date({{sunday:YYYY-MM-DD}})
```

---

## 🔄 Retrospectiva

### ✅ Qué Funcionó Bien

1.
2.
3.

### 🔄 Qué Mejorar

1.
2.
3.

### 💪 Acciones para Próxima Semana

- [ ]
- [ ]
- [ ]

---

## 🎯 Objetivos Próxima Semana

### Proyectos Prioritarios

1.
2.
3.

### Tasks Críticas

- [ ]
- [ ]

### Áreas de Foco

_¿En qué quiero enfocarme?_

- ***

## 📊 Estado de Proyectos

```dataview
TABLE
  status as "Estado",
  length(file.tasks.where(t => !t.completed)) as "Pendientes",
  length(file.tasks.where(t => t.completed)) as "Completadas"
FROM "01-Projects"
WHERE status = "active"
SORT priority DESC
```

---

## 🧹 Inbox Status

### Items Pendientes de Procesar

```dataview
TABLE
  type as "Tipo",
  created as "Capturado"
FROM "00-Inbox"
WHERE processed = false
SORT created ASC
LIMIT 20
```

**Action:** [[00-Inbox/_README|Procesar Inbox]]

---

## 🤖 Sugerencias IA

_Auto-generadas basadas en datos de la semana:_

<!-- n8n puede insertar sugerencias aquí -->

---

## 🔗 Enlaces

- [[03-Daily/reviews/{{date-7d:YYYY-[W]ww}}|← Semana Anterior]]
- [[04-System/dashboards/main|Dashboard Principal]]
- [[03-Daily/reviews/{{date+7d:YYYY-[W]ww}}|Próxima Semana →]]

---

_Review generada: {{date:YYYY-MM-DD HH:mm}}_

````

---

## 🎨 Dashboards Completos

### Dashboard Principal

**Path:** `04-System/dashboards/main.md`

```markdown
# 🎯 Command Center

*{{date:dddd, DD MMMM YYYY}} - {{date:HH:mm}}*

---

## 🌅 Foco de Hoy

### Top 3 Prioridades

*Definir cada mañana*

1.
2.
3.

---

## 📋 Tasks Activas

### Vencen Hoy ⚠️

```dataview
TASK
FROM "01-Projects"
WHERE !completed AND due = date(today)
GROUP BY file.link
SORT priority DESC
````

### En Progreso

```dataview
TASK
FROM "01-Projects"
WHERE !completed AND contains(text, "⏳")
GROUP BY file.link
LIMIT 10
```

### Overdue 🚨

```dataview
TASK
FROM "01-Projects"
WHERE !completed AND due < date(today)
GROUP BY file.link
```

---

## 🚀 Proyectos Activos

```dataview
TABLE
  status as "Estado",
  length(file.tasks.where(t => !t.completed)) as "Pendientes",
  length(file.tasks.where(t => t.completed)) as "Completadas",
  due as "Fecha Límite",
  priority as "Prioridad"
FROM "01-Projects"
WHERE status = "active"
SORT priority DESC, due ASC
```

---

## 💡 Inbox Status

```dataview
TABLE
  length(rows) as "Cantidad"
FROM "00-Inbox"
WHERE type != null
GROUP BY type
```

**Acción Requerida:** [[00-Inbox/_README|Procesar Inbox]]  
**Última revisión:** _Configurar en setup_

---

## 📊 Resumen de Ayer

_Auto-generado desde daily note_

**Completado:**

- Tasks: <!-- Auto-filled -->
- Commits: <!-- Auto-filled -->
- Notas creadas: <!-- Auto-filled -->

**Highlights:**

<!-- Auto-filled desde daily note anterior -->

---

## 🔗 Acciones Rápidas

- **Capturar:** `Ctrl+Shift+N`
- **Daily Note:** [[03-Daily/{{date:YYYY-MM-DD}}|Nota de Hoy]]
- **Proyectos:** [[04-System/dashboards/projects|Vista Proyectos]]
- **Knowledge:** [[02-Knowledge/README|Base de Conocimiento]]
- **Prompts:** [[02-Knowledge/resources/prompts/README|Biblioteca de Prompts]]

---

## 🧠 Contexto para IA

**Proyecto actual:** _Actualizar manualmente o auto-detect_  
**Decisiones recientes:** [[02-Knowledge/architecture/README|ADRs]]  
**Metodología:** [[02-Knowledge/methodologies/coding-philosophy|Mi Filosofía]]

---

## 📈 Esta Semana

**Semana {{date:YYYY-[W]ww}}**

```dataview
TABLE
  length(file.tasks.where(t => t.completed)) as "Completadas",
  length(file.tasks.where(t => !t.completed)) as "Pendientes"
FROM "01-Projects"
WHERE status = "active"
```

**Última review:** [[03-Daily/reviews/{{date:YYYY-[W]ww}}|Review Semanal]]

---

_Dashboard auto-refresh al abrir. `Ctrl+R` para refresh manual._

````

---

### Dashboard de Proyectos

**Path:** `04-System/dashboards/projects.md`

```markdown
# 📊 Vista de Proyectos

*Actualizado: {{date:YYYY-MM-DD HH:mm}}*

---

## 🟢 Proyectos Activos

```dataview
TABLE
  stack as "Stack",
  start_date as "Inicio",
  due as "Fecha Límite",
  length(file.tasks) as "Total Tasks",
  length(file.tasks.where(t => !t.completed)) as "Pendientes",
  length(file.tasks.where(t => t.completed)) as "Completadas",
  round(length(file.tasks.where(t => t.completed)) / length(file.tasks) * 100) + "%" as "Progreso"
FROM "01-Projects"
WHERE status = "active"
SORT priority DESC, due ASC
````

---

## 🟡 Proyectos Pausados

```dataview
TABLE
  stack as "Stack",
  start_date as "Inicio",
  paused_reason as "Razón"
FROM "01-Projects"
WHERE status = "paused"
```

---

## 🔴 Proyectos con Blockers

```dataview
TABLE
  length(file.tasks.where(t => contains(t.text, "#blocked"))) as "Bloqueadas",
  file.link as "Proyecto"
FROM "01-Projects"
WHERE status = "active"
AND length(file.tasks.where(t => contains(t.text, "#blocked"))) > 0
```

---

## 📅 Timeline

### Esta Semana

```dataview
TABLE
  due as "Vence",
  status as "Estado"
FROM "01-Projects"
WHERE due >= date({{date:YYYY-MM-DD}})
AND due <= date({{date:YYYY-MM-DD}}) + dur(7 days)
SORT due ASC
```

### Este Mes

```dataview
TABLE
  due as "Vence",
  priority as "Prioridad"
FROM "01-Projects"
WHERE due >= date({{date:YYYY-MM-DD}})
AND due <= date({{date:YYYY-MM-DD}}) + dur(30 days)
SORT due ASC
```

---

## 🏆 Proyectos Completados (Últimos 3 meses)

```dataview
TABLE
  completed_date as "Completado",
  duration as "Duración",
  stack as "Stack"
FROM "01-Projects/_archive"
WHERE completed_date >= date({{date:YYYY-MM-DD}}) - dur(90 days)
SORT completed_date DESC
LIMIT 10
```

---

## 🔗 Navegación

- [[04-System/dashboards/main|← Dashboard Principal]]
- [[02-Knowledge/README|Base de Conocimiento]]
- [[03-Daily/reviews/{{date:YYYY-[W]ww}}|Review Semanal]]

````

---

### Dashboard de Análisis de Tags

**Path:** `04-System/dashboards/tag-analytics.md`

```markdown
# 📊 Análisis de Tags

*Actualizado: {{date:YYYY-MM-DD HH:mm}}*

---

## 🏷️ Tags Más Usados (Últimos 30 Días)

```dataview
TABLE
  length(rows) as "Cantidad",
  rows.file.link as "Notas"
FROM ""
WHERE file.mtime > date(today) - dur(30 days)
FLATTEN file.tags as tag
GROUP BY tag
SORT length(rows) DESC
LIMIT 30
````

---

## 🎯 Tags por Categoría

### Tags Técnicos

```dataview
TABLE
  length(rows) as "Cantidad"
FROM ""
WHERE file.tags
FLATTEN file.tags as tag
WHERE contains(tag, "#react")
   OR contains(tag, "#typescript")
   OR contains(tag, "#javascript")
   OR contains(tag, "#python")
   OR contains(tag, "#backend")
   OR contains(tag, "#frontend")
GROUP BY tag
SORT length(rows) DESC
```

### Tags de Estado

```dataview
TABLE
  length(rows) as "Cantidad"
FROM ""
WHERE file.tags
FLATTEN file.tags as tag
WHERE contains(tag, "#urgent")
   OR contains(tag, "#blocked")
   OR contains(tag, "#review")
   OR contains(tag, "#todo")
GROUP BY tag
SORT length(rows) DESC
```

---

## 📝 Notas Sin Tags

```dataview
LIST
FROM ""
WHERE !file.tags OR length(file.tags) = 0
SORT file.mtime DESC
LIMIT 20
```

---

## 🤖 Estadísticas de Auto-Tagging

### Tags Sugeridos (Últimos 7 Días)

```dataview
TABLE
  ai_confidence as "Confianza",
  tags as "Tags",
  file.mtime as "Fecha"
FROM ""
WHERE ai_tags_suggested = true
AND file.mtime > date(today) - dur(7 days)
SORT file.mtime DESC
```

### Precisión

**Notas auto-taggeadas:** <!-- Calcular -->  
**Precisión estimada:** <!-- Basado en cambios manuales -->

---

## 🔗 Navegación

- [[04-System/dashboards/main|Dashboard Principal]]
- [[00-Inbox/_README|Procesar Inbox]]

````

---

## ⚙️ Configuración de Plugins

### Plugins Requeridos

| Plugin | Versión Mín. | Propósito | Crítico |
|--------|--------------|-----------|---------|
| **Dataview** | 0.5.0+ | Queries dinámicas en dashboards | ✅ Sí |
| **Templater** | 1.18.0+ | Templates con JS dinámico | ✅ Sí |
| **Quickadd** | 1.0.0+ | Captura rápida con selector | ✅ Sí |
| **Obsidian Git** | 2.0.0+ | Backup automático a GitHub | ✅ Sí |
| **Local REST API** | 2.0.0+ | n8n integration | ✅ Sí |
| **Tasks** | 4.0.0+ | Sintaxis avanzada de tasks | ⚠️ Recomendado |
| **Calendar** | 1.5.0+ | Vista de calendario | ⚠️ Opcional |
| **Excalidraw** | 2.0.0+ | Diagramas integrados | ⚠️ Opcional |

---

### Configuración: Quickadd

**Settings → Quickadd**

#### Multi-Choice Setup

**Name:** `Captura`
**Type:** Multi-Choice
**Hotkey:** `Ctrl+Shift+N`

**Choices:**

```javascript
// Choice 1: Quick Capture
{
  name: "⚡ Captura Rápida",
  type: "Capture",
  captureType: "ActiveNote",
  format: {
    enabled: true,
    format: "{{VALUE}}"
  },
  folder: "00-Inbox/quick-captures",
  prepend: false,
  task: false,
  template: "[[04-System/templates/quick-capture]]",
  format: "{{DATE:YYYY-MM-DD-HHmmss}}-{{VALUE:fileName}}.md"
}

// Choice 2: Idea
{
  name: "💡 Idea",
  type: "Capture",
  captureType: "ActiveNote",
  folder: "00-Inbox/ideas",
  prepend: false,
  template: "[[04-System/templates/idea]]",
  format: "{{DATE:YYYY-MM-DD}}-{{VALUE:title}}.md",
  openFile: true,
  openFileInNewTab: {
    enabled: false
  }
}

// Choice 3: Task
{
  name: "✅ Task",
  type: "Capture",
  captureType: "PrependTask",
  folder: "01-Projects",
  template: "[[04-System/templates/task]]",
  task: true,
  appendLink: false
}

// Choice 4: Meeting
{
  name: "📝 Meeting",
  type: "Template",
  folder: "",
  template: "[[04-System/templates/meeting]]",
  format: "{{DATE:YYYY-MM-DD}}-{{VALUE:title}}.md",
  incrementFileName: true,
  openFileInNewTab: {
    enabled: false
  }
}

// Choice 5: Resource
{
  name: "🔗 Resource",
  type: "Capture",
  folder: "00-Inbox/resources",
  template: "[[04-System/templates/resource]]",
  format: "{{DATE:YYYY-MM-DD}}-{{VALUE:title}}.md",
  openFile: false
}
````

**Variables Configuradas:**

Para cada choice, configurar variables (prompts):

**Quick Capture:**

- No variables (input directo)

**Idea:**

- `title` (Text): "Título de la idea"
- `description` (Text Area): "Descripción (opcional)"
- `context` (Text Area): "Contexto adicional (opcional)"

**Task:**

- `task` (Text): "Descripción de la task"
- `project` (Suggester): Lista de proyectos activos
- `due` (Date): "Fecha límite (opcional)"
- `priority` (Suggester): ["high", "medium", "low"]

**Meeting:**

- `title` (Text): "Título de la reunión"
- `project` (Suggester): Lista de proyectos (opcional)
- `attendees` (Text): "Asistentes (separados por coma)"

**Resource:**

- `url` (Text): "URL del recurso"
- `title` (Text): "Título (se auto-detecta)"
- `notes` (Text Area): "Notas iniciales (opcional)"

---

### Configuración: Templater

**Settings → Templater**

**Template Folder:** `04-System/templates`

**Syntax:**

- Template hotkey trigger: Enabled
- Trigger on file creation: Enabled

**Folder Templates:**

| Folder                     | Template           |
| -------------------------- | ------------------ |
| `00-Inbox/quick-captures/` | `quick-capture.md` |
| `00-Inbox/ideas/`          | `idea.md`          |
| `00-Inbox/resources/`      | `resource.md`      |
| `01-Projects/`             | `project.md`       |
| `03-Daily/`                | `daily-note.md`    |

**User Scripts:** (Opcional, para funciones avanzadas)

```javascript
// Example: Get active projects for suggester
function getActiveProjects() {
  const files = app.vault.getMarkdownFiles();
  const projects = files
    .filter((file) => file.path.startsWith("01-Projects/"))
    .filter((file) => file.basename === "README")
    .map((file) => file.parent.name);
  return projects;
}

module.exports = getActiveProjects;
```

---

### Configuración: Dataview

**Settings → Dataview**

**General:**

- Enable JavaScript Queries: ✅ Enabled
- Enable Inline Queries: ✅ Enabled
- Enable Inline JavaScript Queries: ✅ Enabled

**Codeblock Settings:**

- Dataview Export: Enabled
- Warn on Empty Result: Disabled
- Render Null As: "-"

**Display:**

- Default Date Format: `yyyy-MM-dd`
- Default Date + Time Format: `yyyy-MM-dd HH:mm`
- Maximum Recursive Link Depth: 4

---

### Configuración: Obsidian Git

**Settings → Obsidian Git**

**Basic Settings:**

- Vault backup interval: `10` minutes
- Commit message: `vault backup: {{date}}`
- Auto pull interval: `60` minutes
- Auto pull on startup: ✅ Enabled
- Auto backup after file change: ❌ Disabled (usar intervalo)

**Commit Message:**

```
vault backup: {{date}}
{{numFiles}} files changed
```

**Custom Commands:**

| Command       | Schedule     | Action            |
| ------------- | ------------ | ----------------- |
| Pull          | Every 60 min | Pull from remote  |
| Commit + Push | Every 10 min | Commit all + push |

**Advanced:**

- Disable push: ❌ No (queremos push automático)
- Pull updates on startup: ✅ Yes
- Disable popup notifications: ✅ Yes (menos ruido)
- Show status bar: ✅ Yes

**Git Setup Required:**

```bash
# En terminal, dentro del vault
cd /path/to/obsidian-vault

# Inicializar Git
git init

# Configurar usuario
git config user.name "Tu Nombre"
git config user.email "tu@email.com"

# Crear .gitignore
echo ".obsidian/workspace.json" > .gitignore
echo ".obsidian/workspace-mobile.json" >> .gitignore
echo ".trash/" >> .gitignore

# Añadir remote
git remote add origin https://github.com/tu-usuario/obsidian-vault.git

# Primer commit
git add .
git commit -m "Initial vault structure"
git push -u origin main
```

---

### Configuración: Local REST API

**Settings → Local REST API**

**Server:**

- Port: `27124`
- Host: `localhost`
- HTTPS: ❌ Disabled (local only)
- Require Authentication: ⚠️ Enabled (seguridad)

**Authentication:**

- API Key: Generar key aleatoria
- Guardar en lugar seguro (para n8n)

**Endpoints Enabled:**

- ✅ `/vault/` - Create/Read/Update/Delete files
- ✅ `/search/` - Search content
- ✅ `/active/` - Get active file
- ✅ `/periodic/` - Daily/Weekly notes
- ✅ `/commands/` - Execute commands

**CORS:**

- Allow CORS: ✅ Enabled
- Allowed Origins: `http://localhost:5678` (n8n)

**Test Endpoint:**

```bash
curl http://localhost:27124/vault/ \
  -H "Authorization: Bearer YOUR_API_KEY"
```

---

### Configuración: Tasks (Opcional)

**Settings → Tasks**

**Global Filter:**

```
not done
```

**Date Format:**

- Due date: `📅 YYYY-MM-DD`
- Scheduled date: `⏳ YYYY-MM-DD`
- Start date: `🛫 YYYY-MM-DD`
- Created date: `➕ YYYY-MM-DD`
- Done date: `✅ YYYY-MM-DD`

**Task Completion:**

- Set done date on completion: ✅ Yes
- Auto-suggest: ✅ Enabled

**Recurrence:**

- Enable recurrence: ✅ Yes

---

## 📋 Frontmatter Schemas

### Schema: Quick Capture

```yaml
---
type: quick-capture
created: 2025-10-07T14:23:05
source: quickadd | mobile
processed: false
tags: []
---
```

**Fields:**

- `type`: Tipo de nota (literal: "quick-capture")
- `created`: Timestamp ISO 8601
- `source`: Origen de la captura
- `processed`: Boolean - ¿ya fue procesada?
- `tags`: Array de tags (vacío inicialmente)

---

### Schema: Idea

```yaml
---
type: idea
created: 2025-10-07T14:25:00
source: quickadd | mobile
status: unprocessed | processing | processed | archived
tags: []
project: null | [[01-Projects/project-name/README]]
ai_tags_suggested: false
ai_confidence: 0.00
ai_timestamp: null
---
```

**Fields:**

- `type`: "idea"
- `created`: Timestamp ISO 8601
- `source`: Origen
- `status`: Estado del procesamiento
- `tags`: Array (llenado por auto-tag)
- `project`: Link a proyecto si aplica
- `ai_tags_suggested`: Boolean
- `ai_confidence`: Float 0-1
- `ai_timestamp`: Cuándo se sugirieron tags

---

### Schema: Resource

```yaml
---
type: resource
url: "https://example.com/article"
title: "Article Title"
captured: 2025-10-07T14:35:00
source: quickadd | mobile | extension
processed: false
tags: []
summary_generated: false
read: false
---
```

**Fields:**

- `type`: "resource"
- `url`: URL del recurso
- `title`: Título (auto o manual)
- `captured`: Timestamp
- `source`: Origen
- `processed`: Boolean
- `tags`: Array
- `summary_generated`: Boolean (IA generó resumen)
- `read`: Boolean (ya leído)

---

### Schema: Meeting

```yaml
---
type: meeting
date: 2025-10-07
time: "14:30"
project: [[01-Projects/project-name/README]]
attendees: "Juan, María, Pedro"
tags: [meeting]
duration: 60
---
```

**Fields:**

- `type`: "meeting"
- `date`: Fecha YYYY-MM-DD
- `time`: Hora HH:mm
- `project`: Link a proyecto
- `attendees`: String de asistentes
- `tags`: Array (incluye "meeting")
- `duration`: Minutos (opcional)

---

### Schema: Project

```yaml
---
type: project
status: active | paused | completed | archived
stack: [react, typescript, supabase]
start_date: 2025-10-07
due_date: 2025-12-01
priority: high | medium | low
repo: "https://github.com/user/repo"
tags: [project]
---
```

**Fields:**

- `type`: "project"
- `status`: Estado del proyecto
- `stack`: Array de tecnologías
- `start_date`: Fecha inicio
- `due_date`: Fecha objetivo
- `priority`: Prioridad
- `repo`: URL del repositorio
- `tags`: Array (incluye "project")

---

### Schema: Architecture Decision Record (ADR)

```yaml
---
type: architecture-decision
adr_number: 5
status: proposed | accepted | rejected | deprecated | superseded
date: 2025-10-07
project: [[01-Projects/project-name/README]]
tags: [architecture, adr]
superseded_by: null | [[02-Knowledge/architecture/ADR-010]]
related_adrs: []
---
```

**Fields:**

- `type`: "architecture-decision"
- `adr_number`: Número secuencial
- `status`: Estado de la decisión
- `date`: Fecha de la decisión
- `project`: Proyecto donde aplica
- `tags`: Array (incluye "architecture", "adr")
- `superseded_by`: ADR que reemplaza este (si aplica)
- `related_adrs`: Array de ADRs relacionados

---

### Schema: Daily Note

```yaml
---
date: 2025-10-07
day: Monday
week: 2025-W41
tags: [daily]
mood: 😊 | 😐 | 😟
energy: high | medium | low
---
```

**Fields:**

- `date`: Fecha YYYY-MM-DD
- `day`: Día de la semana
- `week`: Semana ISO (YYYY-Www)
- `tags`: Array (incluye "daily")
- `mood`: Emoji o string (opcional)
- `energy`: Nivel de energía (opcional)

---

### Schema: Weekly Review

```yaml
---
type: weekly-review
week: 2025-W41
start_date: 2025-10-06
end_date: 2025-10-12
tags: [review, weekly]
---
```

**Fields:**

- `type`: "weekly-review"
- `week`: Semana ISO
- `start_date`: Lunes
- `end_date`: Domingo
- `tags`: Array (incluye "review", "weekly")

---

## 🎨 CSS Snippets (Opcional)

### Dashboard Styling

**Path:** `.obsidian/snippets/dashboard-style.css`

```css
/* Dashboard Principal Styling */

/* Headers más compactos */
.dashboard-container h2 {
  margin-top: 1em;
  margin-bottom: 0.5em;
  border-bottom: 2px solid var(--text-accent);
  padding-bottom: 0.3em;
}

/* Dataview tables más legibles */
.dataview.table-view-table {
  font-size: 0.9em;
  border-collapse: collapse;
}

.dataview.table-view-table th {
  background-color: var(--background-secondary);
  font-weight: 600;
  padding: 0.5em;
}

.dataview.table-view-table td {
  padding: 0.4em 0.5em;
  border-bottom: 1px solid var(--background-modifier-border);
}

/* Resaltar tasks overdue */
.dataview.task-list-item:has([data-task-due]:past) {
  background-color: rgba(255, 0, 0, 0.1);
  border-left: 3px solid var(--text-error);
  padding-left: 0.5em;
}

/* Resaltar tasks de hoy */
.dataview.task-list-item:has([data-task-due]:today) {
  background-color: rgba(255, 200, 0, 0.1);
  border-left: 3px solid var(--text-warning);
  padding-left: 0.5em;
}

/* Prioridades con colores */
[data-tag="high"] {
  color: var(--text-error);
  font-weight: 600;
}

[data-tag="medium"] {
  color: var(--text-warning);
}

[data-tag="low"] {
  color: var(--text-muted);
}

/* Iconos para status de proyectos */
.status-active::before {
  content: "🟢 ";
}

.status-paused::before {
  content: "🟡 ";
}

.status-completed::before {
  content: "✅ ";
}

.status-archived::before {
  content: "📦 ";
}

/* Quick links más visibles */
.dashboard-quick-links a {
  display: inline-block;
  padding: 0.5em 1em;
  margin: 0.3em;
  background-color: var(--interactive-accent);
  color: var(--text-on-accent);
  border-radius: 5px;
  text-decoration: none;
  transition: all 0.2s;
}

.dashboard-quick-links a:hover {
  background-color: var(--interactive-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

/* Compact mode para listas largas */
.compact-list ul {
  list-style: none;
  padding-left: 0;
}

.compact-list li {
  padding: 0.2em 0;
  border-bottom: 1px solid var(--background-modifier-border);
}

/* Inbox counter badge */
.inbox-count {
  display: inline-block;
  background-color: var(--text-error);
  color: white;
  padding: 0.2em 0.5em;
  border-radius: 10px;
  font-size: 0.8em;
  font-weight: bold;
}
```

**Activar snippet:**
Settings → Appearance → CSS snippets → Reload → Enable "dashboard-style"

---

## 🔧 Configuración Inicial Paso a Paso

### Fase 0: Preparación (30 min)

**1. Crear Vault:**

```
1. Abrir Obsidian
2. "Create new vault"
3. Nombre: "IA-Hub-Vault" (o como prefieras)
4. Location: Elegir ubicación en disco
```

**2. Crear Estructura de Carpetas:**

Copiar esta estructura manualmente o usar script:

```bash
# Script PowerShell (Windows)
# Guardar como: create-structure.ps1

$vault = "C:\path\to\IA-Hub-Vault"

# Crear carpetas principales
$folders = @(
    "00-Inbox\quick-captures",
    "00-Inbox\ideas",
    "00-Inbox\resources",
    "01-Projects\_templates",
    "01-Projects\_archive",
    "02-Knowledge\architecture",
    "02-Knowledge\patterns",
    "02-Knowledge\methodologies",
    "02-Knowledge\concepts",
    "02-Knowledge\guides",
    "02-Knowledge\code-snippets",
    "02-Knowledge\resources\articles",
    "02-Knowledge\resources\videos",
    "02-Knowledge\resources\prompts",
    "02-Knowledge\resources\tools",
    "03-Daily\_templates",
    "03-Daily\reviews",
    "04-System\dashboards",
    "04-System\templates",
    "04-System\automation",
    "04-System\meta"
)

foreach ($folder in $folders) {
    New-Item -Path "$vault\$folder" -ItemType Directory -Force
    # Crear README.md vacío en cada carpeta
    New-Item -Path "$vault\$folder\README.md" -ItemType File -Force
}

Write-Host "Estructura creada exitosamente en $vault"
```

**3. Instalar Plugins:**

```
Settings → Community Plugins → Browse
Buscar e instalar:
- Dataview
- Templater
- Quickadd
- Obsidian Git
- Local REST API
- Tasks (opcional)
- Calendar (opcional)
```

---

### Fase 1: Configuración de Plugins (60 min)

**Seguir configuraciones detalladas en sección "Configuración de Plugins" arriba.**

Orden recomendado:

1. ✅ Templater (base para templates)
2. ✅ Quickadd (captura rápida)
3. ✅ Dataview (dashboards)
4. ✅ Obsidian Git (backup)
5. ✅ Local REST API (automatización)

---

### Fase 2: Templates (45 min)

**Copiar todos los templates de este documento a `04-System/templates/`**

Archivos a crear:

- `quick-capture.md`
- `idea.md`
- `resource.md`
- `meeting.md`
- `daily-note.md`

En `01-Projects/_templates/`:

- `project.md`

En `02-Knowledge/architecture/`:

- `_template-adr.md`

En `03-Daily/_templates/`:

- `daily-note.md`
- `weekly-review.md`

---

### Fase 3: Dashboards (30 min)

**Copiar dashboards a `04-System/dashboards/`:**

- `main.md` (Dashboard principal)
- `projects.md`
- `tag-analytics.md`

**Configurar como startup:**

```
Settings → General → Default view
Seleccionar: "04-System/dashboards/main.md"
```

---

### Fase 4: Git Setup (30 min)

**1. Crear repositorio en GitHub:**

```
1. Ir a github.com
2. New Repository
3. Nombre: obsidian-vault-private
4. Private: ✅
5. NO añadir README, .gitignore, license
6. Create Repository
```

**2. Inicializar Git en vault:**

Ver comandos en sección "Configuración: Obsidian Git"

**3. Crear .gitignore:**

```gitignore
# Obsidian workspace (específico del dispositivo)
.obsidian/workspace.json
.obsidian/workspace-mobile.json

# Cache
.obsidian/cache

# Trash
.trash/

# System files
.DS_Store
Thumbs.db

# Plugins que se reinstalan
.obsidian/plugins/*/
!.obsidian/plugins/*/manifest.json
!.obsidian/plugins/*/main.js
```

**4. Primer commit:**

```bash
git add .
git commit -m "Initial vault structure with templates and dashboards"
git push -u origin main
```

---

### Fase 5: Validación (15 min)

**Checklist de validación:**

- [ ] Estructura de carpetas completa
- [ ] Todos los plugins instalados y habilitados
- [ ] Quickadd configurado y `Ctrl+Shift+N` funciona
- [ ] Templates disponibles en captura
- [ ] Dashboard main.md abre correctamente
- [ ] Dataview queries renderizan (pueden estar vacías)
- [ ] Git auto-commit funciona (esperar 10 min y verificar)
- [ ] Local REST API responde (curl test)

**Test de captura end-to-end:**

```
1. Presionar Ctrl+Shift+N
2. Selector aparece con 5 opciones
3. Elegir "1 - Quick Capture"
4. Escribir: "Test de sistema funcionando"
5. Enter
6. Verificar: Archivo creado en 00-Inbox/quick-captures/
7. Esperar 10 min
8. Verificar: Commit automático en Git
```

---

## 🤖 Integración con IA (Configuración Futura)

### Continue.dev Configuration

**Archivo:** `.continuerc.json` (en cada proyecto de código)

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
        "path": "C:/Users/{TU_USUARIO}/IA-Hub-Vault/02-Knowledge/architecture/*.md",
        "recursive": false
      }
    },
    {
      "name": "obsidian-methodologies",
      "description": "Filosofía y metodologías de desarrollo",
      "type": "file",
      "config": {
        "path": "C:/Users/{TU_USUARIO}/IA-Hub-Vault/02-Knowledge/methodologies/*.md",
        "recursive": false
      }
    },
    {
      "name": "obsidian-patterns",
      "description": "Code patterns y best practices",
      "type": "file",
      "config": {
        "path": "C:/Users/{TU_USUARIO}/IA-Hub-Vault/02-Knowledge/patterns/*.md",
        "recursive": false
      }
    }
  ],
  "customCommands": [
    {
      "name": "Explicar con Contexto",
      "prompt": "Explica este código considerando nuestros ADRs y patterns documentados en Obsidian. Referencia decisiones específicas si son relevantes. Responde en español.",
      "description": "Explicación context-aware"
    },
    {
      "name": "Sugerir Refactor",
      "prompt": "Analiza este código y sugiere refactoring basándote en patterns de nuestro codebase y ADRs. Mantén consistencia con la arquitectura existente. Responde en español pero el código en inglés.",
      "description": "Refactoring con contexto"
    }
  ],
  "systemMessage": "Eres mi asistente de programación personal. IMPORTANTE: Siempre responde en español castellano de España, con las siguientes excepciones:\n\n- El código siempre en inglés (variables, funciones, comentarios de código)\n- Términos técnicos sin traducción natural mantenerlos en inglés (ej: 'pull request', 'refactor', 'deploy')\n- Cuando cites documentación oficial, mantén el idioma original\n\nEstilo de respuesta:\n- Explicaciones claras en español\n- Tutea (usa 'tú' en lugar de 'usted')\n- Sé directo y pragmático\n- Usa ejemplos de código cuando sea relevante\n\nContexto: Tienes acceso a mis ADRs, patterns y metodología documentados en Obsidian. Refiérelos cuando sea relevante para mantener consistencia arquitectónica."
}
```

**Configurar rutas:**
Reemplazar `{TU_USUARIO}` con tu usuario real de Windows.

---

### n8n Workflows (Configuración Futura)

**Workflows a implementar:**

1. **Auto-Tagging** (Prioridad P0)
2. **Daily Note Generation** (Prioridad P1)
3. **Resource Summary** (Prioridad P1)
4. **Email → Tasks** (Prioridad P1)
5. **GitHub Integration** (Prioridad P2)

Estos se configurarán en Fase 1 de implementación (Semana 2).

---

## 📊 Frontmatter Standard por Tipo

### Reglas Generales

1. **Todos los frontmatters incluyen:**

   - `type`: Tipo de nota (obligatorio)
   - `tags`: Array de tags (puede estar vacío)

2. **Fechas siempre en ISO 8601:**

   - Fecha: `YYYY-MM-DD`
   - Timestamp: `YYYY-MM-DDTHH:mm:ss`

3. **Status fields consistentes:**

   - Usar: `unprocessed | processing | processed | archived`
   - O: `active | paused | completed | archived`

4. **Links en frontmatter:**

   - Formato: `[[path/to/file]]` o `[[path/to/file|alias]]`

5. **Arrays:**
   - Formato: `[item1, item2, item3]`
   - Tags: sin `#` en frontmatter

---

## 🎯 Mejores Prácticas

### Captura

1. **Usa el selector apropiado:**

   - ⚡ Quick: 1 línea, sin contexto
   - 💡 Idea: Concepto con explicación
   - 🔗 Resource: URL externa
   - ✅ Task: Acción específica
   - 📝 Meeting: Reunión con estructura

2. **No te preocupes por tags durante captura:**

   - Auto-tagging los añade después
   - Puedes añadir manualmente si quieres

3. **Captura primero, procesa después:**
   - No interrumpas flujo para organizar
   - Review semanal es suficiente

---

### Organización

1. **Folders = Contexto, Tags = Concepto:**

   - Folder: `01-Projects/finance-app/`
   - Tags: `#backend #api #performance`

2. **Una carpeta por proyecto activo:**

   - Archiva cuando complete
   - No tengas más de 5-7 proyectos activos simultáneamente

3. **Links bidireccionales:**
   - Crea links generosamente
   - No te preocupes por "contaminar"
   - Graph view mostrará conexiones

---

### Búsqueda

1. **Búsqueda rápida:**

   - `Ctrl+O`: Búsqueda fuzzy de archivos
   - `Ctrl+Shift+F`: Búsqueda global de contenido

2. **Búsqueda por tags:**

   - En search: `tag:#backend`
   - Combinar: `tag:#backend tag:#performance`

3. **Búsqueda Dataview:**
   - Usa dashboards para queries comunes
   - Crea queries custom cuando necesites

---

### Mantenimiento

1. **Procesar Inbox semanalmente:**

   - Domingos 30 minutos
   - Revisar quick-captures, ideas, resources
   - Decidir: implementar, mover a Knowledge, o descartar

2. **Review de proyectos mensual:**

   - Archivar completados
   - Pausar sin progreso >1 mes
   - Actualizar prioridades

3. **Limpieza de tags:**
   - Revisar tag analytics mensualmente
   - Consolidar tags redundantes
   - Actualizar auto-tag rules si es necesario

---

## 🔍 Queries Útiles de Dataview

### Query: Tasks Overdue por Proyecto

```dataview
TABLE
  file.link as "Task",
  due as "Vencimiento",
  date(today) - due as "Días Atraso"
FROM "01-Projects"
WHERE !completed AND due < date(today)
SORT due ASC
```

---

### Query: Notas Creadas Esta Semana

```dataview
LIST
FROM ""
WHERE file.ctime >= date(today) - dur(7 days)
SORT file.ctime DESC
```

---

### Query: ADRs por Proyecto

```dataview
TABLE
  status as "Estado",
  date as "Fecha",
  project as "Proyecto"
FROM "02-Knowledge/architecture"
WHERE type = "architecture-decision"
SORT date DESC
```

---

### Query: Ideas Sin Procesar (más de 1 semana)

```dataview
LIST
FROM "00-Inbox/ideas"
WHERE status = "unprocessed"
AND created < date(today) - dur(7 days)
SORT created ASC
```

---

### Query: Recursos por Topic

```dataview
TABLE
  url as "URL",
  captured as "Capturado",
  read as "Leído"
FROM "00-Inbox/resources"
WHERE contains(tags, "react")
SORT captured DESC
```

---

### Query: Progreso de Proyectos (Porcentaje)

```dataview
TABLE
  file.link as "Proyecto",
  length(file.tasks) as "Total",
  length(file.tasks.where(t => t.completed)) as "Completadas",
  round(length(file.tasks.where(t => t.completed)) / length(file.tasks) * 100) + "%" as "Progreso"
FROM "01-Projects"
WHERE status = "active" AND length(file.tasks) > 0
SORT length(file.tasks.where(t => !t.completed)) DESC
```

---

### Query: Meetings Esta Semana

```dataview
TABLE
  time as "Hora",
  attendees as "Asistentes",
  project as "Proyecto"
FROM "01-Projects" OR FROM "03-Daily/meetings"
WHERE type = "meeting"
AND date >= date(today) - dur(7 days)
SORT date DESC, time DESC
```

---

## 🚀 Workflows de Uso Diario

### Morning Routine (10 min)

```markdown
1. Abrir Obsidian → Dashboard main.md
2. Revisar "Tasks Vencen Hoy"
3. Revisar "Proyectos Activos" - estado
4. Abrir Daily Note (link desde dashboard)
5. Definir Top 3 Prioridades del día
6. (Opcional) Revisar agenda si hay meetings
```

---

### Durante el Día (ad-hoc)

**Captura:**

```
Idea surge → Ctrl+Shift+N → Selector → Capturar → Continuar trabajando
Tiempo: <10 segundos
```

**Anotación en Task:**

```
1. Buscar task en dashboard (Ctrl+O)
2. Abrir proyecto correspondiente
3. Añadir nota en sección de la task
4. Git auto-commit en background
```

**Buscar Info Pasada:**

```
1. Ctrl+Shift+F (búsqueda global)
2. O: Dashboard → Knowledge Map
3. O: Buscar por tag específico
```

---

### Evening Routine (10 min)

```markdown
1. Abrir Daily Note de hoy
2. Sección "Reflexiones":
   - ¿Qué funcionó bien?
   - ¿Qué mejorar?
   - Foco de mañana
3. Marcar tasks completadas
4. (Opcional) Quick scan de Inbox si >10 items
```

---

### Weekly Review (30 min - Domingos)

```markdown
1. Abrir Weekly Review (auto-generada o crear manual)
2. Revisar métricas de la semana
3. Procesar Inbox:
   - Quick-captures → Convertir a ideas/tasks o descartar
   - Ideas → Implementar, Knowledge, o archivar
   - Resources → Leer, catalogar, o descartar
4. Actualizar estado de proyectos
5. Definir objetivos para próxima semana
6. Git commit manual: "Weekly review W41"
```

---

## 📱 Consideraciones Mobile

### Git Sync en Mobile

**Opción A: Obsidian Mobile + Manual Sync**

1. Instalar Obsidian mobile
2. Instalar Obsidian Git plugin (mobile)
3. Configurar:
   - Auto-pull on startup: ✅
   - Auto-backup interval: 30 min (más largo que desktop)
   - Manual sync: Pull/Push buttons en command palette

**Uso:**

- Al abrir app: Auto-pull (trae cambios de desktop)
- Capturar notas normalmente
- Al cerrar app: Auto-commit/push

**Consideraciones:**

- Git en mobile es más lento (normal)
- Evitar editar misma nota en desktop+mobile simultáneamente
- Si hay conflicto: Git crea archivo `*-conflict.md` - resolver manual

---

**Opción B: Working Copy (iOS) + Obsidian**

1. Instalar Working Copy app
2. Clonar repo de vault
3. Obsidian mobile abre vault desde Working Copy
4. Sync manual via Working Copy (más control)

**Ventajas:**

- Git client robusto
- Mejor manejo de conflictos
- Más rápido que Obsidian Git mobile

**Contras:**

- Requiere app adicional (gratis con limitaciones)
- Un paso extra (abrir Working Copy para sync)

---

### Captura en Mobile

**Recomendado:** Obsidian Mobile con Quickadd configurado igual que desktop.

**Alternativa si fricción alta:**

- Telegram bot → n8n → Obsidian (configurar en Fase 2)

**Test en Fase 0:**

1. Instalar Obsidian mobile
2. Abrir vault (via Git clone o Obsidian Sync)
3. Probar captura rápida
4. Si tarda >30 segundos → considerar alternativa

---

## 🔧 Troubleshooting

### Problema: Quickadd no funciona

**Síntomas:** `Ctrl+Shift+N` no hace nada

**Soluciones:**

1. Verificar hotkey configurado: Settings → Hotkeys → buscar "Quickadd"
2. Verificar plugin habilitado: Settings → Community Plugins → Quickadd ✅
3. Verificar multi-choice creado: Settings → Quickadd → Debe aparecer "Captura"
4. Recargar Obsidian: Ctrl+R

---

### Problema: Dataview queries no renderizan

**Síntomas:** Dashboard muestra código en lugar de tabla

**Soluciones:**

1. Verificar plugin habilitado: Settings → Community Plugins → Dataview ✅
2. Verificar JavaScript habilitado: Settings → Dataview → Enable JS Queries ✅
3. Verificar sintaxis: No debe haber espacios extra en ```dataview
4. Recargar: Ctrl+R

---

### Problema: Git sync no funciona

**Síntomas:** Cambios no se commitean automáticamente

**Soluciones:**

1. Verificar plugin habilitado
2. Verificar interval configurado: Settings → Obsidian Git → 10 min
3. Verificar Git configurado: Abrir terminal en vault, `git status`
4. Verificar remote: `git remote -v` debe mostrar GitHub URL
5. Ver logs: Settings → Obsidian Git → View Logs

---

### Problema: Templates no aparecen en Quickadd

**Síntomas:** Selector muestra opciones pero no crea nota

**Soluciones:**

1. Verificar ruta de template correcta en Quickadd config
2. Verificar template existe: Buscar archivo en 04-System/templates/
3. Verificar sintaxis de template (frontmatter correcto)
4. Recrear choice en Quickadd

---

### Problema: Auto-tagging no funciona

**Síntomas:** Notas no reciben tags automáticamente

**Soluciones:**

1. Verificar n8n corriendo: Abrir http://localhost:5678
2. Verificar workflow activo en n8n
3. Verificar Ollama corriendo: `ollama list` en terminal
4. Verificar Local REST API activa: curl test
5. Ver logs en n8n workflow

---

### Problema: Dashboard carga lento

**Síntomas:** Dashboard tarda >10 segundos en renderizar

**Soluciones:**

1. Reducir número de queries complejas
2. Limitar queries con `LIMIT 20`
3. Evitar queries recursivas profundas
4. Considerar dividir en múltiples dashboards
5. Cachear queries complejas (Dataview JS)

---

## 📚 Recursos de Aprendizaje

### Obsidian Basics

- **Documentación oficial:** https://help.obsidian.md
- **Forum:** https://forum.obsidian.md
- **Discord:** https://discord.gg/obsidian

---

### Dataview

- **Documentación:** https://blacksmithgu.github.io/obsidian-dataview/
- **Examples:** https://s-blu.github.io/obsidian_dataview_example_vault/
- **Cheatsheet:** https://github.com/blacksmithgu/obsidian-dataview/blob/master/docs/docs/queries/query-types.md

---

### Templater

- **Documentación:** https://silentvoid13.github.io/Templater/
- **User Functions:** https://silentvoid13.github.io/Templater/user-functions/overview.html

---

### Quickadd

- **Documentación:** https://github.com/chhoumann/quickadd
- **Examples:** https://quickadd.obsidian.guide/

---

### Git con Obsidian

- **Obsidian Git Plugin:** https://github.com/denolehov/obsidian-git
- **Git Basics:** https://git-scm.com/book/en/v2

---

## 🎓 Próximos Pasos

### Después de Setup Inicial

1. **Crear primer proyecto de prueba:**

   ```
   - Usar template de proyecto
   - Añadir 3-5 tasks
   - Crear 1 meeting note
   - Verificar aparece en dashboard
   ```

2. **Capturar 10+ ideas en primera semana:**

   ```
   - Probar velocidad de captura
   - Verificar auto-tagging
   - Validar que aparecen en dashboard
   ```

3. **Escribir primer ADR:**

   ```
   - Documentar decisión sobre este sistema
   - ADR-001: "Obsidian como hub central"
   - Practicar formato ADR
   ```

4. **Crear methodology docs:**

   ```
   - coding-philosophy.md
   - response-style-ai.md
   - Documentar tu forma de trabajar
   ```

5. **Weekly review después de Semana 1:**
   ```
   - Evaluar fricción real
   - Ajustar workflows si necesario
   - Identificar pain points
   ```

---

### Semana 2: Auto-Tagging

1. **Setup n8n en Docker**
2. **Crear workflow de auto-tagging**
3. **Configurar Ollama prompt**
4. **Testear con 20+ notas**
5. **Ajustar reglas basándose en resultados**

---

### Semana 3-4: IA Integration

1. **Instalar Continue.dev en VSCode**
2. **Configurar context providers**
3. **Crear 3-5 ADRs de proyectos reales**
4. **Testear IA con contexto**
5. **Documentar qué funciona y qué no**

---

## ✅ Checklist de Implementación

### Pre-Implementación

- [ ] Obsidian instalado
- [ ] Vault location decidida
- [ ] GitHub account ready
- [ ] Ollama instalado (para Fase 2)
- [ ] Docker instalado (para n8n en Fase 2)

---

### Fase 0: Estructura Base

- [ ] Vault creado
- [ ] Estructura de carpetas completa
- [ ] READMEs en carpetas principales
- [ ] .gitignore configurado

---

### Fase 1: Plugins Core

- [ ] Dataview instalado y configurado
- [ ] Templater instalado y configurado
- [ ] Quickadd instalado y configurado
- [ ] Obsidian Git instalado y configurado
- [ ] Local REST API instalado (para futuro)

---

### Fase 2: Templates

- [ ] Templates en 04-System/templates/
- [ ] Template ADR en 02-Knowledge/architecture/
- [ ] Template daily en 03-Daily/\_templates/
- [ ] Templates testeados (crear nota de prueba con cada uno)

---

### Fase 3: Dashboards

- [ ] main.md dashboard creado
- [ ] projects.md dashboard creado
- [ ] tag-analytics.md dashboard creado
- [ ] Dataview queries renderizando correctamente
- [ ] Dashboard main.md como default view

---

### Fase 4: Git

- [ ] Repositorio GitHub creado (privado)
- [ ] Git inicializado en vault
- [ ] Remote configurado
- [ ] Primer commit realizado
- [ ] Auto-commit/push funcionando

---

### Fase 5: Validación

- [ ] Captura rápida funciona (Ctrl+Shift+N)
- [ ] Selector muestra 5 opciones
- [ ] Templates se aplican correctamente
- [ ] Dashboard responde "qué hacer hoy"
- [ ] Git auto-commit cada 10 min
- [ ] Sistema usable end-to-end

---

### Fase 6: Contenido Inicial

- [ ] Crear 1 proyecto de prueba
- [ ] Añadir 5+ tasks al proyecto
- [ ] Capturar 10+ ideas
- [ ] Crear 1 ADR (sobre el sistema mismo)
- [ ] Escribir coding-philosophy.md
- [ ] Daily note de hoy con reflexiones

---

### Fase 7: Mobile (Opcional Semana 1)

- [ ] Obsidian mobile instalado
- [ ] Vault synced via Git
- [ ] Captura mobile testeada
- [ ] Decisión: mobile workflow suficiente o necesita mejora

---

## 📊 Métricas de Éxito

### Semana 1

**Objetivo:** Sistema usable y cómodo

- [ ] Capturé 10+ ideas sin fricción
- [ ] Dashboard es mi punto de entrada diario
- [ ] Git backup automático funciona
- [ ] Velocidad de captura <10 segundos
- [ ] No perdí ninguna nota

---

### Semana 4

**Objetivo:** Hábito establecido

- [ ] 50+ notas en vault
- [ ] 3+ proyectos activos documentados
- [ ] Auto-tagging funcionando (80%+ precisión)
- [ ] Weekly review completada 4 veces
- [ ] Sistema se siente natural (no forzado)

---

### Mes 3

**Objetivo:** Sistema maduro

- [ ] 200+ notas interconectadas
- [ ] 10+ ADRs documentados
- [ ] IA usa mis ADRs en sugerencias
- [ ] Inbox processing toma <15 min semanal
- [ ] Encuentro info pasada en <30 segundos

---

## 🎯 Filosofía del Sistema

### Principios Fundamentales

**1. Captura > Organización**

- Mejor capturar mal que no capturar
- Organización puede ser después
- No pierdas ideas por perfeccionismo

**2. Pragmatismo > Pureza**

- No todos los ADRs tienen que ser perfectos
- Tags pueden ser inconsistentes al inicio
- Sistema evoluciona con uso, no con planning

**3. Uso > Features**

- Mejor 3 features que uses que 20 que no
- Añade complejidad solo si agrega valor real
- Si no lo usas en 1 mes, elimínalo

**4. Simplicidad > Sofisticación**

- Templates simples > complejos
- Queries básicas > avanzadas si hacen el trabajo
- Manual > automático si la automatización es frágil

**5. Iteración > Perfección**

- Implementa MVP
- Usa 1 semana
- Ajusta basándote en fricción real
- Repite

---

## 🔄 Proceso de Evolución

### Cuando Añadir Complejidad

**Solo añade nueva feature/automatización si:**

1. ✅ Resuelve fricción real experimentada 3+ veces
2. ✅ No hay solución manual más simple
3. ✅ Estás dispuesto a mantenerla
4. ✅ Tiempo ahorrado > tiempo de setup

**Ejemplos:**

❌ **No añadir:** Auto-clasificación de notas por proyecto

- **Razón:** Manual con tags es suficiente

✅ **Sí añadir:** Auto-tagging

- **Razón:** 50+ notas al mes sin tags = caos inevitable

❌ **No añadir:** Dashboard con 20 queries

- **Razón:** Slow loading, no lees todo

✅ **Sí añadir:** Dashboard con 5 queries clave

- **Razón:** Responde "qué hacer hoy" en 2 segundos

---

### Señales de que Algo No Funciona

**1. No lo usas:**

- Si pasan 2 semanas sin usar una feature → elimínala o simplifícala

**2. Fricción constante:**

- Si algo requiere >3 clicks o >30 segundos → rediseñar

**3. Mantenimiento pesado:**

- Si pasas más tiempo manteniendo el sistema que usándolo → simplificar

**4. Confusión:**

- Si dudas "¿dónde va esto?" frecuentemente → estructura poco clara

**5. Abandono:**

- Si vuelves a viejos hábitos (Notion, notas dispersas) → identificar por qué

---

## 📖 Glosario

**ADR:** Architecture Decision Record - Documento que registra una decisión arquitectónica

**Dataview:** Plugin que permite queries SQL-like sobre el vault

**Frontmatter:** Metadata YAML al inicio de nota markdown

**Quickadd:** Plugin para captura rápida con templates

**Templater:** Plugin para templates dinámicos con JavaScript

**Vault:** Carpeta que contiene todas las notas de Obsidian

**Wikilink:** Link interno formato `[[nota]]`

**Tag:** Etiqueta formato `#tag` para categorizar notas

**Dashboard:** Nota con queries de Dataview que funciona como panel de control

**Inbox:** Carpeta de entrada donde se captura todo inicialmente

---

## 📝 Notas Finales

### Este Documento

**Propósito:** Especificación completa para implementar el sistema Obsidian

**Uso:**

1. Leer completo una vez (entender visión general)
2. Usar como referencia durante implementación
3. Volver a secciones específicas cuando necesites

**Actualizar cuando:**

- Cambios mayores a estructura
- Nuevos plugins críticos
- Workflows que no funcionaron (documentar alternativas)
- Mejoras descubiertas durante uso

---

### Siguientes Documentos a Crear

**En próxima sesión:**

- `decisiones.md` - Primeros ADRs del sistema
- `implementacion-fase-0.md` - Guía paso a paso detallada

**Durante implementación:**

- `troubleshooting.md` - Problemas encontrados y soluciones
- `changelog.md` - Cambios al sistema

---

### Contacto y Soporte

**Si algo no está claro:**

- Revisar secciones relevantes de este doc
- Consultar documentación de plugins (links en Recursos)
- Iterar y ajustar basándote en tu uso real

**Recuerda:** Este sistema es TUYO. Ajústalo sin miedo.

---

## ✅ Resumen Ejecutivo

**Lo que tienes ahora:**

- Estructura completa de 4 carpetas principales
- 15+ templates listos para usar
- 3 dashboards funcionales
- Configuración de 5 plugins críticos
- Sistema de captura en 1 hotkey con 5 tipos
- Git backup automático configurado
- Filosofía de español pragmático
- Workflows para morning/evening/weekly routines

**Tiempo estimado de setup:**

- Fase 0-5: 3-4 horas
- Fase 6-7: 1-2 horas
- **Total:** 4-6 horas one-time

**Beneficio esperado:**

- Captura sin fricción: de 60s a 5s
- Dashboard como punto de entrada
- Búsqueda contextual efectiva
- Backup automático (nunca más pérdida de datos)
- Base para IA integration en Fase 2

**Próximo paso:**
Implementar Fase 0 siguiendo checklist paso a paso.

---

**Documento Version:** 1.0  
**Fecha:** 2025-10-07  
**Estado:** Completo y listo para implementación  
**Próxima revisión:** Después de Semana 1 de uso real
