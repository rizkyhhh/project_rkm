export default function Button({ children, variant = "primary", ...props }) {
  const base = "px-4 py-2 rounded text-sm font-medium";

  const styles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    danger: "bg-red-500 text-white hover:bg-red-600",
    warning: "bg-yellow-400 text-black",
    success: "bg-green-600 text-white hover:bg-green-700",
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}