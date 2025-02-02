"use server";

import { createCustomErrorResponse } from "@/server/utils/CustomError";
import { ServerActionResponse } from "@/models/ServerActionResponse";
import { PUserFormData } from "@/models/PUserFormData";
import { formUseCases } from "@/server/di";
import { PFormStructure } from "@/models/PFormStructure";
import { revalidatePath } from "next/cache";

// In the future, we should use an Auth system to avoid sending the email, and instead, use the JWT to retrieve user data
export const getCurrentUserFormData = async (email: string): Promise<ServerActionResponse<PUserFormData | null>> => {
  try {
    const formData = await formUseCases.getCurrentUserFormData(email);
    return {
      ok: true,
      // This toPresentation() method is to be sure that non sensitive data is sent, and also because
      // data should be sent as JSON parseable when using Server Actions
      data: formData ? formData.toPresentation() : null,
    }
  } catch (e) {
    return { ok: false, error: createCustomErrorResponse(e) }
  }
};

export const getAllUsersFormData = async (): Promise<ServerActionResponse<PUserFormData[]>> => {
  try {
    const data = await formUseCases.getAllUsersFormData();
    return {
      ok: true,
      // This toPresentation() method is to be sure that non sensitive data is sent, and also because
      // data should be sent as JSON parseable when using Server Actions
      data: data.map(d => d.toPresentation()),
    }
  } catch (e) {
    return { ok: false, error: createCustomErrorResponse(e) }
  }
};

export const getFormStructure = async (): Promise<ServerActionResponse<PFormStructure>> => {
  try {
    const formStrucure = await formUseCases.getFormStructure();
    return {
      ok: true,
      data: formStrucure.toPresentation(),
    }
  } catch (e) {
    return { ok: false, error: createCustomErrorResponse(e) }
  }
};

export const updateFormStructure = async (newFormStructure: PFormStructure): Promise<ServerActionResponse<PFormStructure>> => {
  try {
    const formStrucure = await formUseCases.updateFormStructure(newFormStructure);
    revalidatePath("/admin")
    revalidatePath("/table")
    revalidatePath("/")
    return {
      ok: true,
      data: formStrucure.toPresentation(),
    }
  } catch (e) {
    return { ok: false, error: createCustomErrorResponse(e) }
  }
};

export const createOrSaveUserFormData = async (data: PUserFormData): Promise<ServerActionResponse<PUserFormData>> => {
  try {
    const userFormData = await formUseCases.createOrSaveUserFormData(data);
    revalidatePath("/admin")
    revalidatePath("/table")
    revalidatePath("/")
    return {
      ok: true,
      data: userFormData.toPresentation(),
    }
  } catch (e) {
    return { ok: false, error: createCustomErrorResponse(e) }
  }
};
