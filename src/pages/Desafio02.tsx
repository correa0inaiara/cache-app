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
    const [numItensExibir, setNumItensExibir] = useState(15)
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

            setTotalPaginas(Math.round(_totalPaginas / numItensExibir))
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
        setNovaPagina(paginaAtual + 1)
        setPaginaAtual(novaPagina)
    }

    const handleVoltar = () => {
        setNovaPagina(paginaAtual - 1)
        setPaginaAtual(novaPagina)
    }

    const handleNovaPagina = (numNovaPagina: number) => {
        setNovaPagina(numNovaPagina)
        setPaginaAtual(numNovaPagina)
    }

    useEffect(() => {
        carregarDados()
    }, [novaPagina, numItensExibir])

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

    const handleQuantidadeItensExibir = (quantidadeItensExibir: number) => {
        setNovaPagina(1)
        setPaginaAtual(1)
        setNumItensExibir(quantidadeItensExibir)
    }

  return (

    <div className='min-h-screen flex flex-col items-center justify-center p-5'>
      <ContadorLikes onClicar={handleClique} numLikes={likes} />
      <div className='flex items-center justify-center gap-5'>
        <CampoBusca onBuscar={handleFiltro} />
        <select defaultValue="Pick a color" className="select">
            <option disabled={true}>Exibir</option>
            <option onClick={() => handleQuantidadeItensExibir(15)}>15</option>
            <option onClick={() => handleQuantidadeItensExibir(25)}>25</option>
            <option onClick={() => handleQuantidadeItensExibir(50)}>50</option>
            <option onClick={() => handleQuantidadeItensExibir(75)}>75</option>
            <option onClick={() => handleQuantidadeItensExibir(100)}>100</option>
        </select>
      </div>
      <ExibeLista 
        lista={dadosFiltrados}
        loading={loading}
        error={error}
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
