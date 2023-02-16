import type { FC } from "react";
import { signIn } from "next-auth/react";

export const Auth: FC = () => {
  return (
    <div>
      <button
        className="rounded bg-zinc-800 py-2 px-4 font-bold text-white hover:bg-zinc-700"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signIn("github")}
      >
        GitHub Auth
      </button>
    </div>
  );
};
