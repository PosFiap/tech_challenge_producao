import { CustomError, CustomErrorType } from '../../utils'
import { ProducaoPedidoDTO } from './dto'
import { ProducaoPedido, Situacao } from './model/ProducaoPedido'
import { IProducaoPedidoRepository } from './ports/IProducaoPedidoRespository'
import { IProducaoPedidoUseCases } from './ports/IProducaoUseCases'

export class ProducaoPedidoUseCase implements IProducaoPedidoUseCases {
  constructor (
    private readonly repository: IProducaoPedidoRepository
  ) {}

  private serializeDTO (producaoPedido: ProducaoPedido): ProducaoPedidoDTO {
    return {
      codigoPedido: producaoPedido.codigoPedido,
      situacao: producaoPedido.situacao
    }
  }

  private serializeEntity (producaoPedido: ProducaoPedidoDTO): ProducaoPedido {
    return new ProducaoPedido(producaoPedido.codigoPedido, Object.keys(Situacao).indexOf(producaoPedido.situacao))
  }

  async registraProducaoPedido (codigoPedido: number): Promise<ProducaoPedidoDTO> {
    try {
      const producaoPedido = new ProducaoPedido(codigoPedido, Situacao.PREPARACAO)
      await this.repository.registraProducaoPedido(this.serializeDTO(producaoPedido))
      return this.serializeDTO(producaoPedido)
    } catch (error) {
      console.error(error)
      throw new CustomError(CustomErrorType.RepositoryUnknownError, 'Erro ao registrar uma produção de pedido!')
    }
  }

  async atualizaProducaoPedido (codigoPedido: number, status: Situacao): Promise<ProducaoPedidoDTO> {
    try {
      const producaoPedidoDTO = await this.repository.obtemProducaoPedido(codigoPedido)

      if (!producaoPedidoDTO) {
        throw new CustomError(
          CustomErrorType.RepositoryDataNotFound,
          'Produção de pedido não encontrada!'
        )
      }

      const producaoPedido = this.serializeEntity(producaoPedidoDTO)
      producaoPedido.atualizaStatus(status)

      const resultDTO = this.serializeDTO(producaoPedido)
      await this.repository.atualizaProducaoPedido(resultDTO)

      return resultDTO
    } catch (error) {
      console.error(error)
      throw new CustomError(CustomErrorType.RepositoryUnknownError, 'Erro ao atualizar produçõa de pedido!')
    }
  }

  async listaPedidoProducao (codigoPedido: number): Promise<ProducaoPedidoDTO> {
    try {
      const producaoPedidoDTO = await this.repository.obtemProducaoPedido(codigoPedido)

      if (!producaoPedidoDTO) {
        throw new CustomError(
          CustomErrorType.RepositoryDataNotFound,
          'Produção de pedido não encontrada!'
        )
      }

      return producaoPedidoDTO
    } catch (error) {
      console.error(error)
      throw new CustomError(CustomErrorType.RepositoryDataNotFound, 'Produção de pedido não encotrada!')
    }
  }
}
