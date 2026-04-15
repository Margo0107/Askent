export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/question/${id}`,
    {
      cache: "no-store",
    },
  );
  const question = await res.json();
  return {
    title: question.title,
    description: question.content?.slice(0, 150),
  };
}
import ClientPage from "./clientPage";
export default async function Page({ params }) {
  const { id } = await params;
  return <ClientPage id={id} />;
}
