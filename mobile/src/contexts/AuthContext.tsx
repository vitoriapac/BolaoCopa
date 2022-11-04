import { createContext, ReactNode, useState, useEffect } from 'react'
import * as Google from 'expo-auth-session/providers/google'
import * as AuthSession from 'expo-auth-session'
import * as WebBrowser from 'expo-web-browser'

WebBrowser.maybeCompleteAuthSession()

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  isUserLoading: boolean
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isUserLoading, setIsUserLoading] = useState(false)

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId:
      '737110997274-elhj3jccv4t488bl7pkpg41hl0fdrtt6.apps.googleusercontent.com',
    redirectUri: AuthSession.makeRedirectUri({ useProxy: true }),
    scopes: ['profile', 'email']
  })

  // console.log(AuthSession.makeRedirectUri({ useProxy: true }))

  async function signIn() {
    // console.log('signIn called')
    try {
      setIsUserLoading(true)
      await promptAsync()
    } catch (error) {
      console.log('Error: ' + error)
      throw error
    } finally {
      setIsUserLoading(false)
    }
  }

  async function signWithGoogle(access_token: string) {
    console.log('Token generated', access_token)
  }

  useEffect(() => {
    if (response?.type === 'success' && response.authentication?.accessToken) {
      signWithGoogle(response.authentication.accessToken)
    }
  }, [response])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        isUserLoading,
        user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
