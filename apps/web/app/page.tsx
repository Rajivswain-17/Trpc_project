import { api } from "~/trpc/server";

export default async function Home() {
   
  return (
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <div>
        <h1 className="text-3xl">Streamyst - Stream in Style</h1>
        <h2>{}</h2>
      </div>
    </main>
  );
}
