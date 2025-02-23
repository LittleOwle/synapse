### Módulo: `errorHandler.js`

#### Descrição

O módulo `errorHandler.js` é responsável por gerar mensagens de erro padronizadas. Ele utiliza um conjunto de mensagens pré-definidas para fornecer detalhes sobre erros que ocorrem durante a execução do sistema. Essas mensagens podem ser personalizadas com um identificador específico para rastrear a origem do erro.

#### Funcionalidade

- **Gerenciamento de Erros**: O módulo mapeia códigos de erro para mensagens descritivas, fornecendo uma descrição legível do erro que ocorreu.
- **Personalização de Identificador**: É possível personalizar o identificador que será incluído na mensagem de erro, permitindo a fácil identificação da origem do erro.
- **Estrutura Imutável**: O objeto de mensagens de erro é congelado com `Object.freeze()`, garantindo que seus valores não possam ser alterados em tempo de execução.

#### Exemplo de Uso

```js
const errorHandler = require('./errorHandler');

// Gerar uma mensagem de erro para um erro específico
console.log(errorHandler({ error: 1, id: 'synapse' }));
// Saída: [synapse] Error: Insufficient data
```

#### Como Funciona

- O módulo exporta uma função `errorHandler` que recebe um objeto com dados sobre o erro (código e identificador).
- A função verifica se o código de erro existe no mapeamento de mensagens e retorna a mensagem correspondente.
- Se o código de erro não for encontrado ou não for fornecido, uma mensagem padrão será retornada.
- O identificador fornecido é incluído na mensagem de erro para permitir o rastreamento mais preciso da origem do erro.
