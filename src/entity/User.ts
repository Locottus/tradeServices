import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @Field()
  @Column("text")
  name: string;

  @Field()
  @Column("text")
  cellPhone: string;

  @Field()
  @Column("text")
  DPI: string;
  
  @Field()
  @Column("text")
  customerType: string;

  @Field()
  @Column("text")
  verificationLVL: string;

  @Field()
  @Column("text")
  address: string;

  @Field()
  @Column("text")
  bank: string;

  @Field()
  @Column("text")
  bankAccountNumber: string;

  @Field()
  @Column("text")
  bankAccountName: string;

  @Field()
  @Column("text")
  taxID: string;
  
  @Field()
  @Column("text")
  taxIDName: string;

  @Field()
  @Column("text")
  taxIDAddress: string;

  @Field()
  @Column("text")
  USDBalance: number;

  @Field()
  @Column("text")
  BTCBalance: number;

  @Field()
  @Column("text")
  BTCAddress: string;

  @Field()
  @Column("text")
  securityQuestion1: string;

  @Field()
  @Column("text")
  securityQuestion2: string;

  
  @Column("text")
  securityAnswer1: string;

  
  @Column("text")
  securityAnswer2: string;

  @Field()
  @Column("text")
  photoDPI: string;

  @Field()
  @Column("text")
  photoAddress: string;

  @Field()
  @Column("text")
  withdrawLimitBTC: string;

  @Field()
  @Column("text")
  depositLimitUSD: string;

  @Field()
  @Column("text")
  WithdrawalLimitUSD: string;

  @Field()
  @Column("text")
  status: number;


  @Column("int", { default: 0 })
  tokenVersion: number;
}
