import { IAtualizaProducaoPedido } from './IAtualizaPedidoProducao'
import { IListaProducaoPedido } from './IListaPedidoProducao'
import { IRegistraProducaoPedido } from './IRegistraPedidoProducao'

export interface IProducaoPedidoUseCases extends
  IRegistraProducaoPedido,
  IAtualizaProducaoPedido,
  IListaProducaoPedido {}
