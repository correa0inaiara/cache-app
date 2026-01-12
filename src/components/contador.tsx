interface ContadorLikesProps {
    onClicar: () => void,
    numLikes: number
}

export default function ContadorLikes({onClicar, numLikes}: ContadorLikesProps) {
  return (
    <button
        className="btn mb-5"
        onClick={onClicar}
    >Clicado {numLikes} vezes</button>
  )
}
