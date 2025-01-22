import { Uuid } from "../../../../shared/domain/value-objects/uuid.vo";

export type CategoryConstructorProps = {
  category_id: Uuid;
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
