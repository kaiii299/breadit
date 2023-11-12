
import React from 'react'
import TableNav from './TableNav'
import { TableHeader, TableRow, TableBody, TableCell, Table, TableCaption, TableHead } from './ui/table'
import AccoridonEdit from './AccoridonEdit'


type Props = {

    users: any
    platoon: any
}


const DisplayTables = ({ users, platoon }: Props) => {
    
    return (
        <div>
            <Table>
                <TableCaption>Parade state for Bravo</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <TableNav users={users} platoon={platoon}/>
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