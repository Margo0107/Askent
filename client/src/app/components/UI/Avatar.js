export default function Avatar({ src, className, ...props }) {
  const getAvatar = (avatar) => {
    if (!avatar) return "/auth-img.png";
    if (avatar.startsWith("http")) return avatar;
    return `${process.env.NEXT_PUBLIC_API_URL}${avatar}`;
  };
  return (
    <img
      src={getAvatar(src)}
      alt="avatar"
      className={`rounded-full ${className}`}
      {...props}
    />
  );
}
