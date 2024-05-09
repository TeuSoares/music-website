'use client'

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from 'react'

interface DataForUpdate {
  id: number
  user_id: number
  artist: string
  genre: string
  name: string
  youtube_id: string
  thumbnail: string
}

interface AppContextInterface {
  dataToUpdate: DataForUpdate | undefined
  isLoading: boolean
  resetFields: boolean
  setIsLoading: Dispatch<SetStateAction<boolean>>
  setResetFields: Dispatch<SetStateAction<boolean>>
  setDataToUpdate: Dispatch<SetStateAction<DataForUpdate | undefined>>
}

export const AppContext = createContext<AppContextInterface>({
  dataToUpdate: undefined,
  isLoading: false,
  resetFields: false,
  setIsLoading: () => {},
  setResetFields: () => {},
  setDataToUpdate: () => {},
})

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [resetFields, setResetFields] = useState(false)
  const [dataToUpdate, setDataToUpdate] = useState<DataForUpdate | undefined>(
    undefined,
  )

  return (
    <AppContext.Provider
      value={{
        dataToUpdate,
        isLoading,
        resetFields,
        setIsLoading,
        setResetFields,
        setDataToUpdate,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
