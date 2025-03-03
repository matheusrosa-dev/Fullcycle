import { isEqual } from "lodash";

export abstract class ValueObject {
  equals(vo: this) {
    if (vo === null || vo === undefined) {
      return false;
    }

    if (vo.constructor.name !== this.constructor.name) {
      return false;
    }

    return isEqual(this, vo);
  }
}
