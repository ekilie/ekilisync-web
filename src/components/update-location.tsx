import { useState } from 'react';
import { IconMapPin, IconMapPin2, IconMapPinFilled, IconCurrentLocation, IconCheck, IconLoader2 } from '@tabler/icons-react';
import { toast } from 'sonner';
import Api from '@/lib/api';
import { officeData, saveUser, userData } from '@/lib/api/authToken';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';


const UpdateLocationDialog = () => {
  const [open, setOpen] = useState(false)
  const [userLocation, setUserLocation] = useState<{
    latitude: number
    longitude: number
  } | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const office = officeData()
  const user = userData()

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

  const handleUpdateLocation = async () => {
    if (!userLocation) {
      toast.error('Please get your location first')
      return
    }

    try {
      const response = await Api.updateOfficeLocation(
        office?.id || 'officeId',
        {
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        }
      )
      saveUser({
        ...user,
        office: {
          ...office,
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        },
      })
      console.log('Update Response:', response)

      toast.success('Office location updated successfully!')
      setOpen(false)
    } catch (error) {
      toast.error('Failed to update office location')
    }

    // Reset states
    setUserLocation(null)
    setLocationError(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='gap-2' size='sm'>
          <IconMapPinFilled className='h-4 w-4' />
          Update Office Location
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[450px]'>
        <DialogHeader>
          <div className='flex items-center gap-3'>
            <div className='bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full'>
              <IconMapPin2 className='text-primary h-4 w-4' />
            </div>
            <div>
              <DialogTitle className='text-lg'>
                Update Office Location
              </DialogTitle>
              <DialogDescription className='text-sm'>
                Set office coordinates for attendance tracking
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className='space-y-4 py-2'>
          {/* Location Status Card */}
          <Card className='border-muted-foreground/20 from-background to-muted/20 border border-dashed bg-gradient-to-br'>
            <CardContent className='p-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full ${
                      userLocation
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/20'
                        : 'bg-blue-100 text-blue-600 dark:bg-blue-900/20'
                    }`}
                  >
                    {userLocation ? (
                      <IconCheck className='h-3 w-3' />
                    ) : (
                      <IconMapPin className='h-3 w-3' />
                    )}
                  </div>
                  <div>
                    <h3 className='text-sm font-semibold'>
                      {userLocation ? 'Location Captured' : 'Ready to Capture'}
                    </h3>
                    <p className='text-muted-foreground text-xs'>
                      {userLocation
                        ? 'Coordinates ready to update'
                        : 'Get current location to proceed'}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={userLocation ? 'default' : 'secondary'}
                  className='text-xs'
                >
                  {userLocation ? 'Ready' : 'Pending'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Coordinates Display */}
          <div className='grid gap-3'>
            <div className='text-muted-foreground text-xs font-medium'>
              Coordinates
            </div>
            <div className='grid grid-cols-2 gap-3'>
              <Card className='border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 dark:border-blue-800 dark:from-blue-950/20 dark:to-blue-900/10'>
                <CardContent className='p-3'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-xs font-medium text-blue-700 dark:text-blue-300'>
                        Latitude
                      </p>
                      <p className='text-lg font-bold text-blue-900 dark:text-blue-100'>
                        {userLocation?.latitude
                          ? userLocation.latitude.toFixed(6)
                          : '--'}
                      </p>
                    </div>
                    <div className='text-blue-400'>
                      <IconMapPin className='h-5 w-5' />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className='border-green-200 bg-gradient-to-br from-green-50 to-green-100 dark:border-green-800 dark:from-green-950/20 dark:to-green-900/10'>
                <CardContent className='p-3'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <p className='text-xs font-medium text-green-700 dark:text-green-300'>
                        Longitude
                      </p>
                      <p className='text-lg font-bold text-green-900 dark:text-green-100'>
                        {userLocation?.longitude
                          ? userLocation.longitude.toFixed(6)
                          : '--'}
                      </p>
                    </div>
                    <div className='text-green-400'>
                      <IconMapPin className='h-5 w-5' />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Section */}
          <div className='space-y-3'>
            {locationError && (
              <Card className='border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20'>
                <CardContent className='p-3'>
                  <div className='flex items-center gap-2 text-red-700 dark:text-red-300'>
                    <IconMapPin className='h-3 w-3' />
                    <p className='text-xs font-medium'>{locationError}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className='flex justify-center'>
              <Button
                onClick={getUserLocation}
                disabled={isGettingLocation}
                className='flex items-center gap-2 px-6 py-3 text-base font-medium transition-all hover:scale-105'
                size='default'
              >
                {isGettingLocation ? (
                  <>
                    <IconLoader2 className='h-4 w-4 animate-spin' />
                    Detecting...
                  </>
                ) : (
                  <>
                    <IconCurrentLocation className='h-4 w-4' />
                    {userLocation ? 'Refresh Location' : 'Detect Location'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className='gap-2 sm:gap-0'>
          <Button
            variant='outline'
            onClick={() => {
              setOpen(false)
              setUserLocation(null)
              setLocationError(null)
            }}
            className='mx-2 flex-1 text-sm'
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpdateLocation}
            disabled={!userLocation || isGettingLocation}
            className='mx-2 flex-1 gap-2 text-sm'
          >
            <IconCheck className='h-3 w-3' />
            Update Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateLocationDialog