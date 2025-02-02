import { PUserFormData } from "@/models/PUserFormData";
import { FormStructure } from "../entities/FormStructure";
import { UserFormData } from "../entities/UserFormData";
import { PFormStructure } from "@/models/PFormStructure";

export interface IFormRepository {
  getCurrentUserFormData(email: string): Promise<UserFormData | null>
  getAllUsersFormData(): Promise<UserFormData[]>
  getFormStructure(): Promise<FormStructure>
  updateFormStructure(newFormStructure: PFormStructure): Promise<FormStructure>
  createOrSaveUserFormData(data: PUserFormData): Promise<UserFormData>
}
