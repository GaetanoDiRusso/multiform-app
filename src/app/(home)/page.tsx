export const fetchCache = 'force-no-store'

import { ExtendedPFieldStructure, sortPFormStructureForUI } from "@/utils/form.utils";
import HomeView from "./_home/HomeView"
import { callServerAction } from "@/utils/server-actions.utils";
import { getFormStructure } from "@/server/infraestructure/server-actions/FormActions";
import { PFormStructure } from "@/models/PFormStructure";

export default async function Home() {
  let formStructure: PFormStructure | undefined = undefined;

  try {
    formStructure = await callServerAction(getFormStructure());
    sortPFormStructureForUI(formStructure);
  } catch (error) {
    console.log({ error });
    return <div>Unexpected error, please try again</div>
  }

  return <HomeView formStructure={formStructure} />
}
