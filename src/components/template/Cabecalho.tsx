import Titulo from "./Titulo"

interface CabecalhoPros {
    titulo: string
    subtitulo: string
}
export default function Cabecalho(props: CabecalhoPros) {
    return (
        <div>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo}/>
        </div>
    )
}