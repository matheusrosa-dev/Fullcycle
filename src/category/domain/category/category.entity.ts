import { Entity } from "../../../shared/domain/entities";
import { EntityValidationError } from "../../../shared/domain/validators";
import { Uuid } from "../../../shared/domain/value-objects";
import { CategoryFakeBuilder } from "./category-faker.builder";
import { CategoryValidatorFactory } from "./category.validator";
import { CategoryConstructorProps, CategoryCreateCommand } from "./types";

export class Category extends Entity {
  category_id: Uuid;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    super();
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props?.description ?? null;
    this.is_active = props.is_active;
    this.created_at = props.created_at ?? new Date();
  }

  get entity_id() {
    return this.category_id;
  }

  changeName(name: string) {
    this.name = name;
    Category.validate(this);
  }

  changeDescription(description: string) {
    this.description = description;
    Category.validate(this);
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  static validate(entity: Category) {
    const validator = CategoryValidatorFactory.create();

    const isValid = validator.validate(entity);

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  toJSON() {
    return {
      category_id: this.category_id.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}

export class CategoryFactory {
  static create(props: CategoryCreateCommand) {
    const category = new Category({
      category_id: new Uuid(),
      name: props.name,
      description: props?.description,
      is_active: props.is_active ?? true,
      created_at: props?.created_at || new Date(),
    });

    Category.validate(category);

    return category;
  }

  static fake() {
    return CategoryFakeBuilder;
  }
}
