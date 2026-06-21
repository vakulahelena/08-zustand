import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { fetchNoteById } from "@/lib/api";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);
  const title = `${note.title}`;
  const description = note.content?.substring(0, 160) || "View note details";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://08-zustand-one-azure.vercel.app/notes/${id}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: note.title,
        },
      ],
    },
  };
}

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};
export default NoteDetails;
