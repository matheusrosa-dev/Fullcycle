import { ValueObject } from "../value-objects";

export abstract class Entity {
  abstract entity_id: ValueObject;
  abstract toJSON(): object;
}
