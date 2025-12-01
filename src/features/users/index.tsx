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
import { useEffect, useState } from 'react'
import Api, { User as ApiUser } from '@/lib/api'
import { officeData } from '@/lib/api/authToken'
import { User } from './data/schema'
import Loader from '@/components/Loader'

// Map API User to local User schema
function mapApiUserToLocalUser(apiUser: ApiUser): User {
  const nameParts = apiUser.name?.split(' ') || ['', '']
  const firstName = nameParts[0] || ''
  const lastName = nameParts.slice(1).join(' ') || ''
  
  return {
    id: apiUser.id,
    firstName,
    lastName,
    username: apiUser.email.split('@')[0] || apiUser.name,
    email: apiUser.email,
    phoneNumber: (apiUser as any).phoneNumber || 'N/A',
    status: 'active' as const,
    role: apiUser.role as any,
    createdAt: new Date(apiUser.createdAt),
    updatedAt: new Date(apiUser.updatedAt),
  }
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const office = officeData()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true)
        if (office?.id) {
          const response = await Api.getUsersByOffice(office.id)
          const apiUsers = response.data?.data || response.data || []
          const mappedUsers = apiUsers.map(mapApiUserToLocalUser)
          setUsers(mappedUsers)
        } else {
          // Fallback to all users if no office
          const response = await Api.getUsers()
          const apiUsers = response.data?.data || response.data || []
          const mappedUsers = apiUsers.map(mapApiUserToLocalUser)
          setUsers(mappedUsers)
        }
      } catch (error) {
        console.error('Failed to fetch users:', error)
        setUsers([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchUsers()
  }, [office?.id])

  if (isLoading) {
    return (
      <>
        <Header fixed>
          <Search />
          <div className='ml-auto flex items-center space-x-4'>
            <ThemeSwitch />
            <ProfileDropdown />
          </div>
        </Header>
        <Main>
          <Loader />
        </Main>
      </>
    )
  }

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
          <UsersTable data={users} columns={columns} />
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}
