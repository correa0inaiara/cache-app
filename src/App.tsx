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

    const handleFiltro = (termoBusca: string) => {
      const termo = termoBusca.trim().toLowerCase()
      const filtrada = lista.filter(item => 
        item.nome.trim().toLowerCase().includes(termo) || 
        item.categoria.trim().toLowerCase().includes(termo)
      )

      if (filtrada.length == 0) {

      }

      setListaFiltrada(filtrada)
    }

  return (
    <>
      <CampoBusca onBuscar={handleFiltro} />
      <ExibeLista 
        lista={listaFiltrada.length > 0 ? listaFiltrada : lista} 
        mensagem={listaFiltrada.length == 0 ? 'Item não encontrado' : ''} />
    </>
  )
}

export default App
