import { IUseCase } from '../../../../shared/application/use-case.interface';
import { CategoryFactory } from '../../../domain/category.entity';
import { ICategoryRepository } from '../../../domain/category.repository';
import {
  CategoryOutput,
  CategoryOutputMapper,
} from '../common/category-output';
import { CreateCategoryInput } from './create-category.input';

type Output = CategoryOutput;

export class CreateCategoryUseCase
  implements IUseCase<CreateCategoryInput, Output>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: CreateCategoryInput) {
    const entity = CategoryFactory.create(input);

    await this.categoryRepository.insert(entity);

    return CategoryOutputMapper.toOutput(entity);
  }
}
