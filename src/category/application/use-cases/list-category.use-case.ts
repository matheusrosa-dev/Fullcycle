import {
  PaginationOutput,
  PaginationOutputMapper,
} from "../../../shared/application/pagination-output";
import { IUseCase } from "../../../shared/application/use-case.interface";
import { SortDirection } from "../../../shared/domain/repository/search-params";
import {
  CategoryFilter,
  CategorySearchParams,
  CategorySearchResult,
  ICategoryRepository,
} from "../../domain/category/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "./common/category-output";

type Input = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: CategoryFilter | null;
};

type Output = PaginationOutput<CategoryOutput>;

export class ListCategoryUseCase implements IUseCase<Input, Output> {
  constructor(private readonly categoryRepository: ICategoryRepository) {}

  async execute(input: Input) {
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
