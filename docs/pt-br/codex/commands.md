### Módulo: `commands.js`

#### Descrição

O módulo `commands.js` contém um objeto que mapeia comandos para seus respectivos tokens e descrições. Ele serve para armazenar e gerenciar os comandos do sistema, associando cada comando a um identificador único (`token`) e uma descrição breve que explica a funcionalidade ou a ação do comando.

#### Funcionalidade

- **Armazenamento de Comandos**: O módulo mapeia comandos como chaves de um objeto, cada um associado a um token numérico e uma descrição textual.
- **Estrutura Imutável**: O objeto é congelado usando `Object.freeze()`, garantindo que seus valores não possam ser alterados após a inicialização.

#### Exemplo de Uso

```js
const commands = require('./commands');

// Acessar um comando específico
console.log(commands["init"].token); // 1
console.log(commands["init"].desc);  // "create synapse initial structure"
```

#### Como Funciona

- O módulo exporta um objeto contendo os comandos configurados, cada um associado a um token numérico e uma descrição.
- Esse objeto é congelado com `Object.freeze()` para garantir que os dados não sejam modificados em tempo de execução, mantendo a integridade do sistema.
