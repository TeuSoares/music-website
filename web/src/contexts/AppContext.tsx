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
  resetFields: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setResetFields: Dispatch<SetStateAction<boolean>>
}

export const AppContext = createContext<AppContextInterface>({
  isLoading: false,
  resetFields: false,
  setIsLoading: () => {},
  setResetFields: () => {},
})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [resetFields, setResetFields] = useState(false)

  return (
    <AppContext.Provider
      value={{ isLoading, resetFields, setIsLoading, setResetFields }}
    >
      {children}
    </AppContext.Provider>
  )
}
