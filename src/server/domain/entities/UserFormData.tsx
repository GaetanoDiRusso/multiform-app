import { PUserFormData } from "@/models/PUserFormData";
import { FieldType } from "./FormStructure"

export class UserFormData {
    constructor(
        readonly data: {
            email?: string,
            password?: string,
            dateOfBirth?: string,
            streetAddress?: string,
            city?: string,
            zip?: number,
            state?: string,
            about?: string,
        }
    ) {}

    toPresentation(): PUserFormData {
        return {
            email: this.data.email,
            password: this.data.password,
            dateOfBirth: this.data.dateOfBirth,
            streetAddress: this.data.streetAddress,
            city: this.data.city,
            zip: this.data.zip,
            state: this.data.state,
            about: this.data.about,
        }
    }
}

export type FieldData = {
    id: string,
    typeOfData: FieldType,
    value: any,
}