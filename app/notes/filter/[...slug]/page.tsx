import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { NoteTag } from "@/types/note";
import { Metadata } from "next";

type NotesPageProps = { params: Promise<{ slug: string[] }> };
type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const filterTag = slug[0] === "all" ? "All Notes" : slug[0];

  const title = `Notes - ${filterTag}`;
  const description = `Browse notes filtered by ${filterTag.toLowerCase()}. Manage your notes efficiently with NoteHub.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-one-azure.vercel.app/notes/filter/${slug.join("/")}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: `Notes - ${filterTag}`,
        },
      ],
    },
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : (slug[0] as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag, 1],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
