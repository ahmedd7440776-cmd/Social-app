  import * as zod from 'zod'
  
 export const regesterSchema = zod.object({
  name: zod.string().optional(),
  username: zod.string().optional(),
  email: zod.email().optional(),
  password: zod.string().optional(),
  rePassword: zod.string().optional(),
   dateOfBirth: zod.string().optional(),
  // .refine((value) => {
  //   const currentDate = new Date();
  //   const usertDate = new Date(value);

  //   if (currentDate.getFullYear() - usertDate.getFullYear() > 21) {
  //     return true
  //   }
  // }, 'Your age must be aboce 21 years old'),

  gender: zod.enum(['male', 'female']),


})
// .refine(function ({ password, rePassword }) {
//   if (password === rePassword) {
//     return true
//   }
// }, {
//   error: "password and confirming password must be the same",
//   path: ['rePassword']
// })