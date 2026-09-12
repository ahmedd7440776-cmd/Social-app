import { Button, Input, Label, ListBox, TextField, Select, Spinner } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Check, Login } from 'iconsax-reactjs'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Router, useNavigate } from 'react-router-dom'
import * as zod from 'zod'
import { regesterSchema } from './register.valdation.zod'


export default function Regester() {

  // const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register,
     control, formState: { errors, isSubmitting }, reset } = useForm({
    defaultValues: {
      name: '', username: '', password: '', email: '',
       dateOfBirth: '', gender: '', rePassword: '', value: '',},
    mode: 'all',
    resolver: zodResolver(regesterSchema)
  })

  const navgation = useNavigate()
  // call api inside this fun
  async function handleUserSubmit(userData) {

    toast.promise(axios.post(`${import.meta.env.VITE_BASE_URL}/users/signup`, userData), {
      loading: 'please wait...',

      success: function (x) {
        reset()
        navgation('/login')
        return <h1 className='text-green-500'>done</h1>
      },
      error: function (x) {
        // console.log(x.errors);

        const state = x?.response?.status;
        const message = x?.response?.data?.message || 'something went wrong'
        if (state === 409) {
          setTimeout(() => {
            navgation('/login')
          }, 1800);
          return <h1 className='text-red-500 text-center'>this account is already exists, redirecting you to login ...</h1>
        }
        return <h1 className='text-red-500 text-center'>{message}</h1>}
    })
  }
  return (
    <form onSubmit={handleSubmit(handleUserSubmit)} className='w-full max-w-2xl mx-auto flex shadow-2xl  flex-col gap-4 p-3 md:p-9 my-20 md:my-26 rounded-2xl bg-white ' >
      <h1 className=' text-center mx-auto rounded-2xl text-sky-500
       pb-2 px-2 sm:text-2xl md:3xl whitespace-nowrap font-meduim shadow-xl  '>
        Complete This Form To Gain Access</h1>


      {/* name  */}
      <TextField type='text'>
        <Label>Name</Label>

        <Input {...register('name')}
          placeholder='Enter your name...' />
      </TextField>
      {errors.name && <span className='text-red-500'>{errors.name.message}</span>}
      {/* {console.log(errors)} */}



      {/* username  */}
      <TextField type='text'>
        <Label>Username</Label>
        <Input {...register('username')} placeholder='Enter your username...' />

      </TextField>


      {/* email  */}
      <TextField type='email'>
        <Label>Email</Label>
        <Input {...register('email')} placeholder='Enter your email.... (example@gmail.com)' />



      </TextField>



      {/* password  */}
      <TextField type='password'>
        <Label>Password</Label>
        <Input {...register('password')} autoComplete='off' placeholder='Enter your password...' />


        {/* <Input {...register('password', {
          pattern: { value: /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$ /, message: ' Enter valid password' }
        })} autoComplete='off' placeholder='Enter your password...' /> */}
      </TextField>
      {/* {errors.password && <span className='text-red-500'>{errors.password.message}</span>} */}




      {/* password-2  */}
      <TextField type='password'>
        <Label>confirm password</Label>
        <Input {...register('rePassword')} autoComplete='off' placeholder='Confirm password...' />
      </TextField>
      {/* {errors.rePassword && <span className='text-red-500'>{errors.rePassword.message}</span>} */}


      {/* date of birth  */}
      <TextField type='date' isInvalid={!!errors.dateOfBirth} >
        <Label>Date of birth</Label>
        <Input {...register('dateOfBirth')}
          placeholder='Enter your date of birth' />



      </TextField>
      {errors.dateOfBirth && <span className='text-red-500'>{errors.dateOfBirth?.message}</span>}


      {/* gender  */}

      <Controller name='gender' control={control} render={({ field }) => {
        return <Select {...field}


          placeholder="Select your gender">
          <Label>Gender</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="male" textValue="male">
                Male
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="female" textValue="famale">
                famale
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>

      }} />

      {/* className='focus:ring-red-400'    to chang the shadoe in input */}
      <div className="flex  flex-col gap-2">
        <Button className='w-full' type='submit' isPending={isSubmitting}>

          {isSubmitting ? <Spinner color='current' size='lg' /> : <>  <Check />
            Submit</>}


        </Button>

        <Button type='reset' className='w-full' variant='danger-soft'>
          Reset
        </Button>
      </div>
    </form>

  )
}
