# Copilot Prompts

This directory contains reusable prompt templates for common development tasks using GitHub Copilot Chat. These prompt files enable you to standardize complex AI interactions and create consistent workflows across your projects.

## What You'll Find Here

Prompt templates (`.prompt.md`) that provide:

- **Code generation prompts**: Templates for creating components, functions, classes, and modules
- **Review and analysis prompts**: Standardized prompts for code reviews, security analysis, and performance evaluation
- **Documentation prompts**: Templates for generating README files, API documentation, and code comments
- **Testing prompts**: Prompts for creating unit tests, integration tests, and test scenarios
- **Refactoring prompts**: Templates for code optimization, modernization, and architectural improvements

## How Prompts Work

Prompt files are standalone, reusable chat prompts that can be invoked directly in VS Code's Chat view. They can include:

- Predefined context and instructions
- Variable placeholders for customization
- References to specific files or project structures
- Multi-step workflows for complex tasks

## Usage

1. Copy prompt files to your project's `.vscode/copilot/prompts/` directory
2. Invoke prompts in Chat view using `/prompt-name` syntax
3. Customize prompts with project-specific variables and context
4. Chain prompts together for comprehensive development workflows

Prompt files support metadata configuration to specify chat modes, tool usage, and execution context, making them powerful automation tools for common development scenarios.
