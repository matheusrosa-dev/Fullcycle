import { IUseCase } from "../../../shared/application/use-case.interface";
import { CategoryFactory } from "../../domain/category/category.entity";
import { ICategoryRepository } from "../../domain/category/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./common/category-output";

type Input = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

type Output = CategoryOutput;

export class CreateCategoryUseCase implements IUseCase<Input, Output> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: Input) {
    const entity = CategoryFactory.create(input);

    await this.categoryRepository.insert(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}
