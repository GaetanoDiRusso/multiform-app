import { PFieldStructure } from '@/models/PFormStructure'
import { PUserFormData } from '@/models/PUserFormData'
import React from 'react'
import Field from './Field'

type Props = {
    title: string,
    fields: PFieldStructure[],
    userFormData: PUserFormData,
    onUpdateField: (fieldId: keyof PUserFormData, newValue: string | number) => void,
}

const FormPage = ({ title, fields, userFormData, onUpdateField }: Props) => {
    return (
        <div className='flex flex-col gap-5'>
            <h1 className='mx-auto text-3xl'>{title}</h1>

            {fields.map(f => <Field key={f.id} field={f} currentValue={userFormData[f.id as keyof PUserFormData] ?? ''} onUpdate={v => onUpdateField(f.id as keyof PUserFormData, v)} />)}
        </div>
    )
}

export default FormPage