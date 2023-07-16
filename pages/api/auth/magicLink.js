// pages/api/magicLogin.ts

import { unsealData } from "iron-session";
import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(magicLoginRoute, {
  cookieName: "myapp_cookiename",
  password: "complex_password_at_least_32_characters_long",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

async function magicLoginRoute(req, res) {
  const { userId } = await unsealData(req.query.seal, {
    password: "complex_password_at_least_32_characters_long",
  });

  const user = getUserFromDatabase(userId);

  req.session.user = {
    id: user.id,
  };

  await req.session.save();

  res.redirect(`/dashboard`);
}
