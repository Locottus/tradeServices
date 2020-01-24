import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
  Int
} from "type-graphql";
import { hash, compare } from "bcryptjs";
import { User } from "./entity/User";
import { MyContext } from "./MyContext";
import { createRefreshToken, createAccessToken } from "./auth";
import { isAuth } from "./isAuth";
import { sendRefreshToken } from "./sendRefreshToken";
import { getConnection } from "typeorm";
import { verify } from "jsonwebtoken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return "hi!";
  }

  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    console.log(payload);
    return `your user id is: ${payload!.userId}`;
  }

  @Query(() => [User])
  users() {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  me(@Ctx() context: MyContext) {
    const authorization = context.req.headers["authorization"];

    if (!authorization) {
      return null;
    }

    try {
      const token = authorization.split(" ")[1];
      const payload: any = verify(token, process.env.ACCESS_TOKEN_SECRET!);
      return User.findOne(payload.userId);
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  @Mutation(() => Boolean)
  async logout(@Ctx() { res }: MyContext) {
    sendRefreshToken(res, "");

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("could not find user");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("bad password");
    }

    // login successful

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Arg("name") name : string,
    @Arg("cellPhone") cellPhone : string,
    @Arg("DPI") DPI : string,
    @Arg("customerType") customerType : string,
    @Arg("verificationLVL") verificationLVL : string,
    @Arg("address") address : string,
    @Arg("bank") bank : string,
    @Arg("bankAccountNumber") bankAccountNumber : string,
    @Arg("bankAccountName") bankAccountName : string,
    @Arg("taxID") taxID : string,
    @Arg("taxIDName") taxIDName : string,
    @Arg("taxIDAddress") taxIDAddress : string,
    @Arg("USDBalance") USDBalance : number,
    @Arg("BTCBalance") BTCBalance : number,
    @Arg("BTCAddress") BTCAddress : string,
    @Arg("securityQuestion1") securityQuestion1 : string,
    @Arg("securityQuestion2") securityQuestion2 : string,
    @Arg("securityAnswer1") securityAnswer1 : string,
    @Arg("securityAnswer2") securityAnswer2 : string,
    @Arg("photoDPI") photoDPI : string,
    @Arg("photoAddress") photoAddress : string,
    @Arg("withdrawLimitBTC") withdrawLimitBTC : string,
    @Arg("depositLimitUSD") depositLimitUSD : string,
    @Arg("WithdrawalLimitUSD") WithdrawalLimitUSD : string,
    @Arg("status") status : number
    
  ) {
    const hashedPassword = await hash(password, 12);

    try {
      await User.insert({
        email,
        password: hashedPassword,
        name,
        cellPhone,
        DPI,
        customerType,
        verificationLVL,
        address,
        bank,
        bankAccountNumber,
        bankAccountName,
        taxID,
        taxIDName,
        taxIDAddress,
        USDBalance,
        BTCBalance,
        BTCAddress,
        securityQuestion1,
        securityQuestion2,
        securityAnswer1 ,
        securityAnswer2 ,
        photoDPI,
        photoAddress,
        withdrawLimitBTC,
        depositLimitUSD,
        WithdrawalLimitUSD,
        status,
        
      });
    } catch (err) {
      console.log(err);
      return false;
    }

    return true;
  }
}
