import { IUseCase } from "../../../shared/application/use-case.interface";
import { NotFoundError } from "../../../shared/domain/errors/not-found.error";
import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import {
  Category,
  CategoryFactory,
} from "../../domain/category/category.entity";
import { ICategoryRepository } from "../../domain/category/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./common/category-output";

type Input = {
  id: string;
  name?: string;
  description?: string | null;
  is_active?: boolean;
};

type Output = CategoryOutput;

export class UpdateCategoryUseCase implements IUseCase<Input, Output> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: Input) {
    const uuid = new Uuid(input.id);
    const category = await this.categoryRepository.findById(uuid);

    if (!category) {
      throw new NotFoundError(uuid.id, Category);
    }

    if (input.name) {
      category.changeName(input.name);
    }

    if (("description" as keyof Input) in input) {
      category.changeDescription(input.description);
    }

    if (input.is_active === true) {
      category.activate();
    }

    if (input.is_active === false) {
      category.deactivate();
    }

    await this.categoryRepository.update(category);

    return CategoryOutputMapper.toOutput(category);
  }
}
