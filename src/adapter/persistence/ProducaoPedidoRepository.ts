import { PrismaClient, ProducaoPedido as ProducaoPedidoDb } from '@prisma/client'
import { IProducaoPedidoRepository } from '../../modules/producao'
import { ProducaoPedido, Situacao } from '../../modules/producao/model/ProducaoPedido'
import prisma from '../../prisma/client'

export class ProducaoPedidoRepository implements IProducaoPedidoRepository {
  prisma: PrismaClient

  constructor () {
    this.prisma = prisma
  }

  private serializeProducaoPedido (pp: ProducaoPedidoDb): ProducaoPedido {
    return new ProducaoPedido(pp.codigo_pedido, Object.keys(Situacao).indexOf(pp.situacao))
  }

  async obtemProducaoPedido (codigoPedido: number): Promise<ProducaoPedido | null> {
    const producaoPedido = await this.prisma.producaoPedido.findUnique({
      where: { codigo_pedido: codigoPedido }
    })

    if (producaoPedido === null) return producaoPedido

    return this.serializeProducaoPedido(producaoPedido)
  }

  async registraProducaoPedido (producaoPedido: ProducaoPedido): Promise<ProducaoPedido> {
    const created = await this.prisma.producaoPedido.create({
      data: {
        codigo_pedido: producaoPedido.codigoPedido,
        situacao: producaoPedido.situacao
      }
    })

    return this.serializeProducaoPedido(created)
  }

  async atualizaProducaoPedido (producaoPedido: ProducaoPedido): Promise<ProducaoPedido> {
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
