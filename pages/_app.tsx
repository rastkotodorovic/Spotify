import '../styles/globals.css'
import type {AppProps} from 'next/app'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil"
import Layout from "../components/layout/Layout"

function MyApp({ Component, pageProps: { session, ...pageProps }, ...appProps }: AppProps) {
    if (appProps.router.pathname === '/login') {
        return (
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
        )
    }

    return (
        <SessionProvider session={session}>
            <RecoilRoot>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </RecoilRoot>
        </SessionProvider>
    )
}

export default MyApp
