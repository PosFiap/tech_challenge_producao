import { ProducaoPedido } from '../model/ProducaoPedido'

export interface IProducaoPedidoRepository {
  obtemProducaoPedido(codigoPedido: number): Promise<ProducaoPedido>
  registraProducaoPedido(producaoPedido: ProducaoPedido): Promise<ProducaoPedido>
  atualizaProducaoPedido(producaoPedido: ProducaoPedido): Promise<ProducaoPedido>
}