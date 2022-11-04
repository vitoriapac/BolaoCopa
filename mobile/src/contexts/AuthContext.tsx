import { createContext, ReactNode } from 'react'

interface UserProps {
  name: string
  avatarUrl: string
}

export interface AuthContextDataProps {
  user: UserProps
  signIn: () => Promise<void>
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthProviderProps) {
  async function signIn() {
    console.log('signIn called')
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user: {
          name: 'Luis Gilbert',
          avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/67.jpg'
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
