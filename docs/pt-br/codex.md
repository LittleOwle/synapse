## `codex/index.js`

O módulo `codex` centraliza e gerência a importação de componentes essenciais para o funcionamento do sistema Sinapse. Ele fornece acesso a comandos, tokens, manipulador de erros, verificações de tipo e a funcionalidade de ajuda.

### Estrutura e Funcionalidade

- **Importação Dinâmica:**  
  O método `importMethod` tenta carregar dinamicamente os módulos internos do `codex`, garantindo que sejam objetos ou funções válidas antes de serem retornados.
- **Gerenciamento de Erros:**  
  Se a importação falhar ou o módulo não for encontrado, um erro é gerado usando `errorHandler`.
- **Objetos Expostos:**  
  O módulo exporta um objeto imutável (`Object.freeze`), garantindo que os componentes não possam ser modificados após a inicialização.

### Métodos e Propriedades

| Propriedade | Descrição                                                  |
|-------------|------------------------------------------------------------|
| `cmds`      | Contém a lista de comandos disponíveis no sistema.         |
| `tokens`    | Armazena os tokens associados aos comandos.                |
| `help`      | Fornece informações de ajuda ao usuário.                   |
| `errors`    | Manipulador central de erros do Sinapse.                   |
| `types`     | Conjunto de funções utilitárias para verificação de tipos. |

### Tratamento de Erros
Se um módulo não existir ou não for válido (nem objeto nem função), um erro é lançado no formato:
```
[codex] Error: Module does not exist : caminho/do/modulo.js
```

### Observações
- A função `importMethod` garante que apenas módulos válidos sejam carregados.
- `Object.freeze(index)` impede modificações no objeto exportado.
- Os comandos e tokens ainda podem ser expandidos sem necessidade de modificar a estrutura do `codex`.
