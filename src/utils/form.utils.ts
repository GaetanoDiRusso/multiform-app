import { PFieldStructure, PFormStructure } from "@/models/PFormStructure";

export type ExtendedPFieldStructure = (PFieldStructure & { page: 1 | 2 | 3 })[];

export const toExtendedPFormStructure = (pFormStructure: PFormStructure): ExtendedPFieldStructure => [
        ...pFormStructure.pageOne.map(e => ({ ...e, page: 1 as 1 })),
        ...pFormStructure.pageTwo.map(e => ({ ...e, page: 2 as 2 })),
        ...pFormStructure.pageThree.map(e => ({ ...e, page: 3 as 3 })),
    ].sort((a, b) => a.id <= b.id ? 1 : -1);

export const fromExtendedPFormStructure = (extendedPFormStructure: ExtendedPFieldStructure) => extendedPFormStructure.reduce((acc, v) => {
    const { page, ...formStructure } = v;

    if (page === 1) {
        acc.pageOne.push(formStructure)
    }

    if (page === 2) {
        acc.pageTwo.push(formStructure)
    }

    if (page === 3) {
        acc.pageThree.push(formStructure)
    }

    return acc;
}, {
    pageOne: [],
    pageTwo: [],
    pageThree: [],
} as PFormStructure);

const FIELDS_PRIORITY = {
    email: 1,
    password: 2,
    dateOfBirth: 3,
    streetAddress: 4,
    city: 5,
    state: 6,
    zip: 7,
    about: 8,
}

export const sortPFormStructureForUI = (pFormStructure: PFormStructure) => {
    pFormStructure.pageOne.sort((a, b) => FIELDS_PRIORITY[a.id as keyof typeof FIELDS_PRIORITY] > FIELDS_PRIORITY[b.id as keyof typeof FIELDS_PRIORITY] ? 1 : -1)
    pFormStructure.pageTwo.sort((a, b) => FIELDS_PRIORITY[a.id as keyof typeof FIELDS_PRIORITY] > FIELDS_PRIORITY[b.id as keyof typeof FIELDS_PRIORITY] ? 1 : -1)
    pFormStructure.pageThree.sort((a, b) => FIELDS_PRIORITY[a.id as keyof typeof FIELDS_PRIORITY] > FIELDS_PRIORITY[b.id as keyof typeof FIELDS_PRIORITY] ? 1 : -1)
}