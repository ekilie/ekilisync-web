import { z } from 'zod'

const officeSchema = z.object({
  id: z.string(),
  name: z.string(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
  address: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  logoUrl: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Office = z.infer<typeof officeSchema>

export const officeListSchema = z.array(officeSchema)
