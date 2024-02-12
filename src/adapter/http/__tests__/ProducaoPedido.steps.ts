import { defineFeature, loadFeature } from 'jest-cucumber'
import request from 'supertest'
import express from 'express'

import { prismaMock } from '../../../prisma/mockClient'
import { ProducaoPedidoHttp } from '../producaoPedido'
import { ProducaoPedidoRepository } from '../../gateways/repository/ProducaoPedidoRepository'
import { ProducaoPedidoUseCase } from '../../../modules/producao'
import { ProducaoPedidoController } from '../../controller/ProducaoPedidoController'
import { loggerExpress } from '../../../utils/LoggerFactory'

const app = express()
app.use(express.json())
app.use(loggerExpress())

const producaoRepository = new ProducaoPedidoRepository()
const producoUseCase = new ProducaoPedidoUseCase(producaoRepository)
const producaoController = new ProducaoPedidoController(producoUseCase)
const producaoPedidoHttp = new ProducaoPedidoHttp(producaoController)

app.use('/producao', producaoPedidoHttp.getRouter())

const feature = loadFeature('./ProducaoPedido.feature', {
  loadRelativePath: true
})

defineFeature(feature, (test) => {
  test('Iniciar a produção ao receber o código do pedido', ({ given, when, then }) => {
    let codigoPedido: number
    let result: any

    given(/^o código (\d+) do pedido$/, (codigo) => {
      codigoPedido = parseInt(codigo)
    })

    when('é iniciado a produção do pedido', async () => {
      prismaMock.producaoPedido.create.mockResolvedValueOnce({
        codigo_pedido: codigoPedido,
        situacao: 'PREPARACAO'
      })

      result = await request(app)
        .post('/producao/')
        .send({ codigoPedido })
        .set('Accept', 'application/json')

      expect(result.status).toBe(201)
      result = result.body
    })

    then(/^sistema devolve a produção criada com o codigo do pedido e status em "(.*)"$/, (status) => {
      expect(result.situacao).toBe(status)
      expect(result.codigoPedido).toBe(codigoPedido)
    })
  })

  test('Atualizar produção do pedido', ({ given, when, then }) => {
    let codigoPedido: number
    let result: any

    given(/^o código (\d+) do pedido$/, (codigo) => {
      codigoPedido = parseInt(codigo)
    })

    when('a cozinha conclui a preparação', async () => {
      prismaMock.producaoPedido.findUnique.mockResolvedValueOnce({
        codigo_pedido: codigoPedido,
        situacao: 'PREPARACAO'
      })

      prismaMock.producaoPedido.update.mockResolvedValueOnce({
        codigo_pedido: codigoPedido,
        situacao: 'PRONTO'
      })

      result = await request(app)
        .put(`/producao/${codigoPedido}`)
        .send({ situacao: 'PRONTO' })
        .set('Accept', 'application/json')

      expect(result.status).toBe(200)
      result = result.body
    })

    then(/^atualiza a situação do pedido para "(.*)"$/, (status) => {
      expect(result.situacao).toBe(status)
      expect(result.codigoPedido).toBe(codigoPedido)
    })
  })

  test('Obter produção do pedido', ({ given, when, then }) => {
    let codigoPedido: number
    let result: any

    given(/^o código (\d+) do pedido$/, (codigo) => {
      codigoPedido = parseInt(codigo)
    })

    when(/^é solicitado a produção de um pedido "(.*)"$/, async (status) => {
      prismaMock.producaoPedido.findUnique.mockResolvedValueOnce({
        codigo_pedido: codigoPedido,
        situacao: status
      })

      result = await request(app)
        .get(`/producao/${codigoPedido}`)
        .set('Accept', 'application/json')

      expect(result.status).toBe(200)
      result = result.body
    })

    then(/^o sistema informa dos dados da produção com o status atual "(.*)"$/, (status) => {
      expect(result.situacao).toBe(status)
      expect(result.codigoPedido).toBe(codigoPedido)
    })
  })

  test('Obter produção do pedido com um codigo invalido', ({ given, when, then }) => {
    let codigoPedido: any
    let result: any

    given(/^o código invalido "(.*)" do pedido$/, (codigo) => {
      codigoPedido = codigo
    })

    when('é solicitado a produção de um pedido', async () => {
      result = await request(app)
        .get(`/producao/${codigoPedido as string}`)
        .set('Accept', 'application/json')

      expect(result.status).toBe(400)
      result = result.body
    })

    then(/^o sistema informa um erro sobre a invalidade do código "(.*)"$/, (msg) => {
      expect(result.mensagem).toEqual(msg)
    })
  })

  test('Produção de pedido não encontrada ao buscar', ({ given, when, then }) => {
    let codigoPedido: number
    let result: any

    given(/^o código invalido (\d+) do pedido$/, (codigo) => {
      codigoPedido = parseInt(codigo)
    })

    when('é solicitado a produção de um pedido', async () => {
      prismaMock.producaoPedido.findUnique.mockResolvedValueOnce(null)

      result = await request(app)
        .get(`/producao/${codigoPedido}`)
        .set('Accept', 'application/json')

      expect(result.status).toBe(404)
      result = result.body
    })

    then(/^o sistema informa um erro "(.*)"$/, (msg) => {
      expect(result.mensagem).toEqual(msg)
    })
  })
})
