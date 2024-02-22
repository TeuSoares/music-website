'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

interface AppContextInterface {
  isLoading: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextInterface>({
  isLoading: false,
  setIsLoading: () => {},
})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AppContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </AppContext.Provider>
  )
}
