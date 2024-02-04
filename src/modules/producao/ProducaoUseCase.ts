import { CustomError, CustomErrorType } from '../../utils'
import { ProducaoPedido, Situacao } from './model/ProducaoPedido'
import { IProducaoPedidoRepository } from './ports/IProducaoPedidoRespository'
import { IProducaoPedidoUseCases } from './ports/IProducaoUseCases'

export class ProducaoPedidoUseCase implements IProducaoPedidoUseCases {
  constructor (
    private readonly repository: IProducaoPedidoRepository
  ) {}

  async registraProducaoPedido (codigoPedido: number): Promise<ProducaoPedido> {
    try {
      const producaoPedido = new ProducaoPedido(codigoPedido, Situacao.PREPARACAO)
      await this.repository.registraProducaoPedido(producaoPedido)
      return producaoPedido
    } catch (error) {
      console.error(error)
      throw new CustomError(CustomErrorType.RepositoryUnknownError, 'Erro ao registrar uma produção de pedido!')
    }
  }

  async atualizaProducaoPedido (codigoPedido: number, status: Situacao): Promise<ProducaoPedido> {
    try {
      const producaoPedido = await this.repository.obtemProducaoPedido(codigoPedido)

      if (!producaoPedido) {
        throw new CustomError(
          CustomErrorType.RepositoryDataNotFound,
          'Produção de pedido não encontrada!'
        )
      }

      producaoPedido.atualizaStatus(status)

      await this.repository.atualizaProducaoPedido(producaoPedido)
      return producaoPedido
    } catch (error) {
      console.error(error)
      throw new CustomError(CustomErrorType.RepositoryUnknownError, 'Erro ao atualizar produçõa de pedido!')
    }
  }

  async listaPedidoProducao (codigoPedido: number): Promise<ProducaoPedido> {
    try {
      const producaoPedido = await this.repository.obtemProducaoPedido(codigoPedido)

      if (!producaoPedido) {
        throw new CustomError(
          CustomErrorType.RepositoryDataNotFound,
          'Produção de pedido não encontrada!'
        )
      }

      return producaoPedido
    } catch (error) {
      console.error(error)
      throw new CustomError(CustomErrorType.RepositoryDataNotFound, 'Produção de pedido não encotrada!')
    }
  }
}
