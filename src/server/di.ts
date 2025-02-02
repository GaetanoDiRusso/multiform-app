import { FormUseCases } from "./domain/usecases/Form.usecases";
import { FormRepositoryImp } from "./utils/form/FormRepositoryImp";

export const formUseCases = new FormUseCases(new FormRepositoryImp());