const storage = {
  getItem: async (key: string): Promise<string | null> => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  },
  setItem: async (key: string, value: string): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
  clear: async (): Promise<void> => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  }
};

export const authToken = async (tokenType: string) => {
  const _key = `sense:${tokenType}-token`;
  return await storage.getItem(_key) || null;
};

export const setAuthToken = async (tokens: { [x: string]: string }) => {
  Object.keys(tokens).forEach(
    async (key) => await storage.setItem(`sense:${key}-token`, tokens[key])
  );
};

export const saveUser = async (user: any) => {
  await storage.setItem('sense:user', JSON.stringify(user));
};

export const saveUserData = async (user: any) => {
  await storage.setItem('sense:user-data', JSON.stringify(user));
};

export const currentUser = async () => {
  const user = await storage.getItem('sense:user');
  return user ? JSON.parse(user) : null;
};

export const userData = async () => {
  const user = await storage.getItem('sense:user-data');
  return user ? JSON.parse(user) : null;
};

export const userLocation = async () => {
  const user = await storage.getItem('sense:user-data');
  return user ? JSON.parse(user).userInfo.location : null;
};

export const isLoggedIn = async () => {
  const user = await currentUser();
  return user !== null && user.name !== null;
};

export const clearCache = async () => {
  await storage.clear();
};

export const storeNotificationPayload = async (
  callUUID: string,
  payload: any
) => {
  try {
    await storage.setItem(`notification_${callUUID}`, JSON.stringify(payload));
  } catch (error) {
    console.error('Error storing notification payload:', error);
  }
};

export const retrieveStoredNotificationPayload = async (callUUID: string) => {
  try {
    const storedPayload = await storage.getItem(`notification_${callUUID}`);
    if (storedPayload) {
      await storage.removeItem(`notification_${callUUID}`);
      return JSON.parse(storedPayload);
    }
    return null;
  } catch (error) {
    console.error('Error retrieving stored notification payload:', error);
    return null;
  }
};
