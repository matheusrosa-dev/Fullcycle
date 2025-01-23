import { IUseCase } from "../../../shared/application/use-case.interface";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { ICategoryRepository } from "../../domain/category/category.repository";

type Input = {
  id: string;
};

export class DeleteCategoryUseCase implements IUseCase<Input, void> {
  constructor(private categoryRepo: ICategoryRepository) {}

  async execute(input: Input) {
    const uuid = new Uuid(input.id);
    await this.categoryRepo.delete(uuid);
  }
}
