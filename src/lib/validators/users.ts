import {z} from 'zod'

export const createUserValidators = z.object({
    email: z.string(),
    name: z.string().min(3),
    rank: z.string(),
    pes: z.string(),
    platoonId: z.string(),
    included: z.boolean(),
    username:z.string(),
    status: z.any(),
})


export const updateStatusValidators = z.object({
    id: z.string(),
    status: z.any(),
    comments: z.string(),
    start_date: z.date(),
    end_date: z.date(),
})

export type updateStatusValidators = z.infer<typeof updateStatusValidators>

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