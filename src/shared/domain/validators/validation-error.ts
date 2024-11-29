import { FieldsErrors } from "./types";

export class EntityValidationError extends Error {
  constructor(public error: FieldsErrors, message = "Validation error") {
    super(message);
  }

  count() {
    return Object.keys(this.error).length;
  }
}
