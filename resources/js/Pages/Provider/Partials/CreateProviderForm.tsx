"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/Components/ui/button"
import {
    ChevronLeft,
  } from "lucide-react"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form"
import { Input } from "@/Components/ui/input"
import { toast } from "sonner"
import { PhoneInput, getPhoneData } from "@/Components/phone-imput";


const formSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string().min(10).max(10),
    address: z.string().min(2).max(50),
  })

  export function CreateProviderForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          email: "",
          phone: "",
          address: "",
        },
      })

      function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('yesy');
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);

        const phoneData = getPhoneData(values.phone);

		if (!phoneData.isValid) {
			form.setError("phone", {
				type: "manual",
				message: "Invalid phone number",
			});
			return;
		}
		toast.success("Phone number is valid"); 
      }


      return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
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
                    <Input placeholder="jogn.doe@mail.ie" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

                <FormField
					control={form.control}
					name="phone"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<PhoneInput {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
                 <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-start gap-4">
            <Button type="submit">Submit</Button>
            <form action={route('providers.index')}>
            <Button variant="outline" type="submit" >
            <ChevronLeft className="h-4 w-4" />
                Back to list</Button>
            </form>
            </div>
            
          </form>
        </Form>
      )
  }