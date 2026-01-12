import { useEffect, useState } from 'react'
import './App.css'
import CampoBusca from './components/busca'
import ExibeLista from './components/lista'

export type TipoItem = {
    id: number
    nome: string
    categoria: string
}

export type TipoLista = TipoItem[]

function App() {
    const [lista, setLista] = useState<TipoLista>([])
    const [listaFiltrada, setListaFiltrada] = useState<TipoLista>([])

    const gerarLista = () => {
        let _lista: TipoLista = []
        for (let i = 0; i < 1000; i++) {
            let item: TipoItem = {
                id: (i + 1),
                nome: 'Nome ' + (i + 1),
                categoria: 'Categoria ' + (i + 1)
            }

            _lista.push(item)
        }
        setLista(_lista)
    }


    useEffect(() => {
        gerarLista()
    }, [])

    const handleFiltro = () => {
      
    }

  return (
    <>
      <CampoBusca onBuscar={handleFiltro} />
      <ExibeLista lista={lista} />
    </>
  )
}

export default App
