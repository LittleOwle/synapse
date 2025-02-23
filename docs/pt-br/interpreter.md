## `interpreter.js`

O módulo `interpreter` é responsável por processar os dados recebidos, validar os comandos, e direcionar a execução para os neurons ou plugins apropriados. Ele realiza o tratamento de erros, validações de tipos e coordena a execução com base nos comandos fornecidos.

### Funcionalidades

#### 1. **Função `errorHandler(code, extra)`**
- **Objetivo**: Gerenciar e formatar as mensagens de erro.
- **Parâmetros**:
    - `code`: Código do erro (número). Caso seja um número positivo, será usado para buscar a mensagem de erro associada.
    - `extra`: Informação adicional sobre o erro (pode ser uma string ou um objeto).
- **Retorno**: Mensagem de erro formatada com o código e a descrição do erro.

#### 2. **Função `interpreter(data = {})`**
- **Objetivo**: Processar a entrada de dados, verificar se o comando existe, e executar a lógica apropriada (chamar neurons ou plugins).
- **Parâmetros**:
    - `data`: Objeto contendo informações sobre o comando (`cmd`), os dados de entrada (`input`), e informações sensoriais (`sensory`).
    - `data.request.cmd`: Comando a ser executado (deve ser uma string).
    - `data.request.input`: Dados de entrada para o comando (deve ser um array).
    - `data.sensory.workspace`: Caminho do diretório de trabalho.
    - `data.sensory.sinapse`: Caminho do diretório do sinapse.
- **Fluxo de Execução**:
    1. **Validação**:
        - O método verifica se `data`, `data.request`, e `data.sensory` são objetos válidos.
        - O comando `cmd` precisa ser uma string e `input` precisa ser um array.
    2. **Identificação de Plugin ou Comando**:
        - Se o comando (`cmd`) não estiver registrado em `cmds`, ele será tratado como um plugin.
        - Se o comando estiver registrado em `cmds`, o token será verificado. Caso o token não seja válido, um erro será lançado.
    3. **Execução de Plugin**:
        - Se o comando for identificado como um plugin, a função `plugins` será chamada com os dados necessários para carregar e executar o plugin.
        - Se o comando for válido mas não for um plugin, o módulo verifica o `token` e executa o `neuron` correspondente, passando os parâmetros necessários.
    4. **Execução de Neurons**:
        - Caso o comando esteja registrado em `cmds`, os parâmetros `n` e `action` do `token` são usados para identificar o neuron correto a ser executado.
- **Erros**:
    - Se qualquer validação falhar, ou se não for possível executar o comando corretamente, um erro é gerado e a execução é interrompida com a mensagem de erro correspondente.

#### 3. **Fluxo Geral**
1. O interpretador recebe a entrada de dados via `data`.
2. Ele valida a estrutura dos dados e identifica se o comando refere-se a um plugin ou a um neuron.
3. Se for um plugin, o interpretador tenta carregá-lo e executá-lo.
4. Se for um comando de neuron, o interpretador executa a lógica associada ao neuron.
5. Em caso de erro, ele gera uma mensagem apropriada e finaliza o processo.

### Erros Comuns Tratados
- `1`: Dados insuficientes.
- `2`: Comando não encontrado.
- `4`: Tipo inválido para `cmd` ou `input`.
- Outros erros relacionados a plugins e neurons são tratados com códigos específicos, gerando mensagens de erro detalhadas.

### Dependências
- **codex**: Contém definições de comandos, tokens, e funções auxiliares.
- **neurons**: Módulo que contém a lógica dos neurons a serem executados.
- **plugins**: Módulo responsável por carregar e executar plugins externos.
