import { Request, Response, Router } from 'express'
import { IHttpRoute } from './IRoute'
import { IProducaoPedidoController } from '../controller/interfaces/IProducaoPedidoController'
import { customErrorToResponse } from './error-parser'
import { CustomError, CustomErrorType } from '../../utils'
import { Situacao } from '../../modules/producao'

export class ProducaoPedidoHttp implements IHttpRoute {
  private readonly router: Router

  constructor (
    private readonly producaoPedidoController: IProducaoPedidoController
  ) {
    this.router = Router()
    this.setRoutes()
  }

  private async getProducaoPedido (req: Request, res: Response) {
    const codigoPedido = parseInt(req.params.codigoPedido)

    if (isNaN(codigoPedido)) {
      customErrorToResponse(new CustomError(
        CustomErrorType.BusinessRuleViolation,
        'codigo de pedido inválido'
      ), res)

      console.log('Erro is nan')

      return
    }

    try {
      const producaoPedido = await this
        .producaoPedidoController
        .obtemProducaoPedido(codigoPedido)

      res.status(200).json(producaoPedido)
    } catch (error) {
      if (error instanceof CustomError) {
        customErrorToResponse(error, res)
        return
      }

      res.status(500).json({
        mensagem: 'Falha ao obter produção do pedido'
      })
    }
  }

  private async iniciarProducaoPedido (req: Request, res: Response) {
    const codigoPedido = parseInt(req.body.codigoPedido)

    if (isNaN(codigoPedido)) {
      customErrorToResponse(new CustomError(
        CustomErrorType.BusinessRuleViolation,
        'codigo de pedido inválido'
      ), res)

      return
    }

    try {
      const producaoPedido = await this
        .producaoPedidoController
        .registraProducaoPedido(codigoPedido)

      res.status(201).json(producaoPedido)
    } catch (error) {
      if (error instanceof CustomError) {
        customErrorToResponse(error, res)
        return
      }

      res.status(500).json({
        mensagem: 'Falha ao registrar a produção do pedido'
      })
    }
  }

  private async atualizarProducaoPedido (req: Request, res: Response) {
    const codigoPedido = parseInt(req.params.codigoPedido)
    const situacao = parseInt(Situacao[req.body.situacao])

    if (isNaN(codigoPedido) || !situacao) {
      customErrorToResponse(new CustomError(
        CustomErrorType.BusinessRuleViolation,
        'verifique o codigo do pedido e a situação de atualização'
      ), res)

      return
    }

    try {
      const producaoPedido = await this
        .producaoPedidoController
        .ataulizaProducaoPedido(codigoPedido, situacao)

      res.status(200).json(producaoPedido)
    } catch (error) {
      if (error instanceof CustomError) {
        customErrorToResponse(error, res)
        return
      }

      res.status(500).json({
        mensagem: 'Falha ao atualizar produção do pedido'
      })
    }
  }

  private setRoutes () {
    this.router.post('/', this.iniciarProducaoPedido.bind(this))
    this.router.get('/:codigoPedido', this.getProducaoPedido.bind(this))
    this.router.put('/:codigoPedido', this.atualizarProducaoPedido.bind(this))
  }

  getRouter (): Router {
    return this.router
  }
}
