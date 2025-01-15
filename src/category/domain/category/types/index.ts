import { Uuid } from "../../../../shared/domain/value-objects";

export type CategoryConstructorProps = {
  id: Uuid;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: Date;
};

export type CategoryCreateCommand = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};
