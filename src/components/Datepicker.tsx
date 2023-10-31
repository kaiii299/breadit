"use client"

import * as React from "react"
import { addDays, format, isValid, parseISO, parseJSON } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange(start_date: string, end_date: string) {

  function isDateValid(dateString: any) {

    const parsedDate = new Date(dateString);

    return !isNaN(parsedDate.getTime());
  }

  const [date, setDate] = React.useState<DateRange | any | undefined>(() => {

    // Your initial JSON object (e.g., from an API or user input)
    const initialDateObject = {
      from: new Date(start_date),
      to: new Date(end_date),
    };

    console.log(initialDateObject);


    // Check if both start date and end date are valid; if not, set them to current dates
    if (isDateValid(initialDateObject.from) && isDateValid(initialDateObject.to &&

      initialDateObject.from != null && initialDateObject.to != null)) {

      return initialDateObject;

    }

    else {

      return {
        // Give todays date + 1
        from: new Date(),
        to: addDays(new Date(), 1),
      };
    }
  });


  return {
    date,
    render: (
      <div className={cn("grid gap-2 ")}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"subtle"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={1}
            />
          </PopoverContent>
        </Popover>
      </div>
    )
  }
}