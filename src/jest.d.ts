import { FieldsErrors } from "./shared/domain/validators";

declare global {
  namespace jest {
    interface Matchers<R> {
      notificationContainsErrorMessages: (
        expected: Array<string | { [key: string]: string[] }>
      ) => R;
    }
  }
}
