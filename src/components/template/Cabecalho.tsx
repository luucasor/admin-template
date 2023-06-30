import useAppData from "@/data/hook/useAppData"
import BotaoAlternarTema from "./BotaoAlternarTema"
import Titulo from "./Titulo"

interface CabecalhoPros {
    titulo: string
    subtitulo: string
}
export default function Cabecalho(props: CabecalhoPros) {
    const { tema, alternarTema } = useAppData()
    return (
        <div className={`flex`}>
            <Titulo titulo={props.titulo} subtitulo={props.subtitulo}/>
            <div className={`flex flex-grow justify-end`}>
                <BotaoAlternarTema tema={tema} alternarTema={alternarTema}/>
            </div>
        </div>
    )
}