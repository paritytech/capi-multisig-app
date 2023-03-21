export function InputError({ msg = "" }: { msg: string | undefined }) {
  return (
    <div class="field-error">
      {msg}
    </div>
  )
}
