import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "PriceBrush — Quote any decorating job in 60 seconds" },
    {
      name: "description",
      content:
        "Quotes and invoices for UK painters and decorators. Just say the job. No per-user fees. No sales calls.",
    },
  ];
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col justify-center gap-4 p-6">
      <h1 className="text-3xl font-semibold">PriceBrush</h1>
      <p className="text-lg">Quote any decorating job in 60 seconds. Just say it.</p>
      <p className="text-base text-gray-600 dark:text-gray-400">Coming soon.</p>
    </main>
  );
}
