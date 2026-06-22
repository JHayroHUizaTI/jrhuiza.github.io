---
name: project_context
description: Genera un resumen completo de la estructura y archivos clave del proyecto
---

# Skill: project_context

Este skill analiza la estructura del proyecto, lee archivos de configuración clave (como `package.json`) y genera un reporte detallado del contexto del proyecto en formato Markdown.

## Instrucciones de Uso

Para ejecutar el análisis del proyecto y generar el resumen:

1. Ejecuta el script de Python ubicado en `scripts/generate_context.py` desde la raíz del proyecto:
   ```bash
   python3 .agents/skills/project_context/scripts/generate_context.py
   ```
2. Guarda el resultado en un archivo de artefacto o imprímelo según sea necesario para orientarte en la estructura del proyecto.
