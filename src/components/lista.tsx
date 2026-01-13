import type { TipoLista } from '../types/lista'
import ItemListaImg from './../assets/item-lista.png'

interface ExibeListaProps {
    lista: TipoLista
    loading: boolean
    error: string | null
}

export default function ExibeLista({lista, loading, error}: ExibeListaProps) {

    return (
        <ul className="list bg-base-100 rounded-box shadow-md">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ut necessitatibus deleniti vel mollitia aperiam nesciunt hic? Corrupti est dolorum quia, itaque sapiente minima exercitationem sequi sit odio error fuga?</li>
            {lista && lista.length > 0 ?
                lista.map((item) => (
                    <li key={item.id} className="list-row">
                        <div className="text-4xl font-thin opacity-30 tabular-nums">{item.id}</div>
                        <div>
                            <img 
                                className="size-10 rounded-box" 
                                src={ItemListaImg}
                            />
                        </div>
                        <div className="list-col-grow">
                            <div>{item.nome}</div>
                            <div className="text-xs uppercase font-semibold opacity-60">{item.categoria}</div>
                        </div>
                    </li>
                )) : 
                (
                    <li key="00">
                        <div className='flex justify-center mt-5 mb-5'>
                            {loading ? (
                                <span className="loading loading-spinner loading-md"></span>
                            ) : (error ? (
                                <div role="alert" className="alert alert-error">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )
                                : <p className='text-center'>Item não encontrado</p>
                            ) }
                        </div>
                    </li>
                )
            }
        </ul>
    )
}
