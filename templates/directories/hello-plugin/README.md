# Hello Plugin

Este é um plugin de exemplo para Synapse. Ele adiciona o comando `hello`.

## Como usar

Execute o comando:
```bash
pnpm synapse hello-plugin hello
```

1. **Adicionar o plugin**:
   ```bash
   pnpm synapse create-plugin
   ```
2. **Execute o comando do plugin**:
   ```bash
   pnpm synapse hello-plugin hello
   ```
Saída esperada:
```
Plugin loaded: hello-plugin (1.0.0)
Hello world! This is a Synapse plugin.
```

## `plugin.json`

O arquivo `plugin.json` é a configuração principal de um plugin no sistema Sinapse. Ele define metadados do plugin e informa qual arquivo e método devem ser executados ao chamá-lo.

### Estrutura do Arquivo

| Campo            | Tipo   | Obrigatório | Descrição |
|-----------------|--------|-------------|-----------|
| `name`         | string | Não         | Nome do plugin. Se não for fornecido, o nome da pasta do plugin será usado. |
| `version`      | string | Não         | Versão do plugin. Apenas para referência. |
| `description`  | string | Não         | Descrição do plugin. Apenas para referência. |
| `main.file`    | string | Sim         | Caminho do arquivo principal do plugin. Deve ter extensão `.js` ou `.cjs` e seguir o padrão CommonJS. |
| `main.method`  | string | Não         | Nome do método a ser chamado se o plugin exportar um objeto ao invés de uma função. |

### Exemplo de Arquivo `plugin.json`
```json
{
  "name": "hello-plugin",
  "version": "1.0.0",
  "description": "plugin description",
  "main": {
    "file": "index.js",
    "method": "hello"
  }
}
```

### Regras e Restrições
- O campo `main.file` **deve** apontar para um arquivo `.js` ou `.cjs` e ser compatível com CommonJS.
- Se o plugin exportar uma função diretamente, o campo `main.method` pode ser omitido.
- Se o plugin exportar um objeto, o campo `main.method` deve indicar qual método chamar.

### Exemplo de Implementação do Plugin
#### 1. Exportando uma Função Direta
Arquivo `index.js`:
```js
module.exports = (data) => {
    console.log("Hello from plugin!", data);
};
```
Arquivo `plugin.json` correspondente:
```json
{
  "main": {
    "file": "index.js"
  }
}
```
#### 2. Exportando um Objeto com Método
Arquivo `index.js`:
```js
module.exports = {
    hello: (data) => {
        console.log("Hello from method!", data);
    }
};
```
Arquivo `plugin.json` correspondente:
```json
{
  "main": {
    "file": "index.js",
    "method": "hello"
  }
}
```

### Observações
- Os campos `name`, `version` e `description` são opcionais e servem apenas para referência.
- Comentários no JSON são usados apenas para documentação interna e não fazem parte do formato JSON válido.
