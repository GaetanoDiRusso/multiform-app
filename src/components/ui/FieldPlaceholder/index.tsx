import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./card"

import { Label } from "./label"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { PFieldStructure } from '@/models/PFormStructure'

type Props = {
    fieldData: (PFieldStructure & { page: number });
    onUpdatePage: (newPage: 1 | 2 | 3) => void;
    disabled?: boolean;
}

const FieldPlaceholder = ({ fieldData, onUpdatePage, disabled }: Props) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{fieldData.id}</CardTitle>
            </CardHeader>
            <CardContent>
                <RadioGroup onValueChange={(v) => onUpdatePage(+v as 1 | 2 | 3)} defaultValue={fieldData.page.toString()}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem disabled={disabled} value="1" id={`${fieldData.id}-page-one`} />
                        <Label htmlFor={`${fieldData.id}-page-one`}>Page One</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem disabled={disabled} value="2" id={`${fieldData.id}-page-two`} />
                        <Label htmlFor={`${fieldData.id}-page-two`}>Page Two</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem disabled={disabled} value="3" id={`${fieldData.id}-page-three`} />
                        <Label htmlFor={`${fieldData.id}-page-three`}>Page Three</Label>
                    </div>
                </RadioGroup>
            </CardContent>
        </Card>
    )
}

export default FieldPlaceholder