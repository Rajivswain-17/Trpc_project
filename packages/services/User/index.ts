import {scrypt, randomBytes, createHmac} from 'node:crypto'
import {db, eq} from '@repo/database'
import * as JWT from 'jsonwebtoken'
import { usersTable } from '@repo/database/models/user'
import {type  CreateUserWithEmailAndPasswordInputType, GenerateUserTokenPayloadType, createUserWithEmailAndPasswordInput, generateUserTokenPayload} from './model'
import {env} from '../env'
import { id } from 'zod/v4/locales'


class UserService {

    private async getUserByEmail(email: string) {
      const result =  await db.select().from(usersTable).where(eq(usersTable.email, email))
      if(!result || result.length == 0) return null;
      return result[0]    
    }

    private async generateUserToken(payload: GenerateUserTokenPayloadType){
        const {id} = await generateUserTokenPayload.parseAsync(payload)
        const token = JWT.sign({id}, env.JWT_SECRET)
        return {token};         
    }

    public async createUserWithEmailAndPassword(payload: CreateUserWithEmailAndPasswordInputType) {
        const {fullName, email, password} = await createUserWithEmailAndPasswordInput.parseAsync(payload)


        // check if user is already existing or not
        const existingUserWithEmail = await this.getUserByEmail(email)
        if(existingUserWithEmail) throw new Error(`User with this Email ${email} already Exists`);


        // calculate salt and add hash the password
        const salt = randomBytes(16).toString('hex')
        const hash = createHmac('sha256', salt).update(password).digest('hex');


        // create user in db
        const userInsertResult = await db.insert(usersTable).values({email, fullName, password: hash, salt}).returning({
                id: usersTable.id
        })

        if (!userInsertResult || userInsertResult.length == 0 || !userInsertResult[0]?.id) throw new Error('Failed to Create User')

            const userId = userInsertResult[0].id
            const {token} = await this.generateUserToken({ id: userId})

        return {
            id: userId,
            token

        }
    }
}

export default UserService;