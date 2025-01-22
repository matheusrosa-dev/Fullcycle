import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../domain/category/category.entity";
import { CategoryModel, CategoryModelProps } from "./category.model";

export class CategoryModelMapper {
  static toModel(entity: Category): CategoryModelProps {
    return CategoryModel.build({
      category_id: entity.category_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at,
    }).toJSON();
  }

  static toEntity(model: CategoryModel): Category {
    const entity = new Category({
      category_id: new Uuid(model.category_id),
      name: model.name,
      description: model.description,
      is_active: model.is_active,
      created_at: model.created_at,
    });

    Category.validate(entity);

    return entity;
  }
}
