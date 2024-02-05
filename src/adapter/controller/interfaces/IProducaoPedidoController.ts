import { IProducaoPedidoUseCases, ProducaoPedidoDTO, Situacao } from '../../../modules/producao'

export interface IProducaoPedidoController {
  readonly useCase: IProducaoPedidoUseCases

  registraProducaoPedido (codigoPedido: number): Promise<ProducaoPedidoDTO>
  obtemProducaoPedido (codigoPedido: number): Promise<ProducaoPedidoDTO>
  ataulizaProducaoPedido (codigoPedido: number, status: Situacao): Promise<ProducaoPedidoDTO>
}
