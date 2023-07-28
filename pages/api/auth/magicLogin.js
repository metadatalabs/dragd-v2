import { unsealData } from "iron-session";
import { withSessionRoute } from "../../../util/auth";

async function magicLoginRoute(req, res) {
  const { userId } = await unsealData(req.query.seal, {
    password: "complex_password_at_least_32_characters_long",
  });

  // const user = getUserFromDatabase(userId);

  // req.session.user = {
  //   id: user.id,
  // };

  req.session.siwe = {
    address: userId,
  };

  await req.session.save();

  res.redirect(`/dashboard`);
}
export default withSessionRoute(magicLoginRoute);
