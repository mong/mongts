import "../styles/globals.css";
import Analytics from "@aws-amplify/analytics";
import Auth from "@aws-amplify/auth";

const amplifyConfig = {
  Auth: {
    identityPoolId: "eu-west-1:5a6f2d83-1892-4399-9704-952cb327d798",
    region: "eu-west-1",
  },
};
//Initialize Amplify
Auth.configure(amplifyConfig);

const analyticsConfig = {
  AWSPinpoint: {
    // Amazon Pinpoint App Client ID
    appId: "27a93aa3c7a14b29b6fd3f379f42b506",
    // Amazon service region
    region: "eu-west-1",
    mandatorySignIn: false,
  },
};

Analytics.configure(analyticsConfig);

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
