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

  @Column("text")
  name: string;

  @Column("text")
  cellPhone: string;

  @Column("text")
  DPI: string;

  @Column("text")
  customerType: string;

  @Column("text")
  verificationLVL: string;

  @Column("text")
  address: string;

  @Column("text")
  bank: string;

  @Column("text")
  bankAccountNumber: string;

  @Column("text")
  bankAccountName: string;

  @Column("text")
  taxID: string;

  @Column("text")
  taxIDName: string;

  @Column("text")
  taxIDAddress: string;

  @Column("text")
  USDBalance: number;

  @Column("text")
  BTCBalance: number;

  @Column("text")
  BTCAddress: string;

  @Column("text")
  securityQuestion1: string;

  @Column("text")
  securityQuestion2: string;

  @Column("text")
  securityAnswer1: string;

  @Column("text")
  securityAnswer2: string;

  @Column("text")
  photoDPI: string;

  @Column("text")
  photoAddress: string;

  @Column("text")
  withdrawLimitBTC: string;

  @Column("text")
  depositLimitUSD: string;

  @Column("text")
  WithdrawalLimitUSD: string;

  @Column("text")
  status: number;


  @Column("int", { default: 0 })
  tokenVersion: number;
}
