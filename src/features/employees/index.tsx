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
import { User } from './data/schema'
import { useEffect, useState } from 'react'
import Api, { Employee } from '@/lib/api'
import { officeData } from '@/lib/api/authToken'
import Loader from '@/components/Loader'

// Map API Employee to local User schema
function mapApiEmployeeToLocalUser(apiEmployee: Employee): User {
  const firstName = apiEmployee.firstName || ''
  const lastName = apiEmployee.lastName || ''
  const username = apiEmployee.email.split('@')[0] || `${firstName}_${lastName}`.toLowerCase()
  
  return {
    id: apiEmployee.id,
    firstName,
    lastName,
    username,
    email: apiEmployee.email,
    phoneNumber: apiEmployee.phone || 'N/A',
    status: apiEmployee.status as any,
    role: 'employee' as any, // Employees don't have roles in the same way
    createdAt: new Date(apiEmployee.createdAt),
    updatedAt: new Date(apiEmployee.updatedAt),
  }
}

export default function Employees() {
  const [employees, setEmployees] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const office = officeData()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setIsLoading(true)
        if (office?.id) {
          const response = await Api.getEmployeesByOffice(office.id)
          const apiEmployees = Array.isArray(response) ? response : []
          const mappedEmployees = apiEmployees.map(mapApiEmployeeToLocalUser)
          setEmployees(mappedEmployees)
        }
      } catch (error) {
        console.error('Failed to fetch employees:', error)
        setEmployees([])
      } finally {
        setIsLoading(false)
      }
    }
    if (office?.id) {
      fetchEmployees()
    }
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
            <h2 className='text-2xl font-bold tracking-tight'>Employee List</h2>
            <p className='text-muted-foreground'>
              Manage your employees and their roles here.
            </p>
          </div>
          <UsersPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <UsersTable data={employees} columns={columns} />
        </div>
      </Main>

      <UsersDialogs />
    </UsersProvider>
  )
}
