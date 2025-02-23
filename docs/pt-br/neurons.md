## `neurons/index.js`

O módulo `neurons` é responsável por carregar e executar os "neurônios", que são unidades modulares associadas a tokens de comandos. Ele valida a existência e integridade de cada neurônio antes da execução.

### Estrutura e Funcionalidade

- **Carregamento de Neurônios (`loadNeuron`)**
  - Valida se o caminho fornecido é uma string válida.
  - Resolve o caminho absoluto do neurônio dentro do diretório `neurons`.
  - Verifica se o diretório e o arquivo `index.js` do neurônio existem.
  - Importa e retorna o neurônio caso seja uma função.
  - Se houver erro, encerra o processo exibindo a mensagem correspondente.

- **Manipulação de Erros (`errorHandler`)**
  - Retorna uma função que gera mensagens de erro formatadas.
  - Permite anexar detalhes extras sobre o erro.

- **Interpretação e Execução (`parse`)**
  - Obtém o neurônio correspondente ao token do comando.
  - Executa o neurônio passando os parâmetros necessários, incluindo a lógica de erro específica para cada neurônio.

### Métodos e Propriedades

| Método         | Descrição                                                                           |
|----------------|-------------------------------------------------------------------------------------|
| `loadNeuron`   | Carrega dinamicamente um neurônio com base no identificador (`n`).                  |
| `errorHandler` | Retorna uma função personalizada para manipulação de erros no contexto do neurônio. |
| `parse`        | Localiza, valida e executa o neurônio correspondente ao comando.                    |

### Tratamento de Erros

Caso ocorra um erro, a mensagem será formatada no padrão:
```
[neurons] Error: <mensagem do erro> : <detalhes>
```
Se o neurônio não existir:
```
[neurons] Error: Module does not exist : caminho/do/neuron
```
Se o caminho for inválido:
```
[neurons] Error: Insufficient data : needs path, received <tipo>
```

### Exemplo de Uso

Dentro do interpretador, um neurônio pode ser executado com:
```js
neurons({
    input: ["param1", "param2"],
    n: 1, 
    operation: "execute",
    codex: {types, errors},
    sensory: {workspace: "/caminho/do/workspace"}
});
```

### Observações

- A função `loadNeuron` só permite a execução de neurônios que sejam funções válidas.
- `Object.freeze(parse)` garante que a estrutura do módulo não seja alterada em tempo de execução.
- Cada neurônio recebe uma função personalizada de manipulação de erros, garantindo mensagens específicas e contextuais.
