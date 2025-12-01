import {
  IconBuilding,
  IconCreditCard,
  IconHelp,
  IconLayoutDashboard,
  IconNotification,
  IconPackages,
  IconPalette,
  IconSettings,
  IconUserCog,
  IconUsers,
} from '@tabler/icons-react'
import { Egg } from 'lucide-react'
import Api from '@/lib/api'
import { officeData } from '@/lib/api/authToken'

// Static fallback for compatibility with components expecting sidebarData
export const sidebarData: SidebarData = {
  user: {
    name: 'Tachera',
    email: 'tachera@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'ekiliSync',
      logo: Egg,
      plan: 'Free',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Employees',
          url: '/employees',
          icon: IconUsers,
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Office',
              url: '/settings/office',
              icon: IconBuilding,
            },
            {
              title: 'Billing',
              url: '/settings/billing',
              icon: IconCreditCard,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
        {
          title: 'Apps',
          url: '/apps',
          icon: IconPackages,
        },
      ],
    },
  ],
}

export type SidebarTeam = {
  name: string
  logo: any
  plan: string
}

export type SidebarNavItem = {
  title: string
  url?: string
  icon?: any
  items?: SidebarNavItem[]
}

export type SidebarNavGroup = {
  title: string
  items: SidebarNavItem[]
}

export type SidebarData = {
  user: {
    name: string
    email: string
    avatar: string
  }
  teams: SidebarTeam[]
  navGroups: SidebarNavGroup[]
}

export const getSidebarData = async (): Promise<SidebarData> => {
  const office = officeData()
  let planName = 'Free'
  if (office?.id) {
    try {
      const response = await Api.getCurrentPlan(office.id)
      console.log('Current plan response:', response)
      planName = response?.data?.name || planName
    } catch (e) {
      // fallback to Free
    }
  }
  return {
    user: {
      name: 'Tachera',
      email: 'tachera@gmail.com',
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'ekiliSync',
        logo: Egg,
        plan: planName,
      },
    ],
    navGroups: [
      {
        title: 'General',
        items: [
          {
            title: 'Dashboard',
            url: '/dashboard',
            icon: IconLayoutDashboard,
          },
          {
            title: 'Employees',
            url: '/employees',
            icon: IconUsers,
          },
        ],
      },
      {
        title: 'Other',
        items: [
          {
            title: 'Settings',
            icon: IconSettings,
            items: [
              {
                title: 'Profile',
                url: '/settings',
                icon: IconUserCog,
              },
              {
                title: 'Billing',
                url: '/settings/billing',
                icon: IconCreditCard,
              },
              {
                title: 'Appearance',
                url: '/settings/appearance',
                icon: IconPalette,
              },
              {
                title: 'Notifications',
                url: '/settings/notifications',
                icon: IconNotification,
              },
            ],
          },
          {
            title: 'Help Center',
            url: '/help-center',
            icon: IconHelp,
          },
          {
            title: 'Apps',
            url: '/apps',
            icon: IconPackages,
          },
        ],
      },
    ],
  }
}
