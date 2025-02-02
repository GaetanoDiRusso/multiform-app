"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/utils/ui.utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type Props = {
    value: string;
    onUpdate: (date: string) => void;
}

export function DatePickerDemo({ value, onUpdate }: Props) {
    const dateInstance = value ? new Date(value) : new Date();

    const updateDateHandler = (date: Date) => {
        onUpdate(date.toISOString().slice(0, 10))
    }

    return (
        <input type="date" value={value} onChange={e => updateDateHandler(new Date(e.target.value))}  />
    )
}
