import { DataType } from "sequelize-typescript";
import { CategoryModel } from "../../category.model";
import { setupSequelize } from "../../../../../../shared/infra/testing/helpers";
import { Uuid } from "../../../../../../shared/domain/value-objects/uuid.vo";

describe("CategoryModel Integration Tests", () => {
  setupSequelize({
    models: [CategoryModel],
  });

  test("mapping props", async () => {
    const attributesMap = CategoryModel.getAttributes();
    const attributes = Object.keys(attributesMap);
    expect(attributes).toStrictEqual([
      "category_id",
      "name",
      "description",
      "is_active",
      "created_at",
    ]);

    const categoryIdAttr = attributesMap.category_id;
    expect(categoryIdAttr).toMatchObject({
      field: "category_id",
      fieldName: "category_id",
      primaryKey: true,
      type: DataType.UUID(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: "name",
      fieldName: "name",
      type: DataType.STRING(255),
      allowNull: false,
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: "description",
      fieldName: "description",
      type: DataType.TEXT(),
      allowNull: true,
    });

    const isActiveAttr = attributesMap.is_active;
    expect(isActiveAttr).toMatchObject({
      field: "is_active",
      fieldName: "is_active",
      type: DataType.BOOLEAN(),
      allowNull: false,
    });

    const createdAtAttr = attributesMap.created_at;
    expect(createdAtAttr).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      type: DataType.DATE(3),
      allowNull: false,
    });
  });

  test("create", async () => {
    const arrange = {
      category_id: new Uuid().id,
      name: "test",
      is_active: true,
      created_at: new Date(),
    };

    const category = await CategoryModel.create(arrange);

    expect(category.toJSON()).toStrictEqual(arrange);
  });
});
