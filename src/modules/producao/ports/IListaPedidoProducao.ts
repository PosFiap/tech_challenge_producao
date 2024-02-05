import { ProducaoPedidoDTO } from '../dto'

export interface IListaProducaoPedido {
  listaPedidoProducao(codigoPedido: number): Promise<ProducaoPedidoDTO>
}
