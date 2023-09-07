import Posts from "./components/Posts";
import ProfilePic from "./components/ProfilePic";

export const revalidate = 86400;

export default function Home() {
  return (
    <div className="mx-auto">
      <ProfilePic />
      <p className="mt-12 mb-12 text-lg text-center w-2/3 mx-auto dark:text-white">
        Hello and Welcome Interlocutor👋&nbsp;
        <span className="whitespace-nowrap">
          I'm <span className="font-bold">Sir Ribbington</span>.
        </span>
      </p>
      {/* @ts-expect-error Server COmponent */}

      <Posts />
    </div>
  );
}
