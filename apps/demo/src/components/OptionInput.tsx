interface OptionInputProps {
  label: string;
  onChange: (value: number) => void;
  value: number;
}
export default function OptionInput(props: OptionInputProps) {
  const { label, value, onChange } = props;
  return (
    <label className="form-control w-full max-w-xs">
      <span className="label-text text-lg">{label}</span>
      <input
        type="number"
        className="input input-bordered"
        onChange={(e) => onChange(parseInt(e.target.value))}
        value={value}
      />
    </label>
  );
}
