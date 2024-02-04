import { ProducaoPedido, Situacao } from '../model/ProducaoPedido'

export interface IAtualizaProducaoPedido {
  atualizaProducaoPedido (codigoPedido: number, status: Situacao): Promise<ProducaoPedido>
}
