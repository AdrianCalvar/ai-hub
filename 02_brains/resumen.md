# Resumen: Contexto del Proyecto IA Hub Personal

> **Última actualización:** 07 Octubre 2025  
> **Versión:** 1.0

---

## 🎯 Objetivo del Proyecto

Diseñar e implementar un ecosistema integrado de productividad personal que combine:

- Asistencia IA para desarrollo de software
- Sistema de gestión de conocimiento (second brain)
- Gestión de tareas y proyectos
- Automatización de workflows

**Meta:** Sistema que hace el trabajo diario MÁS FÁCIL, no más complejo.

---

## 👤 Perfil del Usuario

### Skills Técnicos

- **Lenguajes:** Java, JavaScript, TypeScript, React
- **Python:** Nivel básico
- **Experiencia:** Full-stack development
- **Herramientas actuales:**
  - **Notas:** Notion (alta fricción → poco uso real)
  - **Tareas:** GitHub Projects
  - **Obsidian:** Experiencia mínima, viene de Notion

### Hardware

- **RAM:** 32GB
- **GPU:** RTX 5070 Super (12GB VRAM)
- **Implicación:** Capacidad para ejecutar modelos de IA local (hasta 70B quantizados)

### Sistema Operativo

- **Windows 11**
- **Implicación:** Scripts en PowerShell/batch, atajos con AutoHotkey, Docker Desktop para containers

---

## 💰 Restricciones Presupuestarias

### Presupuesto

- **Adicional máximo:** 10-15€/mes
- **Preferencia:** €0 adicional

### Prioridad de Costes (NO NEGOCIABLE)

```
Gratuito > Open-source > Freemium > Pago
```

### Recursos Ya Disponibles

- **Claude Pro:** Ya pagado y activo
- **Obsidian:** Gratuito (ya en uso)
- **Hardware potente:** Permite IA local (ahorro de costes cloud)

---

## 🎨 Principios del Proyecto

### 1. Zero Friction in Daily Use

- Setup inicial complejo → Aceptable
- Uso diario complicado → Inaceptable
- El sistema debe "desaparecer" en el uso cotidiano

### 2. Coste-Consciente

- Siempre buscar alternativa gratuita primero
- Justificar explícitamente cualquier coste recurrente
- Aprovechar al máximo recursos existentes

### 3. Local-First

- Priorizar herramientas que funcionan offline
- Datos almacenados localmente
- Control total sobre información

### 4. Mantenibilidad

- Preferir simplicidad sobre features
- Evitar dependencias que requieren mantenimiento constante
- Sostenible a largo plazo para un solo usuario

### 5. Composabilidad

- Herramientas intercambiables
- Sin vendor lock-in
- Componentes que funcionan juntos pero no dependen unos de otros

---

## 📊 Estado Actual del Proyecto

### Fase: Discovery Inicial

**Descripción:** Explorando posibilidades, comparando opciones, sin decisiones firmes aún.

### Documentos Existentes

- ✅ `resumen.md` - Este documento (contexto estático)
- ✅ `instructions.md` - Metodología de trabajo
- 🟡 `discovery.md` - En construcción (exploración de opciones)
- ⚪ `decisiones.md` - Por crear cuando tomemos decisiones
- ⚪ `workflows.md` - Por crear, se intentará listar aquellos workflows que se quieren satisfacer
- ⚪ `ideas.md` - Por crear para capturar ideas ad-hoc

### Progreso

- [x] Definir objetivo y restricciones del proyecto
- [x] Establecer metodología de trabajo
- [ ] Completar discovery inicial de opciones
- [ ] Estructurar y plantear sistema
- [ ] Tomar decisiones arquitectónicas
- [ ] Implementar componentes core
- [ ] Refinar basándose en uso real

---

---

## 🏗️ Arquitectura Definida

### Stack Tecnológico Confirmado

**Capa de Interacción:**

- Obsidian (interface + storage)
- Claude Pro (reasoning manual)

**Capa de Orquestación:**

- Quickadd (macros + hotkeys)
- n8n (workflows automáticos) - Phase 1+

