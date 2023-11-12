import {z} from 'zod'

export interface PersonnelByPlatoonAndStatus {
    platoon: string;
    personnel: iPerson[];
}

export interface PersonnelByLabelAndStatus {
    label: string;
    personnel: iPerson[];
}

export interface iPerson {
    rank: string;
    name: string;
    status: any;
    platoon: {
        platoon: string
    };
}


export interface iUsers {
    email: string,
    name: string,
    rank: string,
    pes: string,
    platoon: any,
    included: boolean,
    username: string,
    status: JSON,
}

export interface iPlatoon{
    id: string,
    platoon: string
}

export const createUserValidators = z.object({
    email: z.string(),
    name: z.string().min(3),
    rank: z.string(),
    pes: z.string(),
    platoonId: z.string(),
    included: z.boolean(),
    username:z.string(),
    status: z.any(),
    platoon: z.any(),
})

export type createUserValidators = z.infer<typeof createUserValidators>


export const updateStatusValidators = z.object({
    id: z.string(),
    status: z.any(),
    comments: z.string(),
    start_date: z.string(),
    end_date: z.string(),
    other_comments: z.string(),
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