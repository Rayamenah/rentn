import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
// import { toast } from "@/components/ui/use-toast"

const items = [
    {
        id: "bedrooms",
        label: "Bedroom(s)",
    },
    {
        id: "toilet",
        label: "Toilet",
    },
    {
        id: "guest room",
        label: "Guest rooms",
    },
    {
        id: "parking space",
        label: "Parking space",
    },

] as const

const FormSchema = z.object({
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

type Props = {
    progress: () => void;
    regress: () => void
}

export default function Features({ progress, regress }: Props) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            items: ["bedrooms", "guest room"],
        },
    })
    function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data)
        progress()

        // toast({
        //     title: "You submitted the following values:",
        //     description: (
        //         <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //             <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //         </pre>
        //     ),
        // })
    }

    return (
        <section className='p-10' >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="items"
                        render={() => (
                            <FormItem>
                                <div className="mb-4">
                                    <FormLabel className="text-base font-bold">FEATURES OF HOUSE</FormLabel>
                                </div>
                                {items.map((item) => (
                                    <FormField
                                        key={item.id}
                                        control={form.control}
                                        name="items"
                                        render={({ field }: any) => {
                                            return (
                                                <FormItem
                                                    key={item.id}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(item.id)}
                                                            onCheckedChange={(checked: boolean) => {
                                                                return checked
                                                                    ? field.onChange([...field.value, item.id])
                                                                    : field.onChange(
                                                                        field.value?.filter(
                                                                            (value: string) => value !== item.id
                                                                        )
                                                                    )
                                                            }}
                                                        />
                                                    </FormControl>

                                                    <FormLabel className="text-sm font-normal">
                                                        {item.label}
                                                    </FormLabel>
                                                </FormItem>
                                            )
                                        }}
                                    />
                                ))}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <br />
                    <aside>
                        <p className='text-base font-bold'>PRICING</p>
                        <br />
                        <div className='flex justify-between items-center max-w-sm'>
                            <p className='text-sm font-semibold'>Annual Rent</p>
                            <input
                                className='max-w-[7rem] w-[7rem] h-8 p-1 text-xs border-b border-b-black placeholder:text-xs placeholder:ml-1 focus:outline-none'
                                type='number'
                                name='description'
                                placeholder='Enter amount'
                                required
                            // value={form.description}
                            // onChange={onChange}
                            />
                        </div>

                    </aside>
                    <br />
                    <div className='w-full flex justify-between items-center'>
                        <button onClick={regress} className='border border-black w-10 rounded-lg'><img src='/chevron-right.svg' /></button>
                        <button type='submit' className='border border-black w-10 rounded-lg'><img src='/chevron-right.svg' /></button>
                    </div>
                </form>
            </Form>

        </section>
    )
}
