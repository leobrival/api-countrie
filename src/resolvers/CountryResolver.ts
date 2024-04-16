import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Country from "../entity/Country";

@Resolver((of) => Country)
export class CountryResolver {
  @Mutation(() => Country)
  async addCountry(
    @Arg("code") code: string,
    @Arg("name") name: string,
    @Arg("emoji") emoji: string,
    @Arg("continentCode", { nullable: true }) continentCode?: string
  ): Promise<Country> {
    // Notez que continentCode est optionnel et peut être undefined
    const country = Country.create({ code, name, emoji, continentCode });
    await country.save();
    return country;
  }

  // @Query(() => [Country])
  // async countries(): Promise<Country[]> {
  //   return Country.find();
  // }

  @Query(() => Country, { nullable: true })
  async country(@Arg("code") code: string): Promise<Country | null> {
    const country = await Country.findOneBy({ code });
    return country;
  }

  @Query(() => Country, { nullable: true })
  async countryByCode(@Arg("code") code: string): Promise<Country | null> {
    const country = await Country.findOneBy({ code });
    return country || null;
  }

  @Query(() => [Country])
  async countriesByContinent(
    @Arg("continentCode") continentCode: string
  ): Promise<Country[]> {
    return Country.find({
      where: { continentCode },
    });
  }
}
