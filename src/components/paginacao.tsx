import React from 'react'

interface PaginacaoProps {
    onAvancar: () => void
    onVoltar: () => void
    onNovaPagina: (numNovaPagina: number) => void
    totalPagina: number
}

export default function Paginacao({onAvancar, onVoltar, onNovaPagina, totalPagina}: PaginacaoProps) {

    const handleOnVoltar = () => {
        onVoltar
    }

    const handleOnAvancar = () => {
        onAvancar
    }

    const handleNovaPagina = (numNovaPagina: number) => {
        console.log(numNovaPagina)
        onNovaPagina(numNovaPagina)
    }

    let paginas = []
    for (let i = 0; i < totalPagina; i++) {
        paginas.push(
            <button 
                onClick={() => handleNovaPagina(i+1)} 
                className="join-item btn">{i + 1}</button>
        )
    }

  return (
        <div className="join flex flex-wrap justify-center gap-2">
            <button 
                onClick={handleOnVoltar} 
                className="join-item btn">Página anterior</button>
            { paginas }
            <button 
                onClick={handleOnAvancar}  
                className="join-item btn">Próxima página</button>
        </div>
  )
}
