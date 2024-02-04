import { ProducaoPedido } from "../model/ProducaoPedido";

export interface IListaProducaoPedido {
  listaPedidoProducao(codigoPedido: number): Promise<ProducaoPedido>
}
