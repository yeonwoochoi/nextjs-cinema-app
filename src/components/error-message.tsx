export default function ErrorMessage({ message }: { message: string | null}) {
  return (
    <div className="text-2xl mt-2 text-red-600">
      <span className="mr-2">⚠</span>{message}
    </div>
  )
}