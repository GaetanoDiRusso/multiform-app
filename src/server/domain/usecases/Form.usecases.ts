import { IFormRepository } from "@/server/domain/repositories/IFormRepository";
import { UserFormData } from "../entities/UserFormData";
import { FormStructure } from "../entities/FormStructure";
import { PFormStructure } from "@/models/PFormStructure";
import { PUserFormData } from "@/models/PUserFormData";

export class FormUseCases {

  constructor(private formRepository: IFormRepository) { }

  async getCurrentUserFormData(email: string): Promise<UserFormData | null> {
    return this.formRepository.getCurrentUserFormData(email);
  }

  async getAllUsersFormData(): Promise<UserFormData[]> {
    return this.formRepository.getAllUsersFormData();
  }

  async getFormStructure(): Promise<FormStructure> {
    return this.formRepository.getFormStructure();
  }

  async updateFormStructure(newFormStructure: PFormStructure) {
    return this.formRepository.updateFormStructure(newFormStructure);
  }

  async createOrSaveUserFormData(data: PUserFormData) {
    return this.formRepository.createOrSaveUserFormData(data);
  }
}
