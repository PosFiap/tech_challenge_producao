import { ProducaoPedidoDTO } from '../dto'

export interface IProducaoPedidoRepository {
  obtemProducaoPedido(codigoPedido: number): Promise<ProducaoPedidoDTO | null>
  registraProducaoPedido(producaoPedido: ProducaoPedidoDTO): Promise<ProducaoPedidoDTO>
  atualizaProducaoPedido(producaoPedido: ProducaoPedidoDTO): Promise<ProducaoPedidoDTO>
}
