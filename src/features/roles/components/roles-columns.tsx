import { ColumnDef } from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Role } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<Role>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Role Name' />
    ),
    cell: ({ row }) => {
      const name = row.getValue('name') as string
      return (
        <div className='flex items-center space-x-2'>
          <Badge variant='default' className='capitalize'>
            {name}
          </Badge>
        </div>
      )
    },
    meta: {
      className: 'w-48',
    },
  },
  {
    accessorKey: 'permissions',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Permissions' />
    ),
    cell: ({ row }) => {
      const permissions = row.getValue('permissions') as string[]
      return (
        <div className='flex flex-wrap gap-1'>
          {permissions.slice(0, 3).map((permission, index) => (
            <Badge key={index} variant='outline' className='text-xs'>
              {permission}
            </Badge>
          ))}
          {permissions.length > 3 && (
            <Badge variant='secondary' className='text-xs'>
              +{permissions.length - 3} more
            </Badge>
          )}
        </div>
      )
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as Date
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: 'updatedAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Updated' />
    ),
    cell: ({ row }) => {
      const date = row.getValue('updatedAt') as Date
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
