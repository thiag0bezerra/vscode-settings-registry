---
mode: agent
description: 'Creator of .instructions.md files for VS Code Copilot'
tools: ['changes', 'codebase', 'editFiles', 'fetch']
---

# Custom Instructions Creator for VS Code

Use this prompt to create structured and effective `.instructions.md` files based on the official VS Code Copilot documentation.

Use the `fetch` tool with `https://code.visualstudio.com/docs/copilot/copilot-customization#_use-instructionsmd-files` to consult the official documentation.

## Input Parameters

### Basic Information
- **File name**: ${input:fileName:Example: react-components}
- **Description**: ${input:description:Brief description of the instructions}
- **Scope (applyTo)**: ${input:applyTo:Glob pattern like ** or src/**/*.ts}

### Instruction Type
- **Category**: ${input:category:Select: code-generation|test-generation|code-review|commit-message|documentation|general}
- **Technologies**: ${input:technologies:Ex: TypeScript, React, Node.js}
- **Framework/Library**: ${input:frameworks:Ex: Next.js, Express, Jest}

### Content
- **Main guidelines**: ${input:guidelines:List the main rules and practices}
- **Restrictions**: ${input:restrictions:What to avoid or not do}
- **Examples needed**: ${input:includeExamples:Yes|No}

## .instructions.md File Structure

### 1. Front Matter (Required)
```yaml
---
description: "${description}"
applyTo: "${applyTo}"
---
```

### 2. Instructions Body

#### Main Section
- Clear title indicating the purpose
- Application context
- Specific and actionable guidelines

#### Optional Sections
- **Mandatory Practices**: What to always do
- **Restrictions**: What to avoid
- **Examples**: Practical demonstrations
- **References**: Links to other instructions

## Glob Patterns for applyTo

### Common Examples:
- `**` - Apply to all requests
- `**/*.{ts,tsx}` - TypeScript/React files
- `src/**/*` - All files in src folder
- `**/*.test.{js,ts}` - Test files
- `**/*.md` - Documentation files
- `components/**/*.{ts,tsx}` - Specific components

## Templates by Category

### Code Generation
```markdown
---
description: "Guidelines for ${technologies} code generation"
applyTo: "${applyTo}"
---

# Code Generation Instructions - ${technologies}

## Fundamental Principles
- [List of principles based on technologies]

## Conventions
- Naming: [specific patterns]
- Structure: [code organization]
- Imports: [how to organize imports]

## Mandatory Practices
- [Technology-specific requirements]

## Avoid
- [Discouraged practices]
```

### Test Generation
```markdown
---
description: "Guidelines for test generation"
applyTo: "**/*.test.{js,ts}"
---

# Test Generation Instructions

## Testing Framework
- Use: ${frameworks}
- Structure: [organization pattern]

## Test Types
- Unit: [mandatory coverage]
- Integration: [necessary scenarios]
- E2E: [critical cases]

## Conventions
- File naming
- describe/it structure
- Expected assertions
```

### Code Review
```markdown
---
description: "Code review criteria"
applyTo: "**"
---

# Code Review Instructions

## Verification Points
- Compliance with project standards
- Quality and readability
- Performance and security
- Adequate testing

## Feedback
- Constructive and educational tone
- Specific suggestions
- Documentation references when applicable
```

## Quality Guidelines

### ✅ Do:
- Specific and actionable instructions
- Clear and direct language
- Concrete examples when necessary
- Precise glob patterns
- References to project standards

### ❌ Avoid:
- Vague or generic instructions
- Conflicts with other instructions
- References to specific external resources
- Multiple responsibilities in one file
- Ambiguous language

## Creation Process

1. **Context Analysis**: Determine scope and technologies
2. **Glob Pattern Definition**: Specify when to apply
3. **Guidelines Structuring**: Organize rules by priority
4. **Example Inclusion**: Add practical cases if necessary
5. **Validation**: Check for conflicts and clarity

## Output Format

Generate the complete `.instructions.md` file with:

### File Name
`${fileName}.instructions.md`

### Complete Structure
```markdown
---
description: "[Description based on parameters]"
applyTo: "[Specific glob pattern]"
---

# [Instructions Title]

## [Sections organized according to template]

[Structured content based on provided parameters]
```

## Location and Organization

### Workspace Instructions
- Location: `.vscode/copilot/instructions/`
- Scope: Current workspace only
- Versioning: Include in version control

### User Instructions
- Location: VS Code user profile
- Scope: All workspaces
- Synchronization: Via Settings Sync

## Final Validation

Before finalizing, check:
- [ ] Correct front matter with description and applyTo
- [ ] Valid and specific glob pattern
- [ ] Clear and actionable instructions
- [ ] No conflicts with existing instructions
- [ ] Correct Markdown format
- [ ] Relevant examples (if included)
- [ ] Specific language for mentioned technologies

---

**Reference**: [VS Code Custom Instructions Documentation](https://code.visualstudio.com/docs/copilot/copilot-customization#_use-instructionsmd-files)
