---
description: "Guidelines for Nx workspace/monorepo development"
applyTo: "**"
---

# Nx Workspace/Monorepo Instructions

## Structure and Organization

### Naming Conventions
- **Apps**: Use kebab-case for application names (`web-app`, `mobile-app`, `api-gateway`)
- **Libs**: Use kebab-case followed by type (`shared-ui`, `feature-auth`, `data-access-user`)
- **Tags**: Use scope and type convention (`scope:shared`, `type:feature`, `type:util`)

### Directory Structure
```
apps/
  ├── web-app/
  └── api/
libs/
  ├── shared/
  │   ├── ui/
  │   ├── utils/
  │   └── types/
  ├── feature/
  │   ├── auth/
  │   └── dashboard/
  └── data-access/
      ├── user/
      └── products/
```

## Essential Nx Commands

### Code Generation
- **New application**: `nx g @nx/[framework]:app [app-name]`
- **New library**: `nx g @nx/[framework]:lib [lib-name] --directory=[scope]`
- **Component**: `nx g @nx/[framework]:component [component-name] --project=[lib-name]`
- **Service**: `nx g @nx/[framework]:service [service-name] --project=[lib-name]`

### Execution and Build
- **Serve application**: `nx serve [app-name]`
- **Build**: `nx build [app-name]`
- **Tests**: `nx test [project-name]`
- **Lint**: `nx lint [project-name]`

### Dependency Analysis
- **Dependency graph**: `nx graph`
- **Affected projects**: `nx affected:test`
- **Build affected**: `nx affected:build`

## Mandatory Practices

### Library Structure
1. **Categorization by type**:
   - `feature/*`: Libraries that implement specific functionalities
   - `shared/*`: Libraries shared between multiple projects
   - `data-access/*`: Libraries for data access and APIs
   - `ui/*`: Reusable interface components
   - `util/*`: Utilities and helper functions

2. **Index barrel exports**: Always create `index.ts` exporting public APIs
3. **Dependency tags**: Define tags in `project.json` for dependency control

### Configuration Files
- **nx.json**: Global configurations and plugins
- **project.json**: Project-specific configurations
- **workspace.json**: (legacy) Migrate to project.json when possible

### Dependency Constraints
```json
// nx.json
{
  "namedInputs": {
    "default": ["{projectRoot}/**/*", "sharedGlobals"],
    "production": ["default", "!{projectRoot}/**/*.spec.ts", "!{projectRoot}/tsconfig.spec.json"]
  },
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["production", "^production"]
    }
  }
}
```

## Import Patterns

### Relative vs Absolute Imports
- **Within same project**: Use relative imports
- **Between projects**: Use absolute imports with path mapping

### Path Mapping (tsconfig.base.json)
```json
{
  "compilerOptions": {
    "paths": {
      "@myorg/shared-ui": ["libs/shared/ui/src/index.ts"],
      "@myorg/feature-auth": ["libs/feature/auth/src/index.ts"],
      "@myorg/data-access-user": ["libs/data-access/user/src/index.ts"]
    }
  }
}
```

## Versioning Strategies

### Semantic Versioning
- Use `nx release` for automated versioning
- Configure `nx.json` with release strategies
- Keep CHANGELOG.md updated

### Tags and Releases
- Tag libs with `@nx/js:release` for publishing
- Use `independent` versioning for decoupled libs
- Configure registry for package publishing

## Performance and Optimization

### Cache and Distributed Task Execution
- Configure `nx.json` with `cacheableOperations`
- Use Nx Cloud for distributed cache
- Optimize inputs/outputs for better cache hit

### Bundle Analysis
- Use `nx bundle-analyzer` for bundle analysis
- Configure webpack-bundle-analyzer for apps
- Monitor shared libs size

## Testing Strategy

### Tests by Project Type
- **Apps**: e2e tests with Cypress/Playwright
- **Libs**: Unit tests with Jest
- **Shared libs**: High test coverage mandatory

### Test Commands
```bash
# Unit tests
nx test [project-name]

# e2e tests
nx e2e [app-name]-e2e

# Affected tests
nx affected:test

# Coverage
nx test [project-name] --coverage
```

## Migration and Upgrades

### Nx Migration
- Use `nx migrate` for automatic upgrades
- Always review migration.json before applying
- Test thoroughly after migrations

### Keeping Dependencies Updated
- Run `nx migrate latest` periodically
- Use `nx report` for diagnostics
- Keep plugins updated

## Avoid

### Anti-patterns
- ❌ Direct imports between projects (bypassing index.ts)
- ❌ Circular dependencies between libs
- ❌ Over-granular libs (overengineering)
- ❌ Apps with business logic (move to libs)
- ❌ Ignoring dependency constraints

### Inadequate Structure
- ❌ Putting everything in `shared/`
- ❌ Not using tags for dependency control
- ❌ Mixing responsibilities in one lib
- ❌ Not following naming conventions

## Debugging and Troubleshooting

### Useful Commands
```bash
# Check dependency graph
nx graph

# Analyze bundle
nx bundle-analyzer [app-name]

# Reset cache
nx reset

# Workspace information
nx report

# List projects
nx show projects

# View project configuration
nx show project [project-name]
```

### Common Issues
1. **Cache issues**: Use `nx reset` to clear cache
2. **Dependency cycles**: Use `nx graph` to identify
3. **Build failures**: Check `tsconfig.json` and paths
4. **Performance**: Analyze with `nx affected:dep-graph`

## Usage Examples

### Creating New Feature
```bash
# 1. Create feature lib
nx g @nx/react:lib feature-products --directory=feature

# 2. Create components
nx g @nx/react:component product-list --project=feature-products

# 3. Create data service
nx g @nx/react:lib data-access-products --directory=data-access

# 4. Configure tags in project.json
```

### New App Setup
```bash
# 1. Generate application
nx g @nx/react:app products-app

# 2. Configure e2e
nx g @nx/cypress:e2e products-app-e2e

# 3. Connect with existing libs
```

## CI/CD Integration

### GitHub Actions / Azure Pipelines
- Use `nx affected` to optimize builds
- Configure matrix builds for parallel projects
- Implement strategic caching
- Setup deployment per application

### Docker and Containerization
- Use multi-stage builds
- Optimize layers with nx build
- Configure workspace for containers
```
