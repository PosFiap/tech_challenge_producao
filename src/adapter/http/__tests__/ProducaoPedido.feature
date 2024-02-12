# language: pt

Funcionalidade: RotasProducaoPedido

  Cenario: Iniciar a produção ao receber o código do pedido
    Dado o código 1 do pedido
    Quando é iniciado a produção do pedido
    Então sistema devolve a produção criada com o codigo do pedido e status em "PREPARACAO"

  Cenario: Atualizar produção do pedido
    Dado o código 1 do pedido
    Quando a cozinha conclui a preparação
    Então atualiza a situação do pedido para "PRONTO"

  Cenario: Obter produção do pedido
    Dado o código 1 do pedido
    Quando é solicitado a produção de um pedido "PRONTO"
    Então o sistema informa dos dados da produção com o status atual "PRONTO"

  Cenario: Obter produção do pedido com um codigo invalido
    Dado o código invalido "asd" do pedido
    Quando é solicitado a produção de um pedido
    Então o sistema informa um erro sobre a invalidade do código "codigo de pedido inválido"

  Cenario: Produção de pedido não encontrada ao buscar
    Dado o código invalido 1 do pedido
    Quando é solicitado a produção de um pedido
    Então o sistema informa um erro "Produção de pedido não encontrada!"
