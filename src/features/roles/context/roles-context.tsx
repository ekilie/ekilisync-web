import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Role } from '../data/schema'

type RolesDialogType = 'view' | 'edit'

interface RolesContextType {
  open: RolesDialogType | null
  setOpen: (str: RolesDialogType | null) => void
  currentRow: Role | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Role | null>>
}

const RolesContext = React.createContext<RolesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function RolesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<RolesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Role | null>(null)

  return (
    <RolesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </RolesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useRoles = () => {
  const rolesContext = React.useContext(RolesContext)

  if (!rolesContext) {
    throw new Error('useRoles has to be used within <RolesContext>')
  }

  return rolesContext
}
