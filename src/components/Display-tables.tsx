import React from 'react'
import TableNav from './TableNav'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'
import { TableHeader, TableRow, TableBody, TableCell, Table, TableCaption, TableHead } from './ui/table'
import { Button } from './ui/Button'
import UpdateStatus from './UpdateStatusForm'
import { CalendarIcon } from 'lucide-react'


type Props = {

    users: any
}

const DisplayTables = ({ users }: Props) => {

    return (
        <div>
            <Table>
                <TableCaption>Parade State for Bravo.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <TableNav />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Accordion type="single" collapsible className="w-full">
                                {
                                    users.map((res: any) => {
                                        // console.log(res);

                                        return (
                                            <AccordionItem value={res.id}>

                                                <AccordionTrigger>

                                                    <div >
                                                        <div className='flex'>
                                                            <h1 className='font-bold uppercase '>{res.rank} {res.name}</h1>
                                                        </div>
                                                        <div className='mt-3'>
                                                            <div className='flex'>

                                                                <div className={res.status.status == 'In Camp' ?
                                                                    'px-3 mr-3 w-max flex gap-2 items-center uppercase rounded-md bg-[#66aa8c] text-white ' :
                                                                    'px-3 mr-3 w-max flex gap-2 items-center uppercase rounded-md bg-[#f04141] text-white '
                                                                }>
                                                                    <span className="block text-sm font-bold">{res.status.status}</span>
                                                                </div>

                                                                <span className={res.status.status == 'In Camp' ? 'hidden' : 'block'}>
                                                                    <div className='flex px-2 py-1 justify-center rounded-md bg-[#4582]'>
                                                                    <CalendarIcon className="mx-1 h-5 w-5 " />
                                                                    {` ${res.status.start_date} - ${res.status.end_date} `}
                                                                    </div>
                                                                    </span>
                                                            </div>
                                                        </div>
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

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default DisplayTables