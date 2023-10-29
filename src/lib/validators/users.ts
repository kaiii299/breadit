import {z} from 'zod'

export const userValidators = z.object({
    name: z.string().min(3),
    email: z.string(),
    rank: z.string(),
    pes: z.string(),
    platoon: z.any(),
})

export type createUsersPayload = z.infer<typeof userValidators>