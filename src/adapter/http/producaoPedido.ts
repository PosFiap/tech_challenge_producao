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

      return
    }

    try {
      const producaoPedido = await this
        .producaoPedidoController
        .obtemProducaoPedido(codigoPedido)

      res.status(200).json(producaoPedido)
    } catch (error) {

    }
  }

  private async iniciarProducaoPedido (req: Request, res: Response) {
    const codigoPedido = parseInt(req.params.codigoPedido)

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

    }
  }

  private async atualizarProducaoPedido (req: Request, res: Response) {
    const codigoPedido = parseInt(req.params.codigoPedido)
    const situacao = Object.keys(Situacao).indexOf(req.body.situacao)

    if (isNaN(codigoPedido) || situacao < 10) {
      customErrorToResponse(new CustomError(
        CustomErrorType.BusinessRuleViolation,
        'verifique o codigo do pedido e o status de atualização'
      ), res)

      return
    }

    try {
      const producaoPedido = await this
        .producaoPedidoController
        .ataulizaProducaoPedido(codigoPedido, situacao)

      res.status(200).json(producaoPedido)
    } catch (error) {

    }
  }

  private setRoutes () {
    this.router.post('/', this.iniciarProducaoPedido)
    this.router.get('/:codigoPedido', this.getProducaoPedido)
    this.router.post('/:codigoPedido', this.atualizarProducaoPedido)
  }

  getRouter (): Router {
    throw new Error('Method not implemented.')
  }
}
