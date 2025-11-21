import type { CurrentUser } from '../types'

const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key)
    }
    return null
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value)
    }
  },
  removeItem: async (key: string): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key)
    }
  },
  clear: async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.clear()
    }
  },
}

export const authToken = async (tokenType: string) => {
  //TODO:Will add custom token prefixing mechanism
  const _key = `ekili-sync:${tokenType}-token`
  return (await storage.getItem(_key)) || null
}

export const setAuthToken = async (tokens: { [x: string]: string }) => {
  Object.keys(tokens).forEach(
    async (key) => await storage.setItem(`ekili-sync:${key}-token`, tokens[key])
  )
}

export const saveUser = async (user: CurrentUser) => {
  await storage.setItem('ekili-sync:user', JSON.stringify(user))
}

export const saveUserData = async (user: any) => {
  await storage.setItem('ekili-sync:user-data', JSON.stringify(user))
}

export const currentUser = async (): Promise<CurrentUser | null> => {
  const user = await storage.getItem('ekili-sync:user')
  return user ? JSON.parse(user) : null
}

export const officeData = () => {
  const data = localStorage.getItem('ekili-sync:user')
  if (data) {
    const user: CurrentUser = JSON.parse(data)
    return user.office
  }
  return null
}

export const userData = () => {
  const user = localStorage.getItem('ekili-sync:user')
  return user ? JSON.parse(user) : null
}

export const userLocation = async () => {
  const user = await storage.getItem('ekili-sync:user')
  return user ? JSON.parse(user).userInfo.location : null
}

export const isLoggedIn = async () => {
  const user = await currentUser()
  return user !== null && user.name !== null
}

export const clearCache = async () => {
  await storage.clear()
}

export const storeNotificationPayload = async (
  callUUID: string,
  payload: any
) => {
  try {
    await storage.setItem(`notification_${callUUID}`, JSON.stringify(payload))
  } catch (error) {
    // Error storing notification payload
  }
}

export const retrieveStoredNotificationPayload = async (callUUID: string) => {
  try {
    const storedPayload = await storage.getItem(`notification_${callUUID}`)
    if (storedPayload) {
      await storage.removeItem(`notification_${callUUID}`)
      return JSON.parse(storedPayload)
    }
    return null
  } catch (error) {
    // Error retrieving stored notification payload
    return null
  }
}
