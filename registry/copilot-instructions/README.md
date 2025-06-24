# Copilot Instructions

This directory contains custom instruction templates for GitHub Copilot that help tailor AI responses to specific coding practices, frameworks, and project requirements. These instructions are automatically applied to enhance code generation quality and consistency.

## What You'll Find Here

Custom instruction files (`.instructions.md`) that provide:

- **Framework-specific guidelines**: Instructions for popular frameworks like Next.js, React, TypeScript, and more
- **Best practice enforcement**: Coding standards, naming conventions, and architectural patterns
- **Language-specific rules**: Type safety guidelines, testing patterns, and code organization principles
- **Project context**: Documentation standards, error handling approaches, and performance considerations

## How Instructions Work

VS Code can automatically include these instructions in every chat request when properly configured. Instructions help Copilot understand your:

- Preferred coding style and conventions
- Technology stack and framework preferences
- Project-specific requirements and constraints
- Team standards and best practices

## Usage

1. Copy the appropriate instruction files to your project's `.vscode/copilot/instructions/` directory
2. Enable instruction files in your VS Code settings
3. Customize the instructions to match your specific project needs
4. Copilot will automatically apply these guidelines when generating code

Each instruction file includes metadata specifying which files or contexts it should apply to, allowing for granular control over when specific guidelines are used.
