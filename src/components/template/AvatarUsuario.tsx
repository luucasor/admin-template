import useAuth from "@/data/hook/useAuth";
import Link from "next/link";

interface AvatarUsuarioProps {
    className?: string
}

export default function AvatarUsuario(props: AvatarUsuarioProps) {
    const { usuario } = useAuth()
    console.log("imagemURL:", usuario?.imagemUrl)
    return (
        <Link href="/perfil">
            <img 
                src={usuario?.imagemUrl ?? '/images/avatar.svg'} 
                alt="Avatar do Usuário" 
                className={`
                    h-10 w-10 rouded-full cursor-pointer
                    ${props.className}
                `}
            />
        </Link>
    )
}