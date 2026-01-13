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

    /**
     * pagina 1
     * quantidade 10
     * index = 0, 10
     * 
     * pagina 2
     * quantidade 10
     * index = ((10 * 2) - 10), (10 * 2)
     * 
     * pagina 3
     * quantidade 10
     * index = ((10 * 3) - 10), (10 * 3)
     */

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
        
        console.log('index, pagina, quantidade, _quantidade', index, pagina, quantidade, _quantidade)
        const dados = dadosMocados.slice(index, _quantidade)
        console.log('dados', dados)
        return [...dados]
    }

    async getTotalDados() {
        await this.delay(500)

        return dadosMocados.length
    }
}