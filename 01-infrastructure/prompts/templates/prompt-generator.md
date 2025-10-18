---
id: prompt-generator
version: 1.0
type: transformation
category: meta
tags: [prompting, llm, productivity]

# EXECUTION CONFIG
execution:
  preferred_runner: ollama # ollama | claude | any
  model: llama3.3 # solo si ollama/api
  max_tokens: 2000
  temperature: 0.7

# INPUT SCHEMA
input:
  - name: rough_idea
    type: text
    required: true
    description: "Idea no estructurada del prompt deseado"

  - name: target_model
    type: select
    options: [claude, gpt4, llama]
    default: claude
    description: "Modelo para el que optimizar"

# OUTPUT SCHEMA
output:
  format: markdown
  sections:
    - role_context
    - task_description
    - constraints
    - examples
    - output_format

# METADATA
persistence:
  save_execution: true # Guardar cada uso
  save_output: true # Guardar resultado
  output_path: "outputs/prompts/{{date}}-{{id}}.md"
---

# PROMPT CONTENT

You are an expert prompt engineer specializing in {{input.target_model}}.

Given this rough idea:
{{input.rough_idea}}

Generate a structured prompt following best practices:

1. **Role & Context**: Define the AI's expertise
2. **Task**: Clear, specific objective
3. **Constraints**: Boundaries and requirements
4. **Examples**: 2-3 demonstrations
5. **Output Format**: Expected structure

Output as markdown with clear sections.
