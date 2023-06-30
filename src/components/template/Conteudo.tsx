interface ConteudoPros {
    children?: any
}
export default function Conteudo(props: ConteudoPros) {
    return (
        <div className={`
            flex flex-col mt-7
            dark:text-gray-200
        `}>
            {props.children}
        </div>
    )
}