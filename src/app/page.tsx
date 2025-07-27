"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const tools = [
    {
      title: "Whitespace Cleaner",
      description: "Remove extra spaces and new lines from text.",
      link: "/text-cleaner-tool",
    },
    {
      title: "Diff & Compare",
      description: "Compare two texts or JSON side by side.",
      link: "/text-diff-tool",
    },
  ];

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">DevUtil</h1>
        <p className="text-muted-foreground text-lg mt-2">
          Handy tools for developers, all in one place.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 w-full max-w-4xl">
        {tools.map((tool) => (
          <Link href={tool.link} key={tool.title}>
            <Card className="hover:shadow-lg transition cursor-pointer">
              <CardHeader>
                <CardTitle>{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{tool.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}
