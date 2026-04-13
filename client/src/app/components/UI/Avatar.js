export default function Avatar({ src, className, ...props }) {
  const url = src ? `http://localhost:5000${src}` : "/auth-img.png";

  return (
    <img
      src={url}
      alt="avatar"
      className={`rounded-full ${className}`}
      {...props}
    />
  );
}
