export default async function sitemap() {
  const res = await fetch(`http://localhost:5000/api/question`, {
    cache: "no-store",
  });
  const question = await res.json();
  const questionUrl = question.map((q) => ({
    url: `http://localhost:3000/home/question/${q._id}`,
    lastModifided: new Date(),
  }));
  return [
    {
      url: `http://localhost:3000`,
      lastModifided: new Date(),
    },
    {
      url: `http://localhost:3000/home`,
      lastModified: new Date(),
    },
    ...questionUrl,
  ];
}
