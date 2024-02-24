import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginFormType, loginFormSchema } from '@/interfaces/user.interface'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { useUserContext } from '@/context/user/useUserContext'



export default function LoginPage() {
  const { isLoading, isError, doLogin } = useUserContext()

  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormType) => {
    console.log(data)
    await doLogin(data)

    if (isError) {
      return
    }
  }
  return (
    <section className='w-full h-full flex flex-col items-center md:justify-start'>
      <h3 className='text-center text-3xl flex-1'>Login</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full md:max-w-sm">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="john@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Type password" {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className='w-full'>Login</Button>
          <p className='text-end'>Don't have an account? <Link to='/register' className=' text-blue-500'>Register</Link></p>
        </form>
      </Form>
    </section>
  )
}
