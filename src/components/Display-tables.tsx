import React from 'react'
import TableNav from './TableNav'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/Accordion'
import { TableHeader, TableRow, TableBody, TableCell, Table } from './ui/Table'

type Props = {}

const DisplayTables = (props: Props) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableNav />
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1">
                                <AccordionTrigger>KAI ZHI TEO</AccordionTrigger>
                                <AccordionContent>
                                    Yes. It&apos;s animated by default, but you can disable it if you
                                    prefer.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

export default DisplayTables