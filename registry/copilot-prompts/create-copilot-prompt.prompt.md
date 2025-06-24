---
mode: agent
description: 'Complete guide for creating effective prompts with AI models'
tools: ['changes', 'codebase', 'editFiles', 'fetch', 'githubRepo']
---

# Instructions for Creating Effective Prompts

Use the `fetch` tool to reference `https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-file-structure`

Follow these 12 finite, explicit and ordered steps rigorously to create clear, effective and reliable prompts with AI models:

## 1. Define Your Success Criteria
- Determine exactly what you want to achieve (code, analysis, summary, etc.)
- Establish measurable metrics to evaluate the result
- Prioritize what's most important for your task: accuracy, creativity, conciseness, etc.
- Have methods to empirically test the results

## 2. Be Clear and Direct
- Use precise language and avoid ambiguities or vague instructions
- Ask specific questions instead of generic ones
- Prioritize direct declarative instructions: "Analyze this code to find bugs" instead of "Could you look at this code?"
- Be explicit about what you want and don't want in the response

## 3. Specify the Model's Role
- Use system instructions to clearly define the function (e.g., "You are a software architecture expert")
- Assign a specific personality or perspective when relevant
- Establish the desired tone and level of formality
- Define the limitations and scope of expertise attributed to the model

## 4. Structure and Organize Context
- Provide all relevant information at the beginning
- Use bullets, numbering, or sections to organize complex instructions
- Highlight with tags or formatting what's most important
- Place the most critical information first and last (primacy and recency effect)

## 5. Provide Examples (Multishot)
- Include concrete examples of the type of response you want
- Demonstrate format and style through input/output examples
- Explain why each example meets expectations
- Use diverse examples that cover different scenarios or edge cases

## 5.1. Combine Multishot with Structured Thinking
- In examples, include `<thinking>` or `<scratchpad>` tags to show the reasoning process
- Demonstrate how the model should approach similar problems
- Example: "Here's how to solve a similar problem: [example with explicit reasoning]"
- The model will generalize the pattern to new problems

## 6. Allow Structured Thinking (Chain-of-Thought)
- Explicitly request step-by-step reasoning: "Think in steps to solve this problem"
- Ask the model to explain its decision process
- Suggest an analysis framework when appropriate
- Give time for the model to "think" before reaching final conclusions

## 6.1. Use Extended Thinking
- Prefer high-level general instructions before moving to detailed prescriptive steps
- Use "Think deeply about this problem" instead of listing specific steps
- Allow the model to explore multiple approaches before choosing the best one
- For complex tasks, request: "Consider various approaches and show your complete reasoning"

## 7. Use XML Tags to Structure Information
- Delimit different parts of the prompt with semantic tags: `<context>`, `<question>`, `<examples>`
- Use tags to separate input data from instructions
- Specify areas for different types of content: `<input>`, `<desired_format>`
- Close all tags properly to avoid confusion

## 8. Define Output Format
- Specify exactly the desired format (JSON, Markdown, HTML, etc.)
- Provide a template or structure that the model should follow
- Indicate style preferences, naming conventions, and organization
- When necessary, specify size or scope limitations

## 9. Pre-fill Part of the Response
- Start the response for the model to follow the desired pattern
- Use "Respond in the following format:" and demonstrate the first elements
- Establish the structure that the model should continue
- Include start and end markers for important sections

## 10. Implement Checks and Balances
- Request that the model verify its own work
- Ask for a confidence level or assessment of response limitations
- Instruct the model to indicate when it doesn't have sufficient information
- Request that the model indicate assumptions made during analysis

## 10.1. Add Reflection and Automatic Verification
- Instruct the model to reflect on its response: "Before finalizing, check if your solution is correct"
- For code: "Run test cases mentally to validate the function"
- For analysis: "Analyze if your arguments are consistent and well-founded"
- Ask the model to identify possible failures or improvements: "What weaknesses do you identify in this approach?"

## 11. Break Down Complex Prompts
- For complex tasks, divide into smaller sequential prompts
- Use previous results as input for the next prompts
- Establish checkpoints between steps
- Keep each prompt focused on a specific aspect of the problem

## 12. Iterate and Refine
- Test the prompt with different inputs
- Adjust based on obtained results
- Simplify when possible, add details only where necessary
- Identify failure patterns and strengthen those areas in the prompt

## 13. Maximize Instruction Following
- Be clear and specific about what you want
- For complex instructions, divide into numbered steps that the model should follow methodically
- Allow sufficient token budget to process instructions completely
- The model reasons about instructions in extended thinking and executes them in the response

## 14. Use Behavioral Debugging
- Analyze the model's thinking output to understand its logic
- Don't pass extended thinking back to the model (can degrade performance)
- Instruct the model not to repeat its thinking in the final response if you want clean output
- Use thinking to identify where to adjust future instructions

