### Módulo: `showHelp.js`

#### Descrição

O módulo `showHelp.js` é responsável por exibir informações de ajuda quando o usuário invoca o comando `synapse --help` ou `synapse -h` no terminal. Embora o módulo ainda esteja em desenvolvimento, ele fornecerá informações detalhadas sobre os comandos e opções disponíveis para o usuário, conforme os comandos forem sendo definidos.

#### Funcionalidade

- **Exibição de Ajuda**: Exibe uma mensagem de ajuda geral, contendo informações sobre o uso do sistema e os comandos disponíveis.
- **Estrutura Básica**: No momento, o módulo exibe um texto simples como um marcador de lugar, mas será expandido para mostrar detalhes específicos sobre os comandos conforme forem definidos.

#### Exemplo de Uso

Quando o usuário digita `synapse --help` ou `synapse -h` no terminal, o sistema invoca este módulo para exibir informações sobre o uso e os comandos disponíveis.

```bash
$ synapse --help
```

#### Como Funciona

- O módulo exporta uma função `showHelp` que, quando chamada, exibe informações de ajuda no terminal.
- Atualmente, a função exibe uma string simples, mas a ideia é que ela seja expandida para fornecer um manual completo sobre o sistema.
