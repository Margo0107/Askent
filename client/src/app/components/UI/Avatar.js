export default function Avatar({ src, className }) {
  const url = src ? `http://localhost:5000/api/author/uploads/${src}` : "/auth-img.png";
  return <img src={url} alt="avatar" className={`rounded-full ${className}`} />;
}
