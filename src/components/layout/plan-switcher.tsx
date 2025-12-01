import * as React from 'react'
import { ChevronsUpDown, Crown, Sparkles, Rocket, Building2, ArrowUp } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { officeData } from '@/lib/api/authToken'
import Api, { SubscriptionPlan, UpdateSubscriptionDto } from '@/lib/api'
import { cn } from '@/lib/utils'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

const planIcons: Record<string, React.ElementType> = {
  FREE: Building2,
  BASIC: Sparkles,
  PREMIUM: Rocket,
  ENTERPRISE: Crown,
}

const planColors: Record<string, string> = {
  FREE: 'bg-muted text-muted-foreground',
  BASIC: 'bg-blue-500 text-white',
  PREMIUM: 'bg-purple-500 text-white',
  ENTERPRISE: 'bg-yellow-500 text-white',
}

export function PlanSwitcher() {
  const { isMobile } = useSidebar()
  const navigate = useNavigate()
  const [currentPlan, setCurrentPlan] = React.useState<SubscriptionPlan | null>(null)
  const [plans, setPlans] = React.useState<SubscriptionPlan[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isUpdating, setIsUpdating] = React.useState(false)

  React.useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = async () => {
    try {
      setIsLoading(true)
      const office = officeData()
      if (!office?.id) {
        setIsLoading(false)
        return
      }

      // Load current plan
      const currentPlanResponse = await Api.getCurrentPlan(office.id.toString())
      if (currentPlanResponse?.data?.plan) {
        setCurrentPlan(currentPlanResponse.data.plan)
      } else {
        // If no plan found, set default free plan
        setCurrentPlan(null)
      }

      // Load all available plans
      const plansResponse = await Api.getAllPlans()
      if (plansResponse?.data) {
        // Handle both array and wrapped array responses
        const plansData = Array.isArray(plansResponse.data) 
          ? plansResponse.data 
          : []
        setPlans(plansData)
      }
    } catch (error) {
      console.error('Failed to load plans:', error)
      toast.error('Failed to load subscription plans')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlanChange = async (plan: SubscriptionPlan) => {
    if (isUpdating) return

    const office = officeData()
    if (!office?.id) {
      toast.error('Office not found')
      return
    }

    // Don't update if it's the same plan
    if (currentPlan?.id === plan.id) {
      return
    }

    try {
      setIsUpdating(true)
      const payload: UpdateSubscriptionDto = {
        planId: plan.id.toString(),
      }

      await Api.updateSubscription(office.id.toString(), payload)
      setCurrentPlan(plan)
      toast.success(`Successfully upgraded to ${plan.name}`)
      
      // Optionally reload to get fresh data
      await loadPlans()
    } catch (error: any) {
      console.error('Failed to update plan:', error)
      toast.error(error.message || 'Failed to update subscription plan')
    } finally {
      setIsUpdating(false)
    }
  }

  const getPlanDisplayName = (plan: SubscriptionPlan | null) => {
    if (!plan) return 'Free Plan'
    return plan.name
  }

  const getPlanDisplayPrice = (plan: SubscriptionPlan | null) => {
    if (!plan) return '$0'
    if (plan.price === 0) return 'Free'
    return `$${plan.price}/mo`
  }

  const CurrentPlanIcon = currentPlan
    ? planIcons[currentPlan.type] || Building2
    : Building2

  if (isLoading) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size='lg' disabled>
            <div className='bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg'>
              <Building2 className='size-4' />
            </div>
            <div className='grid flex-1 text-left text-sm leading-tight'>
              <span className='truncate font-semibold'>Loading...</span>
              <span className='truncate text-xs'>Plan</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  }

  const sortedPlans = [...plans].sort((a, b) => a.price - b.price)
  const currentPlanIndex = sortedPlans.findIndex((p) => p.id === currentPlan?.id)

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div
                className={cn(
                  'flex aspect-square size-8 items-center justify-center rounded-lg',
                  currentPlan
                    ? planColors[currentPlan.type] || 'bg-sidebar-primary text-sidebar-primary-foreground'
                    : 'bg-sidebar-primary text-sidebar-primary-foreground'
                )}
              >
                <CurrentPlanIcon className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {getPlanDisplayName(currentPlan)}
                </span>
                <span className='truncate text-xs'>{getPlanDisplayPrice(currentPlan)}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-muted-foreground text-xs'>
              Subscription Plans
            </DropdownMenuLabel>
            {sortedPlans.map((plan) => {
              const PlanIcon = planIcons[plan.type] || Building2
              const isCurrentPlan = currentPlan?.id === plan.id
              const isHigherPlan =
                currentPlanIndex >= 0 &&
                sortedPlans.findIndex((p) => p.id === plan.id) > currentPlanIndex

              return (
                <DropdownMenuItem
                  key={plan.id}
                  onClick={() => !isCurrentPlan && handlePlanChange(plan)}
                  disabled={isCurrentPlan || isUpdating}
                  className={cn(
                    'gap-2 p-2',
                    isCurrentPlan && 'bg-accent',
                    isUpdating && 'opacity-50'
                  )}
                >
                  <div
                    className={cn(
                      'flex size-6 items-center justify-center rounded-sm border',
                      planColors[plan.type] || 'bg-muted'
                    )}
                  >
                    <PlanIcon className='size-4 shrink-0' />
                  </div>
                  <div className='flex flex-1 flex-col gap-0.5'>
                    <div className='flex items-center gap-2'>
                      <span className='font-medium'>{plan.name}</span>
                      {isCurrentPlan && (
                        <span className='text-muted-foreground text-xs'>Current</span>
                      )}
                      {isHigherPlan && (
                        <ArrowUp className='text-primary size-3' />
                      )}
                    </div>
                    <span className='text-muted-foreground text-xs'>
                      {plan.price === 0 ? 'Free' : `$${plan.price}/mo`}
                    </span>
                  </div>
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='gap-2 p-2'
              onClick={() => navigate({ to: '/settings/billing' })}
            >
              <div className='bg-background flex size-6 items-center justify-center rounded-md border'>
                <Crown className='size-4' />
              </div>
              <div className='text-muted-foreground font-medium'>
                Manage billing
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
