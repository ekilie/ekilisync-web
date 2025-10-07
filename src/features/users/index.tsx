import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/users-columns'
import { UsersDialogs } from './components/users-dialogs'
import { UsersPrimaryButtons } from './components/users-primary-buttons'
import { UsersTable } from './components/users-table'
import UsersProvider from './context/users-context'
import { userListSchema } from './data/schema'
import Api, { User as ApiUser } from '@/lib/api'
import { officeData } from '@/lib/api/authToken'
import { toast } from 'sonner'

export default function Users() {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const office = officeData()

  useEffect(() => {
    fetchUsers()
  }, [office?.id])

  async function fetchUsers() {
    if (!office?.id) {
      setLoading(false)
      return
    }
    
    setLoading(true)
    try {
      const response = await Api.getUsersByOffice(office.id)
      console.log('Fetching users data...', response)
      if (response.data) {
        // Transform API users to match the schema
        const transformedUsers = (response.data.data || []).map((user: ApiUser) => ({
          id: user.id,
          firstName: user.name.split(' ')[0] || user.name,
          lastName: user.name.split(' ').slice(1).join(' ') || '',
          username: user.email.split('@')[0],
          email: user.email,
          phoneNumber: 'N/A', // API doesn't provide phone
          status: 'active', // Default status
          role: user.role,
          createdAt: new Date(user.createdAt),
          updatedAt: new Date(user.updatedAt),
        }))
        setUsers(transformedUsers)
      }
    } catch (error: any) {
      console.error('Failed to fetch users:', error)
      toast.error('Failed to load users')
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  // Parse user list
  const userList = userListSchema.parse(users)

  return (
    <UsersProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>User List</h2>
            <p className='text-muted-foreground'>
              Manage your users and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          {loading ? (
            <div className='flex items-center justify-center h-32'>
              <p className='text-muted-foreground'>Loading users...</p>
            </div>
          ) : (
            <UsersTable data={userList} columns={columns} />
          )}
        </div>
      </Main>

      <UsersDialogs onSuccess={fetchUsers} />
    </UsersProvider>
  )
}