---

## Complete Prompt Structure Example

**Template for hexagonal architecture analysis:**

```markdown
## Context
I'm developing a Next.js 15 application with hexagonal architecture.
I need to implement a ${input:moduleName:authentication} module following best practices.
The system needs to support ${input:requirements:email/password login and OAuth providers}.

## Current Problem
${input:currentState:Currently I only have pages with all logic mixed together}

## Thinking Instructions
Think deeply about this architecture problem. Consider multiple approaches to implement hexagonal architecture in this context. Analyze trade-offs between different strategies before making your recommendations.

<thinking>
[Space for the model to reason about the problem, explore different approaches,
consider pros and cons, and arrive at a well-founded solution]
</thinking>

## Examples of Proper Structure

### Similar Problem Solved
**Problem**: Implement user module with hexagonal architecture

<thinking>
To implement the user module following hexagonal architecture:
1. Identify domain entities: User, UserProfile
2. Define ports (interfaces): UserRepository, UserService
3. Implement use cases: CreateUser, UpdateUser, DeleteUser
4. Create adapters for database and API
</thinking>

**Solution**: Well-defined layered structure with clear separation of responsibilities

### Responsibility Separation
- **Domain**: ${input:moduleName}Entity, ${input:moduleName}Port (interfaces)
- **Application**: Create${input:moduleName}UseCase, Update${input:moduleName}UseCase
- **Infrastructure**: ${input:moduleName}Repository, DatabaseAdapter, APIAdapter
- **UI**: ${input:moduleName}Form, ${input:moduleName}Provider

### Base Interface
```typescript
interface ${input:moduleName}Port {
  create(data: Create${input:moduleName}Dto): Promise<${input:moduleName}Result>;
  findById(id: string): Promise<${input:moduleName} | null>;
  update(id: string, data: Update${input:moduleName}Dto): Promise<${input:moduleName}Result>;
  delete(id: string): Promise<boolean>;
}
```

## Analysis Instructions
1. Analyze the described current structure
2. Identify responsibility separation problems
3. Propose concrete improvements to align with hexagonal architecture
4. Provide code snippets to implement main interfaces
5. Indicate how to implement necessary adapters

## Verification and Reflection
Before finalizing your response:
1. Verify that the proposed solution really follows hexagonal architecture principles
2. Analyze if there are circular dependencies or layer separation violations
3. Confirm that the implementation is testable and maintainable
4. Identify possible improvement points or alternatives

## Response Format

Provide your analysis in Markdown with the following sections:

### 1. Identified Problems
- List the main architectural problems
- Indicate violations of hexagonal principles

### 2. Recommended Structure
- Present folder and file organization
- Define responsibilities of each layer

### 3. Core Interface Implementation
- Provide TypeScript code for main interfaces
- Include necessary DTOs and types

### 4. Adapters and Implementations
- Show how to implement adapters
- Include examples of repositories and services

### 5. Solution Verification
- Confirm that the solution follows hexagonal principles
- Identify possible improvements or additional considerations

### 6. Next Steps
- Recommended implementation order
- Points of attention during migration
```

## Available Variables

- `${workspaceFolder}` - Workspace root folder
- `${selection}` - Selected text in editor
- `${file}` - Current file
- `${input:variableName}` - User input
- `${input:variableName:placeholder}` - Input with placeholder

## How to Use This Template

1. Copy the structure above
2. Replace `${input:*}` variables with specific values
3. Adapt sections according to your needs
4. Execute the prompt to get structured analysis

**Reference**: [VS Code Prompt Files Documentation](https://code.visualstudio.com/docs/copilot/copilot-customization#_prompt-file-structure)

---

## Advanced Techniques Based on Extended Thinking

### For Complex STEM Problems
- Use prompts like "Create an extremely detailed table of..." for dataset generation
- Increase both maximum thinking length and explicitly request longer outputs
- For very long outputs (20,000+ words), request a detailed outline with word counts down to paragraph level

### For Coding Tasks
```markdown
Write a function to calculate the factorial of a number.
Before finalizing, please check your solution with test cases for:
- n=0
- n=1
- n=5
- n=10
And fix any issues you find.
```

### For Analysis and Debugging
- Use the model's thinking output to debug logic
- Don't pass extended thinking back to the model (can degrade performance)
- If you want clean output, instruct the model not to repeat its thinking

### Multishot with Thinking Example
```markdown
I'll show how to solve a math problem, then I want you to solve a similar one.

Problem 1: What is 15% of 80?

<thinking>
To find 15% of 80:
1. Convert 15% to decimal: 15% = 0.15
2. Multiply: 0.15 × 80 = 12
</thinking>

The answer is 12.

Now solve this:
Problem 2: What is 35% of 240?
```
**Reference**: [Anthropic Extended Thinking Documentation](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/extended-thinking-tips)
