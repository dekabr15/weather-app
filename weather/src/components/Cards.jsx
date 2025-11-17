export default function Card({ children, className = "", ...props }) {
  const base =
    "rounded-2xl bg-[#262540] text-slate-100  flex flex-col   border-[2px] border-[#3C3B5E]";

  return (
    <div className={`${base} ${className}`} {...props}>
      {children}
    </div>
  );
}
