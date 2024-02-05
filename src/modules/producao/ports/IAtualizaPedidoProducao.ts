import { ProducaoPedidoDTO } from '../dto'
import { Situacao } from '../model/ProducaoPedido'

export interface IAtualizaProducaoPedido {
  atualizaProducaoPedido (codigoPedido: number, status: Situacao): Promise<ProducaoPedidoDTO>
}
