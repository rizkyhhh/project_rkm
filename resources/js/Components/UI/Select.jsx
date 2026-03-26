export default function Select({ children, ...props }) {
  return (
    <select
      {...props}
      className="w-full border rounded px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
    >
      {children}
    </select>
  );
}