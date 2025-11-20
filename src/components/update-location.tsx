import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@radix-ui/react-dialog'
import { IconMapPin } from '@tabler/icons-react'
import { toast } from 'sonner'
import Api, { OfficeCountResponse } from '@/lib/api'
import { officeData } from '@/lib/api/authToken'
import { Button } from '@/components/ui/button'
import { DialogHeader, DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'

const UpdateLocationDialog = () => {
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false)
  const [userLocation, setUserLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)

  const getUserLocation = () => {
    setIsGettingLocation(true)
    setLocationError(null)

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by this browser.')
      setIsGettingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
        setIsGettingLocation(false)
        toast.success('Location retrieved successfully!')
      },
      (error) => {
        let errorMessage = 'Unknown error occurred while getting location'

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }

        setLocationError(errorMessage)
        setIsGettingLocation(false)
        toast.error('Failed to get location')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    )
  }

  const handleUpdateLocation = () => {
    if (!userLocation) {
      toast.error('Please get your location first')
      return
    }

    console.log('Updating office location:', userLocation)

    toast.success('Office location updated successfully!')
    setIsLocationDialogOpen(false)

    // Reset states
    setUserLocation(null)
    setLocationError(null)
  }

  return (
    <Dialog open={isLocationDialogOpen} onOpenChange={setIsLocationDialogOpen}>
      <DialogTrigger asChild>
        <Button>Update Office Location</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] z-50'>
        <DialogHeader>
          <DialogTitle>Update Office Location</DialogTitle>
          <DialogDescription>
            Get your current location to update the office coordinates for
            attendance tracking.
          </DialogDescription>
        </DialogHeader>

        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <label htmlFor='latitude' className='text-right'>
              Latitude
            </label>
            <Input
              id='latitude'
              value={userLocation?.latitude || ''}
              className='col-span-3'
              placeholder='Latitude will appear here'
              readOnly
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <label htmlFor='longitude' className='text-right'>
              Longitude
            </label>
            <Input
              id='longitude'
              value={userLocation?.longitude || ''}
              className='col-span-3'
              placeholder='Longitude will appear here'
              readOnly
            />
          </div>

          {locationError && (
            <div className='col-span-4 rounded bg-red-50 p-2 text-sm text-red-500'>
              {locationError}
            </div>
          )}

          <div className='mt-4 flex justify-center'>
            <Button
              onClick={getUserLocation}
              disabled={isGettingLocation}
              className='flex items-center gap-2'
            >
              <IconMapPin className='h-4 w-4' />
              {isGettingLocation ? 'Getting Location...' : 'Get My Location'}
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant='outline'
            onClick={() => {
              setIsLocationDialogOpen(false)
              setUserLocation(null)
              setLocationError(null)
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateLocation}
            disabled={!userLocation || isGettingLocation}
          >
            Update Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateLocationDialog
