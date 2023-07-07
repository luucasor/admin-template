import router from 'next/router'
import firebase from '@/firebase/config'
import Usuario from '@/model/Usuario'
import { createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'

interface AuthContextProps {
    usuario?: Usuario | null
    loginGoogle?: () => Promise<void>
}

const AuthContext = createContext<AuthContextProps>({})

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
    const token = await usuarioFirebase.getIdToken()
    return {
        uid: usuarioFirebase.uid,
        nome: usuarioFirebase.displayName,
        email: usuarioFirebase.email,
        token,
        provedor: usuarioFirebase.providerData[0]?.providerId,
        imagemUrl: usuarioFirebase.photoURL
    }
}

function gerenciarCookie(logado: boolean) {
    const cookieName = 'admin-template-luucasor-auth'
    if(logado) {
        Cookies.set(cookieName, logado+"", {
            expires: 7
        })
    } else {
        Cookies.remove(cookieName)
    }
}

export function AuthProvider(props: any) {
    const [carregando, setCarregando] = useState(true)
    const [usuario, setUsuario] = useState<Usuario | null>(null)

    async function configurarSessao(usuarioFirebase: firebase.User | null) {
        if(usuarioFirebase?.email) {
            const usuario = await usuarioNormalizado(usuarioFirebase)
            setUsuario(usuario)
            gerenciarCookie(true)
            setCarregando(false)
            return usuario.email
        } else {
            setUsuario(null)
            gerenciarCookie(false)
            setCarregando(false)
            return false
        }
    }

    async function loginGoogle() {
        const resp = await firebase.auth().signInWithPopup(
            new firebase.auth.GoogleAuthProvider()
        )
        if(resp.user) {
            configurarSessao(resp.user)
            router.push('/')
        }
    }

    useEffect(() => {
        const cancelar = firebase.auth().onIdTokenChanged(configurarSessao)
        return () => cancelar()
    }, [])

    return (
        <AuthContext.Provider value={{
            usuario,
            loginGoogle
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext