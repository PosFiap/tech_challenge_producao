import { ProducaoPedidoOutDTO } from '../dto'

export interface IRegistraProducaoPedido {
  registraProducaoPedido (codigoPedido: number): Promise<ProducaoPedidoOutDTO>
}
