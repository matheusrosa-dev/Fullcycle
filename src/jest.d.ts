import { FieldsErrors } from './core/shared/domain/validators/types';

declare global {
  namespace jest {
    interface Matchers<R> {
      notificationContainsErrorMessages: (expected: Array<FieldsErrors>) => R;
      toBeValueObject: (expected: ValueObject) => R;
    }
  }
}
