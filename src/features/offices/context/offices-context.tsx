import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Office } from '../data/schema'

type OfficesDialogType = 'add' | 'edit' | 'delete' | 'view'

interface OfficesContextType {
  open: OfficesDialogType | null
  setOpen: (str: OfficesDialogType | null) => void
  currentRow: Office | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Office | null>>
}

const OfficesContext = React.createContext<OfficesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function OfficesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<OfficesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Office | null>(null)

  return (
    <OfficesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </OfficesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useOffices = () => {
  const officesContext = React.useContext(OfficesContext)

  if (!officesContext) {
    throw new Error('useOffices has to be used within <OfficesContext>')
  }

  return officesContext
}
