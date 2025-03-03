import {
  PaginationOutput,
  PaginationOutputMapper,
} from "../../../../shared/application/pagination-output";
import { IUseCase } from "../../../../shared/application/use-case.interface";
import { SortDirection } from "../../../../shared/domain/repository/search-params";
import {
  CategoryFilter,
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from "../../../domain/category.repository";
import {
  CategoryOutput,
  CategoryOutputMapper,
} from "../common/category-output";

export class ListCategoryUseCase
  implements IUseCase<ListCategoriesInput, ListCategoriesOutput>
{
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: ListCategoriesInput) {
    const params = new CategorySearchParams(input);

    const searchResult = await this.categoryRepository.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategorySearchResult) {
    const outputItems = searchResult.items.map((item) =>
      CategoryOutputMapper.toOutput(item)
    );

    return PaginationOutputMapper.toOutput(outputItems, searchResult);
  }
}

export type ListCategoriesInput = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: CategoryFilter | null;
};

export type ListCategoriesOutput = PaginationOutput<CategoryOutput>;
