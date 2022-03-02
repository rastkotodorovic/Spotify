import { useEffect } from "react"
import { signIn, useSession } from "next-auth/react"
import spotify from '../lib/spotify'

export default function useSpotify() {
    const { data: session, status } = useSession()

    useEffect(() => {
        if (session) {
            if (session.error === 'RefreshAccessTokenError') {
                signIn()
            }

            spotify.setAccessToken(session.user.accessToken)
        }
    }, [session])

    return spotify
}
