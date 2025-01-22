import { IUseCase } from "../../shared/application/use-case.interface";
import { CategoryFactory } from "../domain/category/category.entity";
import { ICategoryRepository } from "../domain/category/category.repository";

type Input = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

type Output = {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;
};

export class CreateCategoryUseCase implements IUseCase<Input, Output> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: Input) {
    const entity = CategoryFactory.create(input);

    await this.categoryRepository.insert(entity);

    return {
      id: entity.category_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    };
  }
}
