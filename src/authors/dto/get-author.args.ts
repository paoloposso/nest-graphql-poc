import { MinLength } from 'class-validator';
import { Field, ArgsType } from '@nestjs/graphql';
import { PaginationArgs } from './pagination.args'

@ArgsType()
class GetAuthorArgs extends PaginationArgs {
  @Field({ nullable: true })
  firstName?: string;

  @Field({ defaultValue: '' })
  @MinLength(3)
  lastNamex: string;
}