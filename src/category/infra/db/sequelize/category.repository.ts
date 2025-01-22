import { Op } from "sequelize";
import { NotFoundError } from "../../../../shared/domain/errors";
import { SearchParams } from "../../../../shared/domain/repository/search-params";
import { Uuid } from "../../../../shared/domain/value-objects";
import { Category } from "../../../domain/category/category.entity";
import {
  CategorySearchResult,
  ICategoryRepository,
} from "../../../domain/category/category.repository";
import { CategoryModel } from "./category.model";
import { CategoryModelMapper } from "./category-model-mapper";

export class CategorySequelizeRepository implements ICategoryRepository {
  sortableFields = ["name", "created_at"];

  constructor(private categoryModel: typeof CategoryModel) {}

  private async _get(id: string) {
    return await this.categoryModel.findByPk(id);
  }

  async insert(entity: Category) {
    const model = CategoryModelMapper.toModel(entity);

    await this.categoryModel.create(model);
  }

  async bulkInsert(entities: Category[]) {
    const models = entities.map((entity) =>
      CategoryModelMapper.toModel(entity)
    );

    await this.categoryModel.bulkCreate(models);
  }

  async update(entity: Category) {
    const id = entity.category_id.id;
    const foundModel = await this._get(id);

    if (!foundModel) {
      throw new NotFoundError(id, this.getEntity());
    }

    const model = CategoryModelMapper.toModel(entity);

    await this.categoryModel.update(model, {
      where: {
        category_id: id,
      },
    });
  }

  async delete(category_id: Uuid) {
    const model = await this._get(category_id.id);

    if (!model) {
      throw new NotFoundError(category_id.id, this.getEntity());
    }

    await this.categoryModel.destroy({
      where: {
        category_id: category_id.id,
      },
    });
  }

  async findById(category_id: Uuid) {
    const model = await this._get(category_id.id);

    if (!model) return null;

    const category = CategoryModelMapper.toEntity(model);

    return category;
  }

  async findAll() {
    const models = await this.categoryModel.findAll();

    if (!models?.length) return [];

    const categories = models.map((model) =>
      CategoryModelMapper.toEntity(model)
    );

    return categories;
  }

  getEntity() {
    return Category;
  }

  async search(props: SearchParams<string>) {
    const limit = props.per_page;
    const offset = (props.page - 1) * limit;

    const { rows: models, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: {
          name: { [Op.like]: `%${props.filter}%` },
        },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? {
            order: [[props.sort, props.sort_dir]],
          }
        : {
            order: [["created_at", "desc"]],
          }),
      limit,
      offset,
    });

    const searchResult = new CategorySearchResult({
      items: models.map((model) => CategoryModelMapper.toEntity(model)),
      current_page: props.page,
      per_page: limit,
      total: count,
    });

    return searchResult;
  }
}
