import {z} from 'zod'

export const userValidators = z.object({
    email: z.string(),
    name: z.string().min(3),
    rank: z.string(),
    pes: z.string(),
    platoon: z.string(),
    included: z.boolean(),
    username:z.string(),
    status: z.any(),
})

export type createUsersPayload = z.infer<typeof userValidators>

export const statusValidators = z.object({
    // Status type
    status: z.string(),
    // Start date of status
    start_date: z.string() || null,
    // End date of status
    end_date: z.string() || null,
    // Extra comments for status
    comments: z.string() || null,
})

export type statusPayload = z.infer<typeof statusValidators>