import { sealData } from "iron-session";

export default async function generateLink(req, res) {
  //   const user = getUserFromDatabase(req.query.userId);

  const seal = await sealData(
    {
      userId: user.id,
    },
    {
      password: "complex_password_at_least_32_characters_long",
    }
  );

  return res.send(
    `Hey there ${user.name}, <a href="/api/auth/magicLogin?seal=${seal}">click here to login</a>.`
  );
}
