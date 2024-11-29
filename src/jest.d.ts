import { FieldsErrors } from "./shared/domain/validators";

declare global {
  namespace jest {
    interface Matchers<R> {
      containsErrorMessages: (expect: FieldsErrors) => R;
    }
  }
}
