import { Uuid } from "../../../shared/domain/value-objects";
import { Category, CategoryFactory } from "../category/category.entity";

describe("Category Unit Tests", () => {
  let validateSpy: jest.SpyInstance;

  beforeEach(() => {
    validateSpy = jest.spyOn(Category, "validate");
  });

  describe("Constructor", () => {
    test("should instance a category", () => {
      const now = new Date();
      const uuid = new Uuid();

      const category = new Category({
        id: uuid,
        name: "Movie",
        is_active: false,
        created_at: now,
      });

      expect(uuid.equals(category.id)).toBe(true);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBe(now);
      expect(validateSpy).toHaveBeenCalledTimes(0);
    });

    test("should instance a category with description", () => {
      const now = new Date();
      const uuid = new Uuid();

      const category = new Category({
        id: uuid,
        name: "Movie",
        description: "Category for movie",
        is_active: false,
        created_at: now,
      });

      expect(uuid.equals(category.id)).toBe(true);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Category for movie");
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBe(now);
      expect(validateSpy).toHaveBeenCalledTimes(0);
    });
  });

  describe("Create command", () => {
    test("should create a category", () => {
      const category = CategoryFactory.create({
        name: "Movie",
        is_active: false,
      });

      expect(category.id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBeNull();
      expect(category.is_active).toBe(false);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should create a category with description", () => {
      const category = CategoryFactory.create({
        name: "Movie",
        description: "Category for movie",
      });

      expect(category.id).toBeInstanceOf(Uuid);
      expect(category.name).toBe("Movie");
      expect(category.description).toBe("Category for movie");
      expect(category.is_active).toBe(true);
      expect(category.created_at).toBeInstanceOf(Date);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Methods", () => {
    test("should change name", () => {
      const category = CategoryFactory.create({
        name: "Movie",
      });

      category.changeName("Other Movie");
      expect(category.name).toBe("Other Movie");
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test("should change description", () => {
      const category = CategoryFactory.create({
        name: "Movie",
      });

      category.changeDescription("Other description");
      expect(category.description).toBe("Other description");
      expect(validateSpy).toHaveBeenCalledTimes(2);
    });

    test("should activate category", () => {
      const category = CategoryFactory.create({
        name: "Movie",
      });

      category.activate();
      expect(category.is_active).toBe(true);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should deactivate category", () => {
      const category = CategoryFactory.create({
        name: "Movie",
      });

      category.deactivate();
      expect(category.is_active).toBe(false);
      expect(validateSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("Category validator", () => {
    test("should throw an error on provide invalid name", () => {
      expect(() =>
        CategoryFactory.create({
          name: null,
        })
      ).containsErrorMessages({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        CategoryFactory.create({
          name: "",
        })
      ).containsErrorMessages({
        name: ["name should not be empty"],
      });

      expect(() =>
        CategoryFactory.create({
          name: 5 as any,
        })
      ).containsErrorMessages({
        name: [
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });

      expect(() =>
        CategoryFactory.create({
          name: "a".repeat(256),
        })
      ).containsErrorMessages({
        name: ["name must be shorter than or equal to 255 characters"],
      });
    });

    test("should throw an error on provide invalid description", () => {
      expect(() =>
        CategoryFactory.create({
          name: "Movie",
          description: 1 as any,
        })
      ).containsErrorMessages({
        description: ["description must be a string"],
      });
    });

    test("should throw an error on provide invalid is_active", () => {
      expect(() =>
        CategoryFactory.create({
          name: "Movie",
          is_active: "a" as any,
        })
      ).containsErrorMessages({
        is_active: ["is_active must be a boolean value"],
      });
    });
  });
});
