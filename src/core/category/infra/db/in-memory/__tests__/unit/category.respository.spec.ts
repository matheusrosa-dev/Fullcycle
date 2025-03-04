import { CategoryFactory } from "../../../../../domain/category.entity";
import { CategoryInMemoryRepository } from "../../category.repository";

describe("CategoryInMemoryRepository", () => {
  let repository: CategoryInMemoryRepository;

  beforeEach(() => (repository = new CategoryInMemoryRepository()));
  it("should no filter items when filter object is null", async () => {
    const items = [CategoryFactory.fake().aCategory().build()];
    const filterSpy = jest.spyOn(items, "filter" as any);

    const itemsFiltered = await repository["applyFilter"](items, null!);
    expect(filterSpy).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(items);
  });

  it("should filter items using filter parameter", async () => {
    const items = [
      CategoryFactory.fake().aCategory().withName("test").build(),
      CategoryFactory.fake().aCategory().withName("TEST").build(),
      CategoryFactory.fake().aCategory().withName("fake").build(),
    ];
    const filterSpy = jest.spyOn(items, "filter" as any);

    const itemsFiltered = await repository["applyFilter"](items, "TEST");
    expect(filterSpy).toHaveBeenCalledTimes(1);
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it("should sort by created_at when sort param is null", async () => {
    const created_at = new Date();

    const items = [
      CategoryFactory.fake()
        .aCategory()
        .withName("test")
        .withCreatedAt(created_at)
        .build(),
      CategoryFactory.fake()
        .aCategory()
        .withName("TEST")
        .withCreatedAt(new Date(created_at.getTime() + 100))
        .build(),
      CategoryFactory.fake()
        .aCategory()
        .withName("fake")
        .withCreatedAt(new Date(created_at.getTime() + 200))
        .build(),
    ];

    const itemsSorted = repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it("should sort by name", async () => {
    const items = [
      CategoryFactory.fake().aCategory().withName("c").build(),
      CategoryFactory.fake().aCategory().withName("b").build(),
      CategoryFactory.fake().aCategory().withName("a").build(),
    ];

    let itemsSorted = repository["applySort"](items, "name", "asc");
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);

    itemsSorted = repository["applySort"](items, "name", "desc");
    expect(itemsSorted).toStrictEqual([items[0], items[1], items[2]]);
  });
});
