"use client";

import React, { useState } from "react";
import { updateStatusValidators } from "@/lib/validators/users";
import { SubmitHandler, useForm } from "react-hook-form";
import { cStatus } from "@/lib/constants";
import { DatePickerWithRange } from "./Datepicker";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import RichText from "./RichText";
import useRichText from "./RichText";

type FormInputs = {
    id: string;
    status: updateStatusValidators;
    start_date: Date | undefined;
    end_date: Date | undefined;
    comments?: string;
};

type Props = {
    statusProps: updateStatusValidators;
    idProps: string;
};

const UpdateStatus = ({ statusProps, idProps }: Props) => {
    
    const status = statusProps.status;
    const prevComments = statusProps.comments;
    
    // Drop down option
    const [selectedOption, setSelectedOption] = useState(status);
    
    // Form
    const { register, handleSubmit } = useForm<FormInputs>();
    
    // get rich text
    const {richTextComments, richTextrender} = useRichText(prevComments);

    // Get date
    const {render, date} = DatePickerWithRange(statusProps.start_date, statusProps.end_date)

    const onSubmit: SubmitHandler<FormInputs> = (data) => {

        // Default values
        data.status = selectedOption;
        data.start_date = date?.from
        data.end_date = date?.to
        data.comments = richTextComments

        // console.log(data);
        
        updateUser(data)
    };

    const router = useRouter();

    // Mutation functon is any funciton that handle any data fetching using axios
    const { mutate: updateUser, isLoading } = useMutation({

        mutationFn: (updateUser: FormInputs) => {
            return axios.patch(`/api/updateStatus/${idProps}`, updateUser)
        },

        onError: (error: Error) => {
            console.error(error);

            toast({
                title: 'Error',
                description: `${error.message}`,
                variant: 'destructive',
            })

        },
        onSuccess: () => {

            toast({
                title: 'Status Updated 🐊',
                description: '',
                variant: 'default',
            })

            router.push('/')
            router.refresh()
        }
    })


    return (
        <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
            <div className="flex flex-col">
                {/* Dropdown */}
                <label className="font-bold mb-2">Status</label>
                <Select onValueChange={setSelectedOption}>
                    <SelectTrigger className="w-[180px] uppercase">
                        <SelectValue placeholder={status} />
                    </SelectTrigger>
                    <SelectContent>
                        {cStatus.map((res: any, i: any) => {
                            return (
                                <SelectItem className="uppercase" key={i} value={res}>
                                    {res}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>

                {/* Remove date picker if in camp or '' */}
                {selectedOption == "In Camp" || selectedOption == "" ? (
                    <div></div>
                ) : (
                    <div className="mt-3">
                        <label className="font-bold">Duration</label>
                        <div className="mt-3">
                            {render}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex flex-col py-3">
                <label className="font-bold my-3">Notes</label>
                {richTextrender}
            </div>

            <div>
                <button className="bg-zinc-900 text-zinc-100 hover:bg-zinc-800 px-4 py-3 w-1/4 active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors " type="submit">Save</button>
            </div>
        </form>
    );
};

export default UpdateStatus;
