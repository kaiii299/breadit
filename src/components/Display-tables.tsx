import React from 'react'
import TableNav from './TableNav'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'
import { TableHeader, TableRow, TableBody, TableCell, Table, TableCaption, TableHead } from './ui/table'
import { createUsersPayload } from '@/lib/validators/users'


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
                                                <AccordionTrigger><h1 className='uppercase font-bold'>{res.rank} {res.name} </h1>

                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    <div>
                                                        {res.status.status}
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