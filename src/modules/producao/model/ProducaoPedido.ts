import { CustomError, CustomErrorType } from '../../../utils'

export enum Situacao {
  PREPARACAO,
  PRONTO
}

export class ProducaoPedido {
  constructor (
    private readonly _codigoPedido: number,
    private _situacao: Situacao
  ) {}

  public get codigoPedido (): number {
    return this._codigoPedido
  }

  public get situacao (): string {
    return Situacao[this._situacao]
  }

  public atualizaStatus (novoStatus: Situacao): void {
    if (novoStatus !== this._situacao + 1) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'O status indicado não é válido para esse pedido')
    }

    this._situacao = novoStatus
  }
}
