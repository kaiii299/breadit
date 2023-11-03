import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'
import UpdateStatus from './UpdateStatusForm'
import { CalendarIcon } from 'lucide-react'
import { format, isValid, parseISO } from "date-fns"

type Props = {
    users: string[]
}

const AccoridonEdit = ({ users }: Props) => {
    return (
        <Accordion type="single" collapsible className="w-full">
            {
                users.map((res: any) => {

                    // Format date that users is not in camp

                    const start_date = res.status.start_date
                    const end_date = res.status.end_date

                    function formatStartAndEndDate() {

                        if (start_date && end_date) {
                            const parseStartDate = parseISO(start_date)
                            const parseEndDate = parseISO(end_date)


                            if (isValid(parseStartDate) && isValid(parseEndDate)) {

                                const formattedStartDate = format(parseStartDate, 'LLL dd, y');
                                const formattedEndDate = format(parseEndDate, 'LLL dd, y');

                                return `${formattedStartDate} - ${formattedEndDate}`
                            }
                        }

                        return 'Invalid date'
                    }

                    const formattedDateRange = formatStartAndEndDate();

                    return (
                        <AccordionItem value={res.id}>

                            <AccordionTrigger>

                                <div >
                                    <div className='flex'>
                                        <h1 className='font-bold uppercase text-lg '>{res.rank} {res.name}</h1>
                                    </div>
                                    <div className='mt-3'>
                                        <div className='flex flex-col gap-4'>
                                            {/* If user is in camp won't show the date */}
                                            <div className={res.status.status == 'In Camp' ?
                                                'px-3 py-1 mr-3 w-max flex gap-2 items-center uppercase rounded-md bg-[#66aa8c] text-white ' :
                                                'px-3 py-1 mr-3 w-max flex gap-2 items-center uppercase rounded-md bg-[#e24a4a] text-white '
                                            }>
                                                <span className="block text-xs font-bold">{res.status.status}</span>
                                            </div>

                                            <span className={res.status.status == 'In Camp' ? 'hidden' : 'block'}>
                                                <div className='flex px-2 py-3 justify-center rounded-md bg-[#4582]'>
                                                    <CalendarIcon className="mx-1 h-5 w-5 " />
                                                    <span className='text-md'>
                                                        {formattedDateRange}
                                                    </span>
                                                </div>
                                            </span>
                                        </div>
                                    </div>
                                    {/* <div className='my-3'>
                                        <span >{res.status.comments}</span>
                                    </div> */}
                                </div>

                            </AccordionTrigger>
                            <AccordionContent>
                                <div>
                                    <UpdateStatus statusProps={res.status} idProps={res.id} />
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    )
                })
            }
        </Accordion>
    )
}

export default AccoridonEdit