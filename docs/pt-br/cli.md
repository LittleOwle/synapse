## `cli.js`

O módulo `cli.js` é o ponto de entrada da linha de comando para o aplicativo Sinapse. Ele é responsável por receber os comandos e dados do usuário, processá-los e invocar o interpretador para realizar a ação apropriada. Esse módulo é executado diretamente pela linha de comando quando o usuário chama o script `sinapse`.

### Funcionalidade

#### 1. **Processamento de Argumentos**
- O módulo começa determinando o diretório do Sinapse (`synapseDir`) e o diretório de trabalho atual (`workspaceDir`).
- O comando e os dados de entrada são extraídos dos argumentos passados pela linha de comando:
   - `token_request`: O comando (token) fornecido pelo usuário. Ele é o primeiro argumento (`process.argv.at(2)`).
   - `data_request`: Os dados adicionais (opcionais) fornecidos pelo usuário. São os argumentos subsequentes (`process.argv.slice(3)`).

#### 2. **Estrutura de Dados**
- **`request`**: Um objeto contendo as informações sobre o comando solicitado (`cmd`) e os dados de entrada (`input`):
   - `cmd`: Comando solicitado pelo usuário, geralmente o nome do plugin ou comando.
   - `input`: Dados associados ao comando (geralmente fornecidos pelo usuário como argumentos adicionais).
- **`sensory`**: Um objeto contendo informações sobre os diretórios:
   - `workspace`: O diretório de trabalho atual onde o comando está sendo executado.
   - `synapse`: O diretório onde o código do Sinapse está localizado.

#### 3. **Execução do Interpretador**
- O módulo `cli.js` invoca o interpretador, passando os objetos `request` e `sensory` como dados para o módulo `interpreter.js`.
- O interpretador processa o comando, executando a lógica associada ou chamando o plugin ou neuron apropriado.

### Fluxo de Execução
1. O usuário executa o script `sinapse` com um comando e possíveis dados adicionais.
2. O módulo `cli.js` captura os argumentos e os organiza em dois objetos: `request` (comando e dados) e `sensory` (informações de diretório).
3. O módulo invoca o `interpreter.js` com os objetos preparados.
4. O `interpreter.js` valida os dados e executa a ação correspondente (carregar plugin ou executar neuron).

### Exemplo de Uso

1. Para rodar um comando, o usuário pode executar o seguinte comando no terminal:
   ```
   sinapse <comando> <dados-adicionais>
   ```
   Exemplo do comando `init`:
    ```bash
   $ synapse init
   ```
   Exemplo do comando `create-plugin`:
   ```bash
   $ synapse create-plugin --name "myPluginName"
   ```

### Observações
- O arquivo `cli.js` é projetado para ser executado diretamente pelo terminal, funcionando como a interface principal para interagir com o sistema.
- O uso de `process.argv` permite que o usuário passe parâmetros diretamente na linha de comando.
