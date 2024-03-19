import Link from "next/link";

export const AuthLayout = ({ children }) => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="w-[370px] space-y-12">
        <div>{children}</div>
        <div className="flex justify-center p-3">
          <Link href="/" className="link">
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
};
