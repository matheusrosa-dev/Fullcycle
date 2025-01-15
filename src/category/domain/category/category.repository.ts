import { IRepository } from "../../../shared/domain/repository";
import { Uuid } from "../../../shared/domain/value-objects";
import { Category } from "./category.entity";

export interface ICategoryRepository extends IRepository<Category, Uuid> {}