**Capa de Ejecución:**

- Claude Pro (decisiones complejas)
- Ollama (transformaciones automáticas)
  - llama3.3 70B-Q4 (reasoning)
  - deepseek-coder 16B (transformaciones)

**Capa de Estado:**

- Obsidian Vault (working directory)
- Git + GitHub (version control + backup)
- ChromaDB (semantic search) - Phase 2+

**Ref:** [[workflows.md#Arquitectura]] | [[ADR-003]]

---

## 🎯 Alcance del Sistema

### Módulos Core (Deben incluirse)

1. **Asistencia IA para desarrollo**

   - Copiloto de código
   - Asistencia en debugging
   - Pair programming

2. **Second Brain**

   - Gestión de notas
   - Sistema de enlaces y relaciones
   - Búsqueda potente

3. **Gestión de Tareas**

   - Sistema GTD o similar
   - Tracking de proyectos
   - Visualización de progreso

4. **Integración y Automatización**
   - Captura automática de información
   - Workflows entre herramientas
   - Reducción de trabajo manual

### Expansión Futura (Considerar en arquitectura, no priorizar ahora)

- Domótica (Home Assistant o similar)
- NAS y gestión de archivos
- Servidor para aplicaciones propias

**Criterio:** Arquitectura debe permitir expansión sin rediseño completo.

---

## 🚫 Anti-Objetivos

**Lo que este proyecto NO es:**

❌ Sistema enterprise para equipos grandes  
❌ Plataforma para compartir con otros usuarios  
❌ Reemplazo de herramientas que ya funcionan bien  
❌ Proyecto para aprender tecnologías por aprenderlas

**Lo que SÍ es:**

✅ Sistema pragmático para uso diario personal  
✅ Optimización de workflow actual  
✅ Solución de problemas reales experimentados  
✅ Inversión en productividad a largo plazo

---

## 🔄 Ciclo de Iteración

### Estructura de Sesiones

```
Sesión N: Discovery
  ↓
Sesión N+1: Estructuración
  ↓
Sesión N+2: Decisiones
  ↓
Sesión N+3: Implementación
  ↓
Sesión N+4: Refinamiento → Nueva iteración
```

### Estado Después de Cada Tipo de Sesión

**Post-Discovery:**

- Documentamos opciones en discovery.md
- Tenemos panorama de posibilidades
- Aún no decidimos nada

**Post-Estructuración:**

- Tenemos propuesta de arquitectura
- Componentes identificados
- Relaciones entre módulos claras

**Post-Decisiones:**

- Decisiones documentadas en decisiones.md
- Alternativas descartadas justificadas
- Path forward definido

**Post-Implementación:**

- Guías en implementacion.md
- Sistema parcial/completo funcional
- Troubleshooting documentado

---

## 📈 Criterios de Éxito

### A Corto Plazo (1 mes)

- Sistema básico funcional
- Workflow diario mejorado vs situación actual
- Zero fricción en tareas más frecuentes

### A Medio Plazo (3 meses)

- Múltiples módulos integrados
- Automatizaciones reduciendo trabajo manual
- Knowledge base creciendo orgánicamente

### A Largo Plazo (6-12 meses)

- Sistema "invisible" - funciona sin pensar
- Productividad medible mejorada
- Arquitectura permite expansiones futuras

---

## 🎓 Contexto Adicional

### Tooling de Desarrollo

- **IDEs:** VSCode, IntelliJ IDEA
- **APIs/Testing:** Postman
- **Databases:** MongoDB, Redis
- **Terminal:** Windows Terminal
- **WSDL:** Experiencia con servicios SOAP

### Experiencia con IA en Desarrollo

- **Claude Pro:** Principal herramienta (solo web, no API)
- **Experiencia previa:** GitHub Copilot, Cline (herramienta actual más usada)
- **Patrón de uso:** Conversaciones recurrentes explicando misma arquitectura/metodología

### Experiencia con Automatización

- **GitHub Actions:** Uso diario (consumo, no creación/modificación frecuente)
- **Scripts personales:** Experiencia mínima
- **Herramientas no-code:** Sin experiencia (no ha usado Zapier, IFTTT, n8n, etc.)

### Workflow Actual

**Gestión de Tareas:**

- GitHub Projects para tracking
- Problema: Tiende a crear tareas muy grandes en lugar de muchas pequeñas

**Gestión de Información:**

- Notion para notas e información
- **Problema crítico:** Alta fricción → apenas guarda información
- Resultado: Pérdida de conocimiento, repetición de explicaciones

**Gestión de Email:**

- Sin sistema de clasificación
- Emails acumulados sin procesar
- Información importante perdida en el ruido

**Code Reviews:**

- Proceso manual extenso
- Revisiones superficiales por falta de tiempo
- Sin automatización o asistencia

**Interacción con IA:**

- Conversaciones repetitivas con Claude Pro
- Re-explicar arquitectura y metodología frecuentemente
- No hay contexto persistente entre sesiones

### ¿Por Qué Este Proyecto?

**Problemas Específicos Identificados:**

1. **Fricción en captura de información**

   - Sistema actual (Notion) genera resistencia
   - Resultado: No documenta, pierde conocimiento

2. **Email sin gestionar**

   - Inbox desbordado
   - Información crítica perdida
   - Sin sistema de clasificación/priorización

3. **Falta de organización general**

   - Sin estructura clara para información
   - Dificultad para encontrar cosas después

4. **Repetición de contexto con IA**

   - Explica misma arquitectura/metodología múltiples veces
   - Sin memoria persistente entre conversaciones
   - Tiempo perdido re-contextualizando

5. **Code Reviews superficiales**

   - Falta de tiempo para reviews profundos
   - Proceso manual tedioso
   - Oportunidades de mejora perdidas

6. **Tareas mal dimensionadas**
   - Crea tareas demasiado grandes
   - Dificultad para tracking de progreso
   - Procrastinación por tamaño intimidante

**Objetivo del proyecto:** Resolver estos puntos de dolor con fricción mínima en uso diario.

---

## 📝 Notas de Actualización

### Cuándo Actualizar Este Documento

**Sí actualizar cuando:**

- Cambia hardware/software fundamental
- Cambia presupuesto disponible
- Cambia expertise técnico significativamente
- Cambian objetivos de alto nivel
- Cambia fase del proyecto

**No actualizar para:**

- Decisiones tecnológicas específicas → van a `decisiones.md`
- Detalles de implementación → van a `implementacion.md`
- Nuevas opciones exploradas → van a `discovery.md`
- Ideas sueltas → van a `ideas.md`

---

## 🎯 Para Próxima Sesión

### Estructura de Vault en Obsidian

- **Pendiente de definir en sesión dedicada**
- Usuario tiene idea en mente que estructurará posteriormente
- **Nota:** No concretar nada sobre estructura hasta esa sesión

### Próximos Pasos Posibles

- Continuar/completar discovery de opciones
- Estructurar propuesta de sistema
- Sesión específica para definir estructura de Obsidian
- Profundizar en soluciones para puntos de dolor específicos
- [Lo que el usuario decida]

## 📊 Estado Post-Discovery de Workflows

### Workflows Priorizados (Octubre 2025)

- **P0 (MVP):** 4 workflows identificados (ver workflows.md)
- **P1 (Segunda Ola):** 5 workflows
- **P2+:** 8 workflows adicionales

### Decisión Clave: Auto-Tagging en P0

Originalmente considerado P2, pero análisis reveló que es **infraestructura crítica**:

- Foundational para búsqueda y organización
- Debe implementarse antes de acumular notas sin clasificar
- Permite arquitectura emergente del sistema

### Mobile Strategy

- **Sync:** Git (no Obsidian Sync - decisión firme)
- **Capture:** Obsidian mobile primario, Telegram bot como fallback
- **Implementation:** Mes 2-3, después de MVP estable en PC

### Próximo Milestone

**Fase 0: Obsidian Foundation (Semana 1)**

- Crear estructura de vault
- Configurar plugins P0
- Templates funcionales
- Git sync automático
