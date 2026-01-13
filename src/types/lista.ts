export type TipoItem = {
    id: number
    nome: string
    categoria: string
}

export type TipoLista = TipoItem[]

export interface CacheItem {
    data: TipoLista
    expiraEm: number
    versao: string
}