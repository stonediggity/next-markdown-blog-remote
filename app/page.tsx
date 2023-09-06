import Posts from "./components/Posts";

export default function Home() {
  return (
    <main className="px-6 mx-auto">
      <p className="mt-12 mb-12 text-xl text-center w-2/3 mx-auto dark:text-white">
        Hello and Welcome Interlocutor👋&nbsp;
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold">Sir Ribbington</span>.
        </span>
      </p>
      <Posts />
    </main>
  );
}
