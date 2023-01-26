import { signal, computed } from "@preact/signals"
import { Card } from "../components/Card.tsx";
import { TestBlock } from "../components/TestBlock.tsx";

const DEFAULT_THRESHOLD = 2;
const name = signal('');
const threshold = signal(DEFAULT_THRESHOLD);
const signatories = signal([]);

const errorsName = computed(() => {
  if (!name.value) {
    return ["Name is empty"];
  }
});

const errorsThreshold = computed(() => {
  const errors: string[] = [];
  if (!threshold.value) {
    errors.push("Provide a threshold");
  }
  if (threshold.value < 2) {
    errors.push("Threshold must be greater than 2");
  }
  // if (threshold > signatories.value.length) {
  //   errors.push("Threshold must be lesser than amount of signatories");
  // }
  return errors;
})


type StateDefinition = {
  name: string;
  threshold: number;
  signatories: string[];
  errorsName: string[];
  errorsThreshold: string[];
  errorsSignatories: string[][];
};



const CreateMultisig = () => {
  // TODO proper type
  const setName = (event: any) => {
    name.value = event.target.value;
  }

  // TODO proper type
  const setThreshold = (event: any) => {
    threshold.value = event.target.valueAsNumber;
  }

  return <Card className="mt-10 px-8">
    <div className="">
      <div className="flex flex-col gap-2">
        <label className="text-gray-800">Multisig Name</label>

        <input
          className="rounded-lg border-gray-300 text-gray-900 w-full focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Multisig Name"
          type="text"
          value={name.value}
          onInput={setName}
        />
        <p>The name will not be written on chain</p>

        {errorsName.value && errorsName.value.length > 0 && (
          <div className="flex flex-col gap-2">
            {errorsName.value.map((error) => (
              <p key={error} className="text-red-600">
                {error}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
    <div className="mt-4">
      <div className="mt-2 flex gap-6 items-end">
        <div className="flex flex-col gap-2">
          <label className="text-gray-800">Threshold</label>
          <input
            className="rounded-lg border-gray-300 text-gray-900 focus:ring-1 focus:ring-pink-500 focus:border-pink-500"
            placeholder="2"
            type="number"
            value={threshold.value}
            onChange={setThreshold}
          />

          {errorsThreshold.value && errorsThreshold.value.length > 0 && (
            <div className="flex flex-col gap-2">
              {errorsThreshold.value.map((error) => (
                <p key={error} className="text-red-600">
                  {error}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
    <TestBlock className="">
      Depositor
    </TestBlock>
    <TestBlock className="">
      Add signatory
    </TestBlock>
    <TestBlock className="">
      Create
    </TestBlock>
  </Card>
}

export default CreateMultisig;