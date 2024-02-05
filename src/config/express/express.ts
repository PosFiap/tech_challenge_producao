import { Router } from 'express'
import { ProducaoPedidoHttp } from '../../adapter/http/producaoPedido'
import { ProducaoPedidoController } from '../../adapter/controller/ProducaoPedidoController'
import { ProducaoPedidoUseCase } from '../../modules/producao'
import { ProducaoPedidoRepository } from '../../adapter/gateways/repository/ProducaoPedidoRepository'

const router: Router = Router()

const producaoRepository = new ProducaoPedidoRepository()
const producoUseCase = new ProducaoPedidoUseCase(producaoRepository)
const producaoController = new ProducaoPedidoController(producoUseCase)
const producaoPedidoHttp = new ProducaoPedidoHttp(producaoController)

router.use('/health', (_req, res) => res.sendStatus(200))
router.use('/producao', producaoPedidoHttp.getRouter())

export { router }
