import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { getRepository } from "typeorm";
import Country from "../entity/Country";

@Resolver()
export class CountryResolver {
  @Query(() => [Country])
  async countries() {
    return getRepository(Country).find();
  }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string) {
    return getRepository(Country).findOne({ where: { code } });
  }

  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continentCode", { nullable: true }) continentCode?: string
  ): Promise<Country> {
    const country = getRepository(Country).create({
      code,
      name,
      emoji,
      continentCode,
    });
    return getRepository(Country).save(country);
  }

  // Ajouter d'autres mutations et queries si nécessaire
}
