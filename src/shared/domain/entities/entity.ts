import { ValueObject } from "../value-objects/value-object";

export abstract class Entity {
  abstract entity_id: ValueObject;
  abstract toJSON(): object;
}
