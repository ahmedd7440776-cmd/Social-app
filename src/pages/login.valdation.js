import * as zod from 'zod'

export const loginSchema = zod.object({
  email: zod.email('Enter invaild email'),
  password: zod.string(),
});