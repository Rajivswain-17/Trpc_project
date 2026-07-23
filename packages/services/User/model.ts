import {z} from 'zod'

export const createUserWithEmailAndPasswordInput = z.object({
    fullName: z.string().describe("Full name of the User"),
    email: z.email().describe("email address of the user"),
    password: z.string().describe("password of the user"),
   
})



export type  CreateUserWithEmailAndPasswordInputType =
 z.infer<typeof createUserWithEmailAndPasswordInput>


 export const generateUserTokenPayload = z.object({
    id: z.string().describe('uuid of the user')
 })
 export type GenerateUserTokenPayloadType = z.infer<typeof generateUserTokenPayload>
 