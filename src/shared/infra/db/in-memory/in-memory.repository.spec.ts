import { Entity } from "../../../domain/entities";
import { NotFoundError } from "../../../domain/errors";
import { Uuid } from "../../../domain/value-objects";
import { InMemoryRepository } from "./in-memory.repository";

type StubEntityConstructor = {
  entity_id?: Uuid;
  name: string;
  price: number;
};

class StubEntity extends Entity {
  entity_id: Uuid;
  name: string;
  price: number;

  constructor(props: StubEntityConstructor) {
    super();
    this.entity_id = props.entity_id || new Uuid();
    this.name = props.name;
    this.price = props.price;
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price,
    };
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, Uuid> {
  getEntity() {
    return StubEntity;
  }
}

describe("InMemoryRepository Unit Tests", () => {
  let repo: StubInMemoryRepository;

  beforeEach(() => {
    repo = new StubInMemoryRepository();
  });

  test("should insert a new entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Product 1",
      price: 100,
    });

    await repo.insert(entity);

    expect(repo.items).toHaveLength(1);
    expect(repo.items[0].toJSON()).toEqual(entity.toJSON());
  });

  test("should bulk insert entities", async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: "Product 1",
        price: 100,
      }),
      new StubEntity({
        entity_id: new Uuid(),
        name: "Product 2",
        price: 200,
      }),
    ];

    await repo.bulkInsert(entities);

    expect(repo.items).toHaveLength(2);
    expect(repo.items[0].toJSON()).toEqual(entities[0].toJSON());
    expect(repo.items[1].toJSON()).toEqual(entities[1].toJSON());
  });

  test("should update an entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Product 1",
      price: 100,
    });

    await repo.insert(entity);

    const updatedEntity = new StubEntity({
      entity_id: entity.entity_id,
      name: "Product 2",
      price: 200,
    });

    await repo.update(updatedEntity);

    expect(repo.items).toHaveLength(1);
    expect(repo.items[0].toJSON()).toEqual(updatedEntity.toJSON());
  });

  test("should throw an error when updating a non-existent entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Product 1",
      price: 100,
    });

    await expect(repo.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id.id, StubEntity)
    );
  });

  test("should delete an entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Product 1",
      price: 100,
    });

    await repo.insert(entity);

    await repo.delete(entity.entity_id);

    expect(repo.items).toHaveLength(0);
  });

  test("should throw an error when deleting a non-existent entity", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Product 1",
      price: 100,
    });

    await expect(repo.delete(entity.entity_id)).rejects.toThrow(
      new NotFoundError(entity.entity_id.id, StubEntity)
    );
  });

  test("should find an entity by id", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Product 1",
      price: 100,
    });

    await repo.insert(entity);

    const foundEntity = await repo.findById(entity.entity_id);

    expect(foundEntity).toEqual(entity);
  });

  test("should return null when finding a non-existent entity by id", async () => {
    const entity = new StubEntity({
      entity_id: new Uuid(),
      name: "Product 1",
      price: 100,
    });

    const foundEntity = await repo.findById(entity.entity_id);

    expect(foundEntity).toBeNull();
  });

  test("should find all entities", async () => {
    const entities = [
      new StubEntity({
        entity_id: new Uuid(),
        name: "Product 1",
        price: 100,
      }),
      new StubEntity({
        entity_id: new Uuid(),
        name: "Product 2",
        price: 200,
      }),
    ];

    await repo.bulkInsert(entities);

    const foundEntities = await repo.findAll();

    expect(foundEntities).toEqual(entities);
  });

  test("should return an empty array when finding all entities", async () => {
    const foundEntities = await repo.findAll();

    expect(foundEntities).toEqual([]);
  });

  test("should get entity class", () => {
    expect(repo.getEntity()).toBe(StubEntity);
  });
});
