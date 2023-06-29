interface TituloPros {
    titulo: string
    subtitulo: string
}
export default function Titulo(props: TituloPros) {
    return (
        <div>
            <h1 className={`

            `}>
                {props.titulo}
            </h1>
            <h2 className={`
            
            `}>
                {props.subtitulo}
            </h2>
        </div>
    )
}