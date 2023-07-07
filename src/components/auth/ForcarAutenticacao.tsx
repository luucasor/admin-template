import Head from 'next/head'
import Image from 'next/image'
import loading from '@/../public/images/loading.gif'
import useAuth from '@/data/hook/useAuth'
import router from 'next/router'
import { cookieName } from '@/data/context/AuthContext'

export default function ForcarAutenticacao(props: any) {

    const { usuario, carregando } = useAuth()

    function renderizarConteudo() {
        return (
            <>
                <Head>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                if(!document.cookie?.includes(${cookieName})) {
                                    window.location.href = "/autenticacao"
                                }  
                            `
                        }}
                    />
                </Head>
                {props.children}
            </>
        )
    }

    function renderizarCarregando() {
        return (
            <div className={`
                flex justify-center items-center h-screen
            `}>
                <Image src={loading} alt=''/>
            </div>
        )
    }

    if(!carregando && usuario?.email) {
        return renderizarConteudo()
    } else if (carregando) {
        return renderizarCarregando()
    } else {
        router.push('/autenticacao')
        return null
    }
}