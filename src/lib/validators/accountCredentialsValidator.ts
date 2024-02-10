import { z } from 'zod'

export const AuthCredentialsValidator = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      {
        message: 'Password must be at least 8 characters long',
      }
    ),
})

export type TAuthCredentialsValidator = z.infer<typeof AuthCredentialsValidator>
