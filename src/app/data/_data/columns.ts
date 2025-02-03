"use client"

import { PUserFormData } from "@/models/PUserFormData"
import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type UserFormData = PUserFormData

export const columns: ColumnDef<UserFormData>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "password",
        header: "Password",
    },
    {
        accessorKey: "dateOfBirth",
        header: "Date Of Birth",
    },
    {
        accessorKey: "streetAddress",
        header: "Street Address",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "zip",
        header: "ZIP",
    },
    {
        accessorKey: "about",
        header: "About",
    },
]