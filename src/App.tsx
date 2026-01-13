import { NavLink } from 'react-router'

export default function App() {
  return (
    <div className='min-h-screen flex flex-col items-center mt-20 p-5'>
      <p>Lista de Desafios relacionados à Cache com React</p>
      <ul className="flex gap-5 mt-5">
        <li><NavLink to="/desafio01" className="btn px-4 py-2 rounded-lg">Desafio 01</NavLink></li>
        <li><NavLink to="/desafio02" className="btn px-4 py-2 rounded-lg">Desafio 02</NavLink></li>
      </ul>
    </div>
  )
}
