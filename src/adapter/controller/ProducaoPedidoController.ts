import { IProducaoPedidoUseCases, ProducaoPedidoDTO, Situacao } from '../../modules/producao'
import { IProducaoPedidoController } from './interfaces/IProducaoPedidoController'

export class ProducaoPedidoController implements IProducaoPedidoController {
  constructor (
    readonly useCase: IProducaoPedidoUseCases
  ) {}

  async registraProducaoPedido (codigoPedido: number): Promise<ProducaoPedidoDTO> {
    return this.useCase.registraProducaoPedido(codigoPedido)
  }

  async obtemProducaoPedido (codigoPedido: number): Promise<ProducaoPedidoDTO> {
    return this.useCase.listaPedidoProducao(codigoPedido)
  }

  async ataulizaProducaoPedido (codigoPedido: number, status: Situacao): Promise<ProducaoPedidoDTO> {
    return this.useCase.atualizaProducaoPedido(codigoPedido, status)
  }
}
