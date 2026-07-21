import {z} from 'zod'

export const createUserWithEmailAndPasswordInput = z.object({
    fullName: z.string().describe("Full name of the User"),
    email: z.email().describe("email address of the user"),
    password: z.string().describe("password of the user"),
   
})



export type  CreateUserWithEmailAndPasswordInputType =
 z.infer<typeof createUserWithEmailAndPasswordInput>
