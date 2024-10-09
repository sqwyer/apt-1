import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { GoogleIcon } from "~/components/icons/GoogleIcon";
import { Test } from "~/components/Test";

function SignInButton({
  status,
}: {
  status: "authenticated" | "loading" | "unauthenticated";
}) {
  return (
    <button
      className="flex flex-row items-center gap-3 rounded-md bg-red-600 px-6 py-3 font-medium text-white hover:bg-red-700 disabled:opacity-50 disabled:hover:bg-red-600"
      disabled={status != "unauthenticated"}
      onClick={() => signIn("google")}
    >
      {status === "unauthenticated" ? (
        <>
          <GoogleIcon />
          <p>Sign in with Google</p>
        </>
      ) : (
        <>
          <p>Loading...</p>
        </>
      )}
    </button>
  );
}

export default function Home() {
  const { data: user, status: userStatus } = useSession();

  return (
    <>
      <Head>
        <title>Pulliam-Bivens Tutoring - APT1</title>
        <meta
          name="description"
          content="Pulliam-Bivens Tutoring ACT Practice Test"
        />
        <link rel="icon" href="/shield.png" type="image/png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center p-2">
        {userStatus != "authenticated" ? (
          <>
            <SignInButton status={userStatus} />
            <p className="mt-2 text-xs text-gray-600">
              You must sign in to access the practice test.
            </p>
          </>
        ) : (
          <Test user={user} />
        )}
      </main>
    </>
  );
}
