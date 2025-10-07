import { useOffices } from '../context/offices-context'
import { OfficesActionDialog } from './offices-action-dialog'
import { OfficesDeleteDialog } from './offices-delete-dialog'
import { OfficesViewDialog } from './offices-view-dialog'

interface Props {
  onSuccess?: () => void
}

export function OfficesDialogs({ onSuccess }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useOffices()
  return (
    <>
      <OfficesActionDialog
        key='office-add'
        open={open === 'add'}
        onOpenChange={() => setOpen('add')}
        onSuccess={onSuccess}
      />

      {currentRow && (
        <>
          <OfficesViewDialog
            key={`office-view-${currentRow.id}`}
            open={open === 'view'}
            onOpenChange={() => {
              setOpen('view')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <OfficesActionDialog
            key={`office-edit-${currentRow.id}`}
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

          <OfficesDeleteDialog
            key={`office-delete-${currentRow.id}`}
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
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
