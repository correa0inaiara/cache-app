import type { CacheItem, TipoLista } from "../types/lista"

export class Cache {
    private prefixo = 'app_cache_'
    private versaoCache = 'v1.0'

    salvar(chave: string, dados: TipoLista, minutos = 60): void {
        const item: CacheItem = {
            data: dados,
            expiraEm: Date.now() + minutos * 1000,
            versao: this.versaoCache
        }

        const nome = this.prefixo + chave

        localStorage.setItem(nome, JSON.stringify(item))
    }

    recuperar(chave: string): TipoLista | null {
        const nome = this.prefixo + chave
        const itemStr = localStorage.getItem(nome)

        if (!itemStr) return null

        try {
            const item: CacheItem = JSON.parse(itemStr)

            if (Date.now() > item.expiraEm) {
                this.remover(chave)
                return null
            }

            if (item.versao !== this.versaoCache) {
                this.remover(chave)
                return null
            }

            return item.data

        } catch (error) {
            this.remover(chave)
            return null
        }
    }

    remover(chave: string): void {
        const nome = this.prefixo + chave
        localStorage.removeItem(nome)
    }
}