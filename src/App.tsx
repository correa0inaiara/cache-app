import { useEffect, useMemo, useState } from 'react'
import './App.css'
import CampoBusca from './components/busca'
import ExibeLista from './components/lista'
import ContadorLikes from './components/contador'

export type TipoItem = {
    id: number
    nome: string
    categoria: string
}

export type TipoLista = TipoItem[]

function App() {
    const [lista, setLista] = useState<TipoLista>([])
    const [termo, setTermo] = useState('')
    const [likes, setLikes] = useState(0)

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

    const handleClique = () => {
      setLikes(likes + 1)
    }

    const handleFiltro = (termoBusca: string) => {
      const termo = termoBusca.trim().toLowerCase()
      setTermo(termo)
    }

    const listaFiltrada = useMemo(() => {
        return lista.filter(item => 
          item.nome.trim().toLowerCase().includes(termo) || 
          item.categoria.trim().toLowerCase().includes(termo)
        )
      }, [lista, termo])

  return (
    <>
      <ContadorLikes onClicar={handleClique} numLikes={likes} />
      <CampoBusca onBuscar={handleFiltro} />
      <ExibeLista 
        lista={listaFiltrada}
      />
    </>
  )
}

export default App
