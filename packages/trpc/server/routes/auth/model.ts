import { z } from 'zod'

export const createUserWithEmailAndPasswordInputModel = z.object({
    fullName: z.string().describe("Full name of the user"),
    email: z.email().describe("email of the user"),
    password: z.string().describe("password of the user")
})

export const createUserWithEmailAndPasswordOutputModel = z.object({
   id: z.string().describe('id of the User created')
})


