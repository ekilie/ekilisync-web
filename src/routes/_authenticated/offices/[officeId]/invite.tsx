// import { useState } from 'react'
// import { useParams } from '@tanstack/react-router'
// import { z } from 'zod'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { Button } from '@/components/ui/button'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'

// const formSchema = z.object({
//   name: z.string().min(1, 'Employee name is required'),
//   email: z.string().email('Invalid email'),
// })

// type FormValues = z.infer<typeof formSchema>

// export default function InviteEmployeesPage() {
//   const { officeId } = useParams({ from: '/_authenticated/offices/:officeId/invite' });
//   const [isLoading, setIsLoading] = useState(false)
//   const [success, setSuccess] = useState<string | null>(null)
//   const [error, setError] = useState<string | null>(null)

//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//     },
//   })

//   async function onSubmit(data: FormValues) {
//     setIsLoading(true)
//     setError(null)
//     setSuccess(null)
//     try {
//       const response = await fetch('/api/employees', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ ...data, officeId }),
//       })
//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.message || 'Failed to invite employee')
//       }
//       setSuccess('Employee invited! Verification email sent.')
//       form.reset()
//     } catch (err: any) {
//       setError(err.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className='max-w-lg mx-auto mt-10'>
//       <h1 className='text-2xl font-bold mb-4'>Invite Employees</h1>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
//           <FormField
//             control={form.control}
//             name='name'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Employee Name</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Employee Name' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <FormField
//             control={form.control}
//             name='email'
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Employee Email</FormLabel>
//                 <FormControl>
//                   <Input placeholder='Employee Email' {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//           <Button type='submit' disabled={isLoading} className='w-full'>
//             {isLoading ? 'Inviting...' : 'Invite Employee'}
//           </Button>
//           {error && <div className='text-red-500 text-sm mt-2'>{error}</div>}
//           {success && <div className='text-green-600 text-sm mt-2'>{success}</div>}
//         </form>
//       </Form>
//     </div>
//   )
// } 