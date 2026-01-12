import { useState } from "react"

interface CampoBuscaProps {
    onBuscar: (termo: string) => void
}

export default function CampoBusca({onBuscar}: CampoBuscaProps) {

    const [termo, setTermo] = useState('')

    const handleOnChange = (event: any) => {
        let value = event.target.value
        setTermo(value)
        onBuscar(value)
    }

    return (
        <form action="">
            <label className="input">
                <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input 
                    value={termo}
                    onChange={(e) => handleOnChange(e)}
                    type="search" 
                    required 
                    placeholder="Search" />
            </label>
        </form>
    )
}
