### Módulo: `tokens.js`

#### Descrição

O módulo `tokens.js` contém um objeto que mapeia tokens numéricos a seus respectivos valores e propriedades. Ele é usado para armazenar informações relacionadas aos tokens que representam comandos ou outras entidades dentro do sistema.

#### Funcionalidade

- **Armazenamento de Tokens**: O módulo mapeia tokens numéricos como chaves de um objeto, cada um associado a uma estrutura de dados contendo suas propriedades (como `n`).
- **Estrutura Imutável**: O objeto é congelado com `Object.freeze()`, garantindo que seus valores não possam ser alterados após a inicialização.

#### Exemplo de Uso

```js
const tokens = require('./tokens');

// Acessar as propriedades de um token específico
console.log(tokens[1].n); // 1
```

#### Como Funciona

- O módulo exporta um objeto contendo os tokens configurados, cada um com suas propriedades associadas.
- Como no módulo `commands.js`, esse objeto é congelado com `Object.freeze()` para garantir a imutabilidade dos dados, evitando modificações indesejadas.
