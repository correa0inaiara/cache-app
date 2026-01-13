import type { TipoLista } from "../types/lista";
import dados from '../mock/dados.json'

const dadosMocados: TipoLista = dados as TipoLista

export class Servico {
    // simulação de delay da api
    private delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    async getDados(): Promise<TipoLista> {
        await this.delay(500)
        return [...dadosMocados]
    }

    async getDadosPorPagina(quantidade: number, pagina: number): Promise<TipoLista> {
        await this.delay(1500)
        
        let index
        let _quantidade
        if (pagina == 1) {
            index = 0
            quantidade = 10
            _quantidade = quantidade
        } else {
            _quantidade = quantidade * pagina
            index = _quantidade - quantidade
        }
        
        const dados = dadosMocados.slice(index, _quantidade)
        return [...dados]
    }

    async getTotalDados() {
        await this.delay(500)

        return dadosMocados.length
    }
}