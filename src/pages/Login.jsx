import { Button, Input, Label, TextField, Spinner } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Check } from 'iconsax-reactjs'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
// import * as zod from 'zod'
import { loginSchema } from './login.valdation'
import { useContext } from 'react'
import { UserTokenProvider } from '../AuthUserContext'

function Login() {
  // const [isLoading, setIsLoading] = useState(false)
  const { handleSubmit, register, formState: { errors, isSubmitting }, reset } = useForm({
    defaultValues: {
      password: '',
      email: '',
    },
    mode: 'all',
    resolver: zodResolver(loginSchema)
  })

  // if it just string or number <====>

  // const old = ['0' ,1,1,'shirt','shirt']
  // const newPro = [...new Set(old)];
  // console.log(newPro)


  // if it inclueds a id and what's so ever <======>

  //    const old = [
  //      {  index:0, id: 1, name: 'shirt' },
  //      { index:1,  id: 2, name: 'jeans' },
  //      { index:2,  id: 1, name: 'shirt' },
  //      {  index:3, id: 3, name: 'jacet' },
  //    ]

  // const unique = Array.from(new Map (old.map(item =>[item.id,item])).values())
  // console.log(unique);

  const { setUserData } = useContext(UserTokenProvider)
  const navgation = useNavigate()

  // call api inside this fun=======> FUNCTION

  async function handleUserSubmit(userData) {
    // console.log(userData);

await toast.promise(axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin`
      , userData), {
      loading: 'please wait...',
      success: function (response) {
        localStorage.setItem('user_token', response.data.data.token)
        getUserData().then(function (data) {
          setUserData(data)
        })
        setUserData(response.data.data.token)

        navgation('/posts')

        return <h1 className='text-green-500'>{response.data.message}</h1>
      },

      error: function (x) {
      
        return <h1 className='text-red-500 text-center'>
          {x.response.data.message}
        </h1>
}})

  }
  return (
    <form onSubmit={handleSubmit(handleUserSubmit)} 
    className=' w-full max-w-md mx-auto flex shadow-2xl  flex-col gap-4 p-9 my-16 rounded-2xl bg-white' >
      <h1 className='text-center mx-auto rounded-2xl text-sky-500 pb-2 px-2 text-2xl font-meduim shadow-xl w-fit '>
        Login page</h1>

      {/* email  */}
      <TextField type='email'>
        <Label>Email</Label>
        <Input {...register('email')} placeholder='Enter your email.... (example@gmail.com)' />
      </TextField>

      {/* password  */}
      <TextField type='password'>
        <Label>Password</Label>
        <Input {...register('password')} autoComplete='off' placeholder='Enter your password...' />
      </TextField>
      {/* {errors.password && <span className='text-red-500'>{errors.password.message}</span>} */}
      {/* className='focus:ring-red-400'    to chang the shadoe in input */}

      <div className="flex flex-col gap-2">
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




export async function getUserData() {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile-data`, {
      headers: {
        token: localStorage.getItem('user_token')
      }

    })
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message)
    }
    throw new Error('Network Error')
  }
}



export default Login;