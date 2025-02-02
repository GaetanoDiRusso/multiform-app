import { PUserFormData } from "@/models/PUserFormData";

const LOCAL_USER_FROM_DATA_KEY = 'local_user_form_data';

export const getLocalUserFormData = () => {
    console.log({ localStorage, window });
    const localJsonData = window.localStorage.getItem(LOCAL_USER_FROM_DATA_KEY);

    console.log({localJsonData});

    if (localJsonData) return JSON.parse(localJsonData) as PUserFormData;

    return null;
}

export const setLocalUserFormData = (userFormData: PUserFormData) => {
    console.log({ localStorage, window });
    console.log("setting", userFormData)
    window.localStorage.setItem(LOCAL_USER_FROM_DATA_KEY, JSON.stringify(userFormData));
}