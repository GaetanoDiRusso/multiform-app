export const fetchCache = 'force-no-store'

import React from "react";
import { callServerAction } from "@/utils/server-actions.utils";
import { PUserFormData } from "@/models/PUserFormData";
import { getAllUsersFormData } from "@/server/infraestructure/server-actions/FormActions";
import TableView from "./_table/TableView";

// For better folder structure, the TableView and useTableViewModel (if required) are under _table folder

const Table = async () => {
  let usersFormData: PUserFormData[] | undefined = undefined;
  
  try {
    usersFormData = await callServerAction(getAllUsersFormData());
  } catch (error) {
    return <div>Unexpected error, please try again</div>
  }

  return (
    <div className="container mx-auto py-10">
        <TableView data={usersFormData} />
    </div>
  );
};

export default Table;

