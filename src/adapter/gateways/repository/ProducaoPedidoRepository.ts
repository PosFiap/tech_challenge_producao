import { PrismaClient, ProducaoPedido } from '@prisma/client'
import { IProducaoPedidoRepository, ProducaoPedidoDTO } from '../../../modules/producao'
import prisma from '../../../prisma/client'

export class ProducaoPedidoRepository implements IProducaoPedidoRepository {
  prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private serializeProducaoPedido (pp: ProducaoPedido): ProducaoPedidoDTO {
    return {
      codigoPedido: pp.codigo_pedido,
      situacao: pp.situacao
    }
  }

  async obtemProducaoPedido (codigoPedido: number): Promise<ProducaoPedidoDTO | null> {
    const producaoPedido = await this.prisma.producaoPedido.findUnique({
      where: { codigo_pedido: codigoPedido }
    })

    if (producaoPedido === null) return producaoPedido

    return this.serializeProducaoPedido(producaoPedido)
  }

  async registraProducaoPedido (producaoPedido: ProducaoPedidoDTO): Promise<ProducaoPedidoDTO> {
    const created = await this.prisma.producaoPedido.create({
      data: {
        codigo_pedido: producaoPedido.codigoPedido,
        situacao: producaoPedido.situacao
      }
    })

    return this.serializeProducaoPedido(created)
  }

  async atualizaProducaoPedido (producaoPedido: ProducaoPedidoDTO): Promise<ProducaoPedidoDTO> {
    const updated = await this.prisma.producaoPedido.update({
      where: {
        codigo_pedido: producaoPedido.codigoPedido
      },
      data: {
        situacao: producaoPedido.situacao
      }
    })

    return this.serializeProducaoPedido(updated)
  }
}
