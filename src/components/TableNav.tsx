"use client";
import Link from "next/link";
import { Icons } from "./Icons";
import ParadeDialog from "./ParadeDialog";
import Search from "./search";
import { buttonVariants } from "./ui/Button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/Dropdown-menu";

type Props = {
    users: any;
    platoon: any
};

const TableNav = ({ users, platoon }: Props) => {
    return (
        <div className="flex justify-between top-0 inset-x-0 h-fit z-[10] py-4 ">
            <div className="flex gap-3">
                <Search />
                <ParadeDialog usersProps={users} platoonProps={platoon} />
            </div>
            <div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Icons.DropDownDotsVertical className="mt-2  cursor-pointer" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="bg-white align-end">
                        <DropdownMenuLabel >Options</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href="/sign-up"
                                className={buttonVariants({ variant: "ghost" })}>
                                Create new user
                            </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Dialog>
                            </Dialog>
                        </DropdownMenuItem> */}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default TableNav;
