import type { TipoLista } from '../types/lista'
import ItemListaImg from './../assets/item-lista.png'

interface ExibeListaProps {
    lista: TipoLista
}

export default function ExibeLista({lista}: ExibeListaProps) {

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
                            <p className='text-center'>Item não encontrado</p>
                        </div>
                    </li>
                )
            }
        </ul>
    )
}
