"use client";

import { cStatus } from "@/lib/constants";
import { updateStatusValidators } from "@/lib/validators/users";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DatePickerWithRange } from "./Datepicker";

import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { addDays } from "date-fns";
import { useRouter } from "next/navigation";
import useRichText from "./RichTextStatus";
import { Button } from "./ui/Button";
import useInput from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";

type FormInputs = {
    id: string;
    status: updateStatusValidators;
    start_date: Date | undefined;
    end_date: Date | undefined;
    comments?: string;
    other_comments? : string
};

type Props = {
    statusProps: updateStatusValidators;
    idProps: string;
};

const UpdateStatus = ({ statusProps, idProps }: Props) => {
    
    const status = statusProps.status;
    const prevComments = statusProps.comments;
    const other_comments = statusProps.other_comments
    
    // Drop down option
    const [selectedOption, setSelectedOption] = useState(status);
    
    // Form
    const { register, handleSubmit } = useForm<FormInputs>();
    
    // get rich text
    const {richTextComments, richTextrender} = useRichText(prevComments);

    // Get date
    const {render: renderDatePicker, date} = DatePickerWithRange(statusProps.start_date, statusProps.end_date)

    let {inputRender, inputValue} = useInput("Reason", other_comments)

    const onSubmit: SubmitHandler<FormInputs> = (data) => {

        // Default values
        data.status = selectedOption;

        // Reset to today's date if status is in camp
        if(selectedOption == 'In Camp'){
            data.start_date = new Date()
            data.end_date = addDays(new Date(),1)
        }else{
            data.start_date = date?.from
            data.end_date = date?.to
        }
        data.comments = richTextComments

        data.other_comments = inputValue;

        
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
                title: `Status Updated 🐊`,
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
                            {/* Date Picker */}
                            {renderDatePicker}
                        </div>
                    </div>
                )}
            </div>
            {selectedOption == 'Others' || selectedOption == 'On Course'? (
                <div className="mt-3">
                    {inputRender}
                </div>
            ): (<div></div>)}
            <div className="flex flex-col py-3">
                <label className="font-bold my-3">Long Term Status e.g. excuse Helmet</label>
                {richTextrender}
            </div>

            <div>
                <Button>Save</Button>
            </div>
        </form>
    );
};

export default UpdateStatus;
