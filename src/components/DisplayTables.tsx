
import React from 'react'
import TableNav from './TableNav'
import { TableHeader, TableRow, TableBody, TableCell, Table, TableCaption, TableHead } from './ui/table'
import AccoridonEdit from './AccoridonEdit'


type Props = {

    users: any
}


const DisplayTables = ({ users }: Props) => {
    
    return (
        <div>
            <Table>
                <TableCaption>Parade state for Bravo</TableCaption>
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
                            <AccoridonEdit users={users}/>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default DisplayTables