import { useEffect, useState } from "react"
import type { TipoItem, TipoLista } from "../App"

export default function CampoBusca({lista}: {lista: TipoLista}) {

    const [input, setInput] = useState('')
    const [itemEncontrado, setItemEncontrado] = useState<TipoItem>({} as TipoItem)

    const handleOnChange = (event: any) => {
        let value = event.target.value

        if (!value || value == '')
            return

        let _value = value.trim().toLowerCase()
        setInput(value)
        buscaItem(_value)
    }

    const buscaItem = (_value: string) => {
        for (const item of lista) {
            const nome = item.nome.trim().toLowerCase()
            const categoria = item.categoria.trim().toLowerCase()
            if (nome.includes(_value) || categoria.includes(_value))
                setItemEncontrado(item)
        }
    }

    return (
        <form action="">
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input 
                    value={input}
                    onChange={(e) => handleOnChange(e)}
                    type="search" 
                    required 
                    placeholder="Search" />
            </label>
        </form>
    )
}
