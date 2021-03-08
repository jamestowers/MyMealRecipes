import { google } from "googleapis";

const googleConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  redirect: process.env.GOOOGLE_AUTH_REDIRECT,
};

/**
 * This scope tells google what information we want to request.
 */
const defaultScope = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
];

/**
 * Create the google auth object which gives us access to talk to google's apis.
 */
function createConnection() {
  return new google.auth.OAuth2(
    googleConfig.clientId,
    googleConfig.clientSecret,
    googleConfig.redirect
  );
}

/**
 * Get a url which will open the google sign-in page and request access to the scope provided (such as calendar events).
 */
const getConnectionUrl = (oauth2Client: any) =>
  oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent", // access type and approval prompt will force a new refresh token to be made each time signs in
    scope: defaultScope,
  });

/**
 * Create the google url to be sent to the client.
 */
export const getAuthURL = () => {
  const oauth2Client = createConnection();
  return getConnectionUrl(oauth2Client);
};

export const getUserFromCode = async (
  code: string
): Promise<{ googleUser: any; tokens: any } | undefined> => {
  try {
    const oauth2Client = createConnection();

    // get the auth "tokens" from the request
    const { tokens } = await oauth2Client.getToken(code);

    // add the tokens to the google api so we have access to the account
    oauth2Client.setCredentials(tokens);

    // get user info
    const { data } = await google
      .oauth2("v2")
      .userinfo.get({ auth: oauth2Client });

    return { googleUser: data, tokens };
  } catch (err) {
    console.log(err);
  }
};
