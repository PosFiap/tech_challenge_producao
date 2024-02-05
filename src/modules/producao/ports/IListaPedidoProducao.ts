import { ProducaoPedidoOutDTO } from '../dto'

export interface IListaProducaoPedido {
  listaPedidoProducao(codigoPedido: number): Promise<ProducaoPedidoOutDTO>
}
