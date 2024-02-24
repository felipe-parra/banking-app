import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerFormSchema, UserType } from '@/interfaces/user.interface'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useUserContext } from '@/context/user/useUserContext'

export default function RegisterPage() {
  const { isLoading, isError, doRegister } = useUserContext()
  const navigate = useNavigate()
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  })

  const onSubmit = async (data: UserType) => {
    console.log(data)
    await doRegister(data)

    if (isError) {
      return
    }
    form.reset()
    form.trigger('name')
    navigate("/login")
  }
  return (
    <section className='w-full h-full flex items-start md:justify-center'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full md:max-w-sm">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="John Doe" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="john@email.com" {...field} />
                </FormControl>
                <FormDescription>
                  This is will be your email.
                </FormDescription>
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
                <FormDescription>
                  Remember use a secure password
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' type="submit" disabled={isLoading}>Register</Button>
          <p className='text-end text-gray-500'>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link></p>
        </form>
      </Form>
    </section>
  )
}
