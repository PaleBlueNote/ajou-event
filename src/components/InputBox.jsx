export default function InputBox(props) {
  return (
    <div className="flex items-center mt-2">
      <h3 className="w-40 mt-3 text-sm font-medium leading-6 text-gray-900">
        {props.label}
      </h3>
      <div className={`${props.inputWrapperSize} mt-2`}>
        <input className="w-full h-10 rounded-md border-0 py-1.5 text-sm text-gray-500 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-slate-50"></input>
      </div>
    </div>
  )
}
