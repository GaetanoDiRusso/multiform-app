import { PFormStructure } from "@/models/PFormStructure";
import { PUserFormData } from "@/models/PUserFormData";
import { FormStructure } from "@/server/domain/entities/FormStructure";
import { UserFormData } from "@/server/domain/entities/UserFormData";
import { IFormRepository } from "@/server/domain/repositories/IFormRepository";

import AWS from 'aws-sdk';

AWS.config = new AWS.Config();

export class FormRepositoryImp implements IFormRepository {
    private s3 = new AWS.S3();
    private bucketName = "multiform-app-bucket";
    private userDataKey = "users-form-data.json";
    private formStructureKey = "form-structure.json";

    constructor() { };

    async getCurrentUserFormData(email: string): Promise<UserFormData | null> {
        try {
            const data = await this.s3.getObject({ Bucket: this.bucketName, Key: this.userDataKey }).promise();
            const users: PUserFormData[] = JSON.parse(data.Body?.toString() || '[]');
            console.log("BACK", { users })
            const pUserFormData = users.find(user => user?.email === email);
            console.log("BACK", { pUserFormData })

            if (!pUserFormData) return null;

            return new UserFormData(pUserFormData)
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
    }

    async getAllUsersFormData(): Promise<UserFormData[]> {
        try {
            const data = await this.s3.getObject({ Bucket: this.bucketName, Key: this.userDataKey }).promise();
            const pData: PUserFormData[] = JSON.parse(data.Body?.toString() || '[]');
            return pData.map(e => new UserFormData(e))
        } catch (error) {
            console.error("Error fetching all users' form data:", error);
            return [];
        }
    }

    async getFormStructure(): Promise<FormStructure> {
        try {
            const data = await this.s3.getObject({ Bucket: this.bucketName, Key: this.formStructureKey }).promise();
            const pFormStructure: PFormStructure = JSON.parse(data.Body?.toString() || '{}');

            return new FormStructure(pFormStructure);
        } catch (error) {
            console.error("Error fetching form structure:", error);
            throw new Error("Failed to retrieve form structure.");
        }
    }

    async updateFormStructure(newFormStructure: PFormStructure): Promise<FormStructure> {
        try {
            await this.s3.putObject({
                Bucket: this.bucketName,
                Key: this.formStructureKey,
                Body: JSON.stringify(newFormStructure),
                ContentType: "application/json"
            }).promise();

            return new FormStructure(newFormStructure);
        } catch (error) {
            console.error("Error updating form structure:", error);
            throw new Error("Failed to update form structure.");
        }
    }

    async createOrSaveUserFormData(data: PUserFormData): Promise<UserFormData> {
        try {
            const existingData = await this.getAllUsersFormData();
            const pExistingData = existingData.map(e => e.toPresentation());

            const index = pExistingData.findIndex(user => user.email === data.email);

            if (index !== -1) {
                pExistingData[index] = data;
            } else {
                pExistingData.push(data);
            }

            await this.s3.putObject({
                Bucket: this.bucketName,
                Key: this.userDataKey,
                Body: JSON.stringify(pExistingData),
                ContentType: "application/json"
            }).promise();

            return new UserFormData(data);
        } catch (error) {
            console.error("Error saving user form data:", error);
            throw new Error("Failed to save user form data.");
        }
    }
}