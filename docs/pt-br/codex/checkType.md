### Módulo: `checkType`

#### Descrição

O módulo `checkType` é responsável por fornecer funções de verificação de tipo para facilitar a validação de dados em todo o sistema. Ele contém funções simples que verificam se um valor é do tipo esperado, ajudando a garantir que os dados sejam processados corretamente antes de serem utilizados nas operações do sistema.

#### Funções

- **isString(value)**: Verifica se o valor é uma string.

- **isFunction(value)**: Verifica se o valor é uma função.

- **isObject(value)**: Verifica se o valor é um objeto simples (não é uma array, não é nulo e é um objeto padrão).

- **isArray(value)**: Verifica se o valor é uma array.

- **isTrue(value)**: Verifica se o valor é um booleano `true`.

- **isFalse(value)**: Verifica se o valor é um booleano `false`.

- **isNumber(value)**: Verifica se o valor é um número (e não `NaN`).

- **isNumberPositive(value)**: Verifica se o valor é um número positivo ou zero.

- **isNull(value)**: Verifica se o valor é `null`.

#### Exemplo de Uso

```js
const checkType = require("./checkType");

if (checkType.isString("hello")) {
    console.log("É uma string!");
}

if (checkType.isNumberPositive(42)) {
    console.log("É um número positivo!");
}
```

#### Como Funciona

- As funções do módulo `checkType` são simples e diretas, utilizando o operador `typeof` para identificar o tipo básico dos valores, e realizando verificações adicionais quando necessário (como verificar se o valor não é um array ou `null`).
- O módulo centraliza essas funções em um objeto chamado `checkType`, tornando-as acessíveis de forma conveniente em outros módulos.
