import { GeistSans } from "geist/font/sans";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={GeistSans.className}>
      <SessionProvider>
        <Component {...pageProps} />
      </SessionProvider>
    </div>
  );
};

export default MyApp;
