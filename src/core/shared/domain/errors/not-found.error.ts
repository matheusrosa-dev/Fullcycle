import { Entity } from '../entities/entity';

export class NotFoundError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  constructor(id: any[] | any, entity: new (...args: any[]) => Entity) {
    const isArray = Array.isArray(id);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const idsMessage = isArray ? id.join(', ') : id;

    super(`${entity.name} Not Found using ID ${idsMessage}`);

    this.name = 'NotFoundError';
  }
}
