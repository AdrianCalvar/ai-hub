# Decisiones: IA Hub Personal

> Registro de Architecture Decision Records (ADRs)

---

## ADR-001: Git Sync Strategy (No Obsidian Sync)

**Fecha:** 2025-10-07  
**Estado:** Aceptada

### Contexto

Obsidian ofrece dos opciones de sync:

- Obsidian Sync (oficial, €8/mes)
- Git (manual/automático, gratis)

### Opciones Consideradas

A) Obsidian Sync: Seamless pero costo recurrente
B) Git + Obsidian Git plugin: Gratis pero requiere setup

### Decisión

**Git + Obsidian Git plugin**

### Razones

- Presupuesto: €0 adicional (crítico)
- Control: Backup off-site en GitHub
- Versioning: Historial completo de cambios
- Mobile: Aceptable friction con Git apps

### Consecuencias

**Positivas:**

- Costo cero
- Backup automático implícito
- Control total sobre datos

**Negativas:**

- Sync móvil requiere pasos extra
- Posibles conflictos si edición simultánea
- Setup inicial (one-time cost)

### Implementación

- Obsidian Git plugin configurado
- Auto-commit cada 10 min
- Auto-push cada hora
- Remote: GitHub repo privado

---

## ADR-002: Auto-Tagging as P0 Infrastructure

[Detalle completo...]

---

## ADR-003: Mobile Capture Method

[Detalle completo...]

---

## ADR-004: Continue.dev vs Cursor for IDE AI

[Detalle completo...]
