import { error } from "console"
import { trpc } from "~/trpc/client"

export const useSignup = () => {
    const {
         mutateAsync: createUserWithEmailAndPasswordAsync,
          mutate: createUserWithEmailAndPassword,
          error,
          failureCount,
          isError,
          isIdle,
          isSuccess,
          status,
          
        } =
        trpc.auth.createUserWithEmailAndPassword.useMutation()
        return {
            createUserWithEmailAndPasswordAsync,
            createUserWithEmailAndPassword,
            error,
            failureCount,
            isError,
            isIdle,
            isSuccess,
            status,
            

        }
}