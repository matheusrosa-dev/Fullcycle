import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from "class-validator";

type CreateCategoryInputProps = {
  name: string;
  description?: string | null;
  is_active?: boolean;
};

export class CreateCategoryInput {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;

  constructor(props: CreateCategoryInputProps) {
    if (!props) return;

    this.name = props.name;
    this.description = props?.description;
    this.is_active = props?.is_active;
  }
}

export class ValidateCreateCategoryInput {
  static validate(input: CreateCategoryInputProps) {
    return validateSync(input);
  }
}
