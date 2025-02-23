### **Explicação dos Campos Obrigatórios**

#### **1. `workRoot`**
- **Descrição**: Define o diretório raiz onde os projetos serão organizados.
- **Exemplo**:
    - Padrão: `./workspaces`
    - Customizado: `./projects`, `./meus-projetos`, etc.
- **Uso**: O `synapse` usará esse diretório como base para encontrar e gerenciar os projetos.

#### **2. `workSpaces`**
- **Descrição**: Define os subdiretórios dentro do `workRoot` que contêm projetos.
- **Exemplo**:
    - Padrão: `["apps", "packages"]`
    - Customizado: `["frontend", "backend", "libs"]`, etc.
- **Uso**: Cada subdiretório listado em `workSpaces` será verificado em busca de projetos (pastas com `synapse.json`).

### **Template Padrão**
synapse.json
```json
{
  "plugins": "./plugins",
  "workRoot": "./workspaces",
  "workSpaces": [
    "apps",
    "packages"
  ]
}
```
#### **Campos do Template**
1. **`plugins`**:
    - Define o diretório onde os plugins do `synapse` serão armazenados.
    - Padrão: `./plugins`.

2. **`workRoot`**:
    - Define o diretório raiz dos projetos.
    - Padrão: `./workspaces`.

3. **`workSpaces`**:
    - Define os subdiretórios dentro do `workRoot` que contêm projetos.
    - Padrão: `["apps", "packages"]`.

### **Como o Synapse Funciona com Esses Campos**

1. **Estrutura de Diretórios**:
    - O `synapse` espera que os projetos estejam organizados da seguinte forma:
      ```
      <workspace>/
      ├── <workRoot>/
      │   ├── <workSpaces[0]>/ (ex: apps/)
      │   │   ├── projeto-1/
      │   │   │   └── synapse.json
      │   │   └── projeto-2/
      │   │       └── synapse.json
      │   └── <workSpaces[1]>/ (ex: packages/)
      │       ├── lib-1/
      │       │   └── synapse.json
      │       └── lib-2/
      │           └── synapse.json
      └── <plugins>/
          └── <plugin-1>/
              └── plugin.json
      ```

2. **Identificação de Projetos**:
    - O `synapse` considera um diretorio como um projeto se ela contiver um arquivo `synapse.json`.
    - Isso permite que projetos sejam criados e gerenciados.

3. **Flexibilidade**:
    - O usuário pode personalizar o `workRoot` e `workSpaces` para se adequar à sua estrutura de projetos.
    - Projetos podem ser organizados por categorias (ex: `apps`, `packages`, `frontend`, `backend`).

### **Exemplo de Uso**

#### **Estrutura de Diretórios**
```
monorepo/
├── workspaces/
│   ├── apps/
│   │   ├── app-1/
│   │   │   └── synapse.json
│   │   └── app-2/
│   │       └── synapse.json
│   └── packages/
│       ├── lib-1/
│       │   └── synapse.json
│       └── lib-2/
│           └── synapse.json
├── plugins/
│    └── hello-plugin/
│       ├── index.js
│       └── plugin.json
└── synapse.json
```
