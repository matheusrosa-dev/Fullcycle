import { Entity } from "../../shared/domain/entities/entity";
import { Uuid } from "../../shared/domain/value-objects/uuid.vo";
import { ValueObject } from "../../shared/domain/value-objects/value-object";
import { CategoryFakeBuilder } from "./category-faker.builder";
import { CategoryValidatorFactory } from "./category.validator";
import { CategoryConstructorProps, CategoryCreateCommand } from "./types";

export class Category extends Entity {
  category_id: Uuid;
  name: string;
  description: string | null;
  is_active: boolean;
  created_at: Date;

  constructor(props: CategoryConstructorProps) {
    super();
    this.category_id = props.category_id ?? new Uuid();
    this.name = props.name;
    this.description = props.description ?? null;
    this.is_active = props.is_active ?? true;
    this.created_at = props.created_at ?? new Date();
  }

  get entity_id(): ValueObject {
    return this.category_id;
  }

  static create(props: CategoryCreateCommand): Category {
    const category = new Category(props);
    //category.validate();
    category.validate(["name"]);
    return category;
  }

  changeName(name: string): void {
    this.name = name;
    this.validate(["name"]);
  }

  changeDescription(description: string): void {
    this.description = description;
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  validate(fields?: string[]) {
    const validator = CategoryValidatorFactory.create();
    return validator.validate(this.notification, this, fields);
  }

  static fake() {
    return CategoryFakeBuilder;
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
      created_at: new Date(),
    });

    category.validate(["name"]);

    return category;
  }

  static fake() {
    return CategoryFakeBuilder;
  }
}
