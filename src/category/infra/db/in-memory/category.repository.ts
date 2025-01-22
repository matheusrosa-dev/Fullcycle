import { SortDirection } from "../../../../shared/domain/repository/search-params";
import { Uuid } from "../../../../shared/domain/value-objects";
import { InMemorySearchableRepository } from "../../../../shared/infra/db";

import { Category } from "../../../domain/category/category.entity";
import {
  CategoryFilter,
  ICategoryRepository,
} from "../../../domain/category/category.repository";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category, Uuid>
  implements ICategoryRepository
{
  sortableFields = ["name", "created_at"];

  protected async applyFilter(
    categories: Category[],
    filter: CategoryFilter
  ): Promise<Category[]> {
    if (!filter) {
      return categories;
    }

    const filtered = categories.filter((category) => {
      const lowerCaseFilter = filter.toLowerCase();
      const lowerCaseName = category.name.toLowerCase();

      return lowerCaseName.includes(lowerCaseFilter);
    });

    return filtered;
  }

  protected applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null
  ) {
    if (!sort) {
      return super.applySort(items, "created_at", "desc");
    }

    return super.applySort(items, sort, sort_dir);
  }

  getEntity() {
    return Category;
  }
}
