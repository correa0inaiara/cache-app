import { useEffect, useMemo, useState } from 'react'
import type { TipoItem, TipoLista } from '../types/lista'
import ContadorLikes from '../components/contador'
import CampoBusca from '../components/busca'
import ExibeLista from '../components/lista'
import Paginacao from '../components/paginacao'
import { Servico } from '../services/servico'

export const Desafio02 = () => {
    // const [lista, setLista] = useState<TipoLista>([])
    const [termo, setTermo] = useState('')
    const [likes, setLikes] = useState(0)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [novaPagina, setNovaPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [totalItens, setTotalItens] = useState(0)
    const [numItensExibir, setNumItensExibir] = useState(10)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [dados, setDados] = useState<TipoLista>([])
    const servico = new Servico();

    const carregarDados = async () =>{
        try {
            setLoading(true)
            setError('')
            setDados([])
            const dados = await servico.getDadosPorPagina(numItensExibir, novaPagina)
            let _totalPaginas = await servico.getTotalDados()
            
            console.log('dados', dados)
            console.log('_totalPaginas', _totalPaginas)

            setTotalPaginas(Math.round(_totalPaginas / numItensExibir))
            setPaginaAtual(1)
            setTotalItens(dados.length)
            setDados(dados)
            setError(null)
        } catch (error) {
            setError('Erro ao carregar dados');
            console.error(error);
        } finally {
            setLoading(false)
        }

    }

    const handleAvancar = () => {

    }

    const handleVoltar = () => {
        
    }

    const handleNovaPagina = (numNovaPagina: number) => {
        console.log("handleNovaPagina")
        console.log('numNovaPagina', numNovaPagina)
        setNovaPagina(numNovaPagina)
    }

    useEffect(() => {
        carregarDados()
    }, [novaPagina])

    const handleClique = () => {
      setLikes(likes + 1)
    }

    const handleFiltro = (termoBusca: string) => {
      const termo = termoBusca.trim().toLowerCase()
      setTermo(termo)
    }

    const dadosFiltrados = useMemo(() => {
        return dados.filter(item => 
          item.nome.trim().toLowerCase().includes(termo) || 
          item.categoria.trim().toLowerCase().includes(termo)
        )
    }, [dados, termo])

  return (

    <div className='min-h-screen flex flex-col items-center justify-center p-5'>
      <ContadorLikes onClicar={handleClique} numLikes={likes} />
      <CampoBusca onBuscar={handleFiltro} />
      <ExibeLista 
        lista={dadosFiltrados}
      />
      <Paginacao 
        onAvancar={handleAvancar} 
        onVoltar={handleVoltar}
        onNovaPagina={handleNovaPagina}
        totalPagina={totalPaginas} 
      />
    </div>
  )
}

export default Desafio02
