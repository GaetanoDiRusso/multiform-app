import { PFormStructure } from "@/models/PFormStructure";

export class FormStructure {
    constructor(
        readonly structure: {
            pageOne: FieldStructure[],
            pageTwo: FieldStructure[],
            pageThree: FieldStructure[],
        },
    ) { };

    toPresentation(): PFormStructure {
        return {
            pageOne: this.structure.pageOne,
            pageTwo: this.structure.pageTwo,
            pageThree: this.structure.pageThree,
        }
    }
}

export type FieldStructure = {
    id: string,
    label: string,
    type: FieldType,
};

export type FieldType = 'number' | 'datetime' | 'date' | 'time' | 'string' | 'textarea' | 'email' | 'password';