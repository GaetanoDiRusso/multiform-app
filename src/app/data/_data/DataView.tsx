import { DataTable } from '@/components/ui/Table'
import { PUserFormData } from '@/models/PUserFormData'
import React, { useMemo } from 'react'
import { columns } from './columns'

type Props = {
    data: PUserFormData[],
}

const DataView = ({ data }: Props) => {

    return (
        <div>
            <h1 className='pb-5 text-center text-3xl'>Users Data</h1>
        
            <DataTable columns={columns} data={data} />
        </div>
    )
}

export default DataView