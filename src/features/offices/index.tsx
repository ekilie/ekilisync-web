import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/offices-columns'
import { OfficesDialogs } from './components/offices-dialogs'
import { OfficesPrimaryButtons } from './components/offices-primary-buttons'
import { OfficesTable } from './components/offices-table'
import OfficesProvider from './context/offices-context'
import { officeListSchema } from './data/schema'
import Api, { Office as ApiOffice } from '@/lib/api'
import { toast } from 'sonner'

export default function Offices() {
  const [offices, setOffices] = useState<ApiOffice[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOffices()
  }, [])

  async function fetchOffices() {
    setLoading(true)
    try {
      const response = await Api.getOffices()
      console.log('Fetching offices data...', response)
      if (response.data) {
        setOffices(response.data.data || [])
      }
    } catch (error: any) {
      console.error('Failed to fetch offices:', error)
      toast.error('Failed to load offices')
      setOffices([])
    } finally {
      setLoading(false)
    }
  }

  // Parse office list
  const officeList = officeListSchema.parse(offices)

  return (
    <OfficesProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Offices</h2>
            <p className='text-muted-foreground'>
              Manage your offices and their locations here.
            </p>
          </div>
          <OfficesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          {loading ? (
            <div className='flex items-center justify-center h-32'>
              <p className='text-muted-foreground'>Loading offices...</p>
            </div>
          ) : (
            <OfficesTable data={officeList} columns={columns} />
          )}
        </div>
      </Main>

      <OfficesDialogs onSuccess={fetchOffices} />
    </OfficesProvider>
  )
}
