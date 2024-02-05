import { ProducaoPedidoDTO } from '../dto'

export interface IRegistraProducaoPedido {
  registraProducaoPedido (codigoPedido: number): Promise<ProducaoPedidoDTO>
}
