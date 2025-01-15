import { Entity } from "../entities";

export class NotFoundError extends Error {
  constructor(id: any[] | any, entity: new (...args: any[]) => Entity) {
    const isArray = Array.isArray(id);

    const idsMessage = isArray ? id.join(", ") : id;

    super(`${entity.name} Not Found using ID ${idsMessage}`);

    this.name = "NotFoundError";
  }
}
