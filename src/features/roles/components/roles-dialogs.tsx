import { useRoles } from '../context/roles-context'
import { RolesEditDialog } from './roles-edit-dialog'
import { RolesViewDialog } from './roles-view-dialog'

interface Props {
  onSuccess?: () => void
}

export function RolesDialogs({ onSuccess }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useRoles()
  
  return (
    <>
      {currentRow && (
        <>
          <RolesViewDialog
            key={`role-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <RolesEditDialog
            key={`role-edit-${currentRow.id}`}
            open={open === 'edit'}
            onOpenChange={() => {
              setOpen('edit')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            onSuccess={onSuccess}
          />
        </>
      )}
    </>
  )
}
