export default function Avatar({ src, className, ...props }) {
  const getAvatar = (avatar) => {
    if (!avatar) return "/auth-img.png";
    return avatar;
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
