import { z } from "zod"
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js"
import { CenteredCard } from "../components/CenteredCard.js"
import { Page } from "./templates/base.js"
import { isValidAddress } from "../util/isValidAddress.js";
import { AddressInput } from "../components/AddressInput.js";
import { Button } from "../components/Button.js";

export const newTransactionSchema = z.object({
  to: z.string().refine((value) => isValidAddress(value), {
    message: "Provided address is invalid.",
  })
})
export type NewTransaction = z.infer<typeof newTransactionSchema>

export function NewTransaction() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<NewTransaction>({
    resolver: zodResolver(newTransactionSchema),
  });

  const onSubmit: SubmitHandler<NewTransaction> = (data) => console.log(data);

  return (
    <Page>
      <CenteredCard>
        <form class="flex flex-col gap-2 w-full" onSubmit={handleSubmit(onSubmit)}>
          <p>To:</p>
          <Controller
            control={control}
            name="to"
            rules={{ required: true }}
            render={({
              field
            }) => (
              <AddressInput
                {...field}
                placeholder="Address"
              />
            )}
          />
          {errors.to && (
            <p className="text-xs text-error">
              {errors.to?.message}
            </p>
          )}
          <Button type="submit">
            Create
          </Button>
        </form>
      </CenteredCard>
    </Page>
  )
}
