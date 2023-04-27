export function InputError({ msg = "" }: { msg: string | undefined }) {
  return (
    <div className="field-error">
      {msg}
    </div>
  )
}
