import * as uuid from "uuid";

import { ValueObject } from "./value-object";

export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || "id must be a valid uuid");
    this.name = "InvalidUuidError";
  }
}

export class Uuid extends ValueObject {
  readonly id: string;

  constructor(id?: string) {
    super();
    this.id = id || uuid.v4();
    this.validate();
  }

  private validate() {
    const isValid = uuid.validate(this.id);

    if (!isValid) {
      throw new InvalidUuidError();
    }
  }

  toString() {
    return this.id;
  }
}
