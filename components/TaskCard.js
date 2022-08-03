import moment from "moment";

export default function TaskCard({
  taskname,
  description,
  date,
  EditOnClick,
  DeleteOnClick,
}) {
  return (
    <div className="flex justify-between items-center shadow-[0px_0px_3px_3px_rgba(0,0,0,0.1)] rounded bg-[#fff] p-[12px]">
      <div className="text-ellipsis mr-[4px] flex flex-col">
        <h2 className="text-green-700 text-[16px] font-medium mb-0">
          {taskname}
        </h2>
        <div className="text-[#3d4457] text-[12px] font-medium flex flex-col">
          <span>{description}</span>
          <span className="mt-1">{moment(date).format("d-MM-yyyy")}</span>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="py-[4px] px-[6px] font-semibold text-[14px] border border-solid border-[#2b7a78] text-[#d50000] rounded-md "
          type="button"
          onClick={DeleteOnClick}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
