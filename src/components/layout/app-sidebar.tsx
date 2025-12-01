import React, { useEffect, useState } from 'react';
import { currentUser } from '@/lib/api/authToken';
import type { CurrentUser } from '@/lib/api/types';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { NavGroup } from '@/components/layout/nav-group';
import type { NavGroup as NavGroupType } from '@/components/layout/types';
import { NavUser } from '@/components/layout/nav-user';
import { PlanSwitcher } from '@/components/layout/plan-switcher';
import { sidebarData } from './data/sidebar-data';


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<CurrentUser | null>(null)
  // const sidebarData = getSidebarData()
  useEffect(() => {
    currentUser().then(setUser)
  }, [])
  return (
    <Sidebar collapsible='icon' variant='floating' {...props}>
      <SidebarHeader>
        <PlanSwitcher />
      </SidebarHeader>
      <SidebarContent>
        {(sidebarData.navGroups as unknown as NavGroupType[]).map((navGroup) => (
          <NavGroup key={navGroup.title} {...navGroup} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser
            user={{
              name: user.name,
              email: user.email,
              avatar: user.office?.logoUrl || '',
            }}
          />
        ) : null}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}