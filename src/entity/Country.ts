import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export default class Country extends BaseEntity {
  @Field(() => ID)
  @PrimaryColumn()
  code!: string;

  @Field()
  @Column()
  name!: string;

  @Field()
  @Column()
  emoji!: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  continentCode?: string;
}
