import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/roles-columns'
import { RolesDialogs } from './components/roles-dialogs'
import { RolesTable } from './components/roles-table'
import RolesProvider from './context/roles-context'
import { roleListSchema } from './data/schema'
import Api, { Role as ApiRole } from '@/lib/api'
import { toast } from 'sonner'

export default function Roles() {
  const [roles, setRoles] = useState<ApiRole[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRoles()
  }, [])

  async function fetchRoles() {
    setLoading(true)
    try {
      const response = await Api.getRoles()
      console.log('Fetching roles data...', response)
      if (response.data) {
        setRoles(response.data)
      }
    } catch (error: any) {
      console.error('Failed to fetch roles:', error)
      toast.error('Failed to load roles')
      setRoles([])
    } finally {
      setLoading(false)
    }
  }

  // Parse role list
  const roleList = roleListSchema.parse(roles)

  return (
    <RolesProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Roles & Permissions</h2>
            <p className='text-muted-foreground'>
              Manage role permissions and access control here.
            </p>
          </div>
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          {loading ? (
            <div className='flex items-center justify-center h-32'>
              <p className='text-muted-foreground'>Loading roles...</p>
            </div>
          ) : (
            <RolesTable data={roleList} columns={columns} />
          )}
        </div>
      </Main>

      <RolesDialogs onSuccess={fetchRoles} />
    </RolesProvider>
  )
}
