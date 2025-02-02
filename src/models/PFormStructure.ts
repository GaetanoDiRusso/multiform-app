export type PFormStructure = {
  pageOne: PFieldStructure[],
  pageTwo: PFieldStructure[],
  pageThree: PFieldStructure[],
}

export type PFieldStructure = {
  id: string,
  label: string,
  type: PFieldType,
};

export type PFieldType = 'number' | 'datetime' | 'date' | 'time' | 'string' | 'textarea' | 'email' | 'password';