import { DatePickerDemo } from '@/components/ui/DatePicker'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { PFieldStructure, PFieldType } from '@/models/PFormStructure'
import React from 'react'

type Props = {
    field: PFieldStructure,
    currentValue: string | number,
    onUpdate: (newValue: string | number) => void,
}

const commonInputTypes: PFieldType[] = ['email', 'password', 'number', 'string']

const Field = ({ field, currentValue, onUpdate }: Props) => {
    const { label, type } = field;

    if (commonInputTypes.includes(type)) return (
        <Input onChange={e => onUpdate(e.target.value)} value={currentValue} type={type} placeholder={label} />
    )

    if (type === 'textarea') return (
        <Textarea onChange={e => onUpdate(e.target.value)} value={currentValue} placeholder={label} />
    )

    if (type === 'date') return (
        <div className='flex w-fit gap-5 align-middle'>
            <p className='align-middle'>{label}:</p>
            <DatePickerDemo onUpdate={onUpdate} value={currentValue as string} />
        </div>
    )

    return (
        <Input onChange={e => onUpdate(e.target.value)} value={currentValue} type="email" placeholder="Email" />
    )
}

export default Field