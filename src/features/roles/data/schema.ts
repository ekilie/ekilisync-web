import { z } from 'zod'

const userRoleSchema = z.enum(['superadmin', 'admin', 'manager', 'cashier', 'employee'])

const roleSchema = z.object({
  id: z.number(),
  name: userRoleSchema,
  permissions: z.array(z.string()),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Role = z.infer<typeof roleSchema>

export const roleListSchema = z.array(roleSchema)
