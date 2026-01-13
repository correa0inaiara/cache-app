import { useEffect, useMemo, useState } from 'react'
import type { TipoLista } from '../types/lista'
import ContadorLikes from '../components/contador'
import CampoBusca from '../components/busca'
import ExibeLista from '../components/lista'
import Paginacao from '../components/paginacao'
import { BuscaDados } from '../services/buscaDados'
import { Cache } from '../services/cache'

export const Desafio02 = () => {
    const [termo, setTermo] = useState('')
    const [likes, setLikes] = useState(0)
    const [paginaAtual, setPaginaAtual] = useState(1)
    const [novaPagina, setNovaPagina] = useState(1)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const [numItensExibir, setNumItensExibir] = useState(15)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [dados, setDados] = useState<TipoLista>([])
    const [chave, setChave] = useState('')
    // const [dadosCache, setDadosCache] = useState<TipoLista>([])

    const servicoBuscaDados = new BuscaDados();
    const servicoCache = new Cache();

    useEffect(() => {
        console.log("useEffect chave")
        const _dadosCache = servicoCache.recuperar(chave)
        console.log('_dadosCache', _dadosCache)
        if (_dadosCache && _dadosCache.length > 0) {
            // setDadosCache(_dadosCache)
            carregarDados(_dadosCache)
        } else {
            // setDadosCache([])
            carregarDados([])
        }

    }, [chave])

    const carregarDados = async (_dados: TipoLista | []) => {
        console.log("carregarDados")
        try {
            setLoading(true)
            setError('')
            setDados([])

            let dados
            // console.log("dadosCache", dadosCache)
            if (_dados && _dados.length > 0) {
                console.log('dadosCache')
                setDados(_dados)
            } else {
                console.log('dados api')
                dados = await servicoBuscaDados.getDadosPorPagina(numItensExibir, novaPagina)
                setChave('dados_pagina_' + paginaAtual)
                servicoCache.salvar(chave, dados)
                setDados(dados)
            }
            let _totalPaginas = await servicoBuscaDados.getTotalDados()
            setTotalPaginas(Math.round(_totalPaginas / numItensExibir))
            setError(null)
        } catch (error) {
            setError('Erro ao carregar dados');
            console.error(error);
        } finally {
            setLoading(false)
        }

    }

    const handleAvancar = () => {
        console.log('handleAvancar')
        setNovaPagina(paginaAtual + 1)
        setPaginaAtual(novaPagina)
        setChave('dados_pagina_' + (paginaAtual + 1))
    }

    const handleVoltar = () => {
        console.log('handleVoltar')
        setNovaPagina(paginaAtual - 1)
        setPaginaAtual(novaPagina)
        setChave('dados_pagina_' + (paginaAtual - 1))
    }

    const handleNovaPagina = (numNovaPagina: number) => {
        console.log('handleNovaPagina')
        console.log('numNovaPagina', numNovaPagina)
        setNovaPagina(numNovaPagina)
        setPaginaAtual(numNovaPagina)
        setChave('dados_pagina_' + numNovaPagina)
    }

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
