export default function Input(props) {
  return (
    <input
      {...props}
      className="w-full border rounded px-3 py-2 mt-1 focus:ring focus:ring-blue-200"
    />
  );
}