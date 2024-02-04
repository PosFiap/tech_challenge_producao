import { ProducaoPedido } from "../model/ProducaoPedido";

export interface IRegistraProducaoPedido {
  registraProducaoPedido (codigoPedido: number): Promise<ProducaoPedido>
}
