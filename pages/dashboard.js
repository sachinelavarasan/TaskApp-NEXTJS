/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import NavBar from "../components/NavBar";
import { authSelector } from "../redux/Slices/authSlice";
import { taskSelector } from "../redux/Slices/TaskSlice";
import { CustomModal } from "../components/CustomModal";
import { TextInput } from "../components/TextInput";
import { DatePicker } from "../components/DatePicker";
import { addTask, getAllTasks, deleteTask } from "../redux/Slices/TaskSlice";
import TaskCard from "../components/TaskCard";
import toast from "../components/Toast";

const AddTaskSchema = Yup.object().shape({
  taskname: Yup.string().required("Task name required"),
  description: Yup.string().required("Description required"),
  date: Yup.date().required("Date of task completion required"),
});

const Dashboard = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { user } = useSelector(authSelector);
  const { tasks } = useSelector(taskSelector);

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    onSubmit,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      taskname: "",
      description: "",
      date: "",
    },
    validationSchema: AddTaskSchema,
    onSubmit: (values) => {
      const details = {
        ...values,
      };

      dispatch(
        addTask(details, () => {
          toast({ type: "success", message: "Task added successfully" });
          resetForm();
          setIsModalOpen(false);
        })
      );
    },
  });

  useEffect(() => {
    if (user) {
      dispatch(getAllTasks(user.user.id));
    }
  }, [user]);

  return (
    <>
      <NavBar user={user} router={router} />
      <div className="flex items-center  py-5 px-10">
        <div className="flex items-center justify-between w-full">
          <div>
            <h2>All Task</h2>
          </div>
          <div>
            <button
              className="bg-green-600 flex items-center justify-center rounded p-2 text-white"
              type="button"
              onClick={() => setIsModalOpen(true)}
            >
              <FiPlus className="color-[#fff] font-semibold" />
              Add Task
            </button>
          </div>
        </div>
        <CustomModal
          show={isModalOpen}
          title="Add Task"
          onHide={() => {
            setIsModalOpen(false);
          }}
        >
          <form>
            <TextInput
              id="taskname"
              label="Task name"
              placeholder="Task Name"
              type="text"
              errorMessage={errors?.taskname}
              onChange={handleChange}
              value={values.taskname}
            />
            <TextInput
              className="mt-1"
              id="description"
              label="Description"
              placeholder="Description"
              type="text"
              errorMessage={errors?.description}
              onChange={handleChange}
              value={values.description}
            />
            <DatePicker
              className="mt-1"
              id="date"
              label="Date of Task"
              placeholder="Date of Task Completion"
              errorMessage={errors?.date}
              onChange={(date) => setFieldValue("date", date)}
              value={values.date}
            />
            <button
              type="button"
              className="bg-blue-700 rounded p-2 text-white mt-2"
              onClick={() => {
                handleSubmit(onSubmit);
              }}
            >
              Add Task
            </button>
          </form>
        </CustomModal>
      </div>
      <div className="grid grid-cols-4 gap-4 px-[15px] md:grid-cols-3 sm:grid-cols-2 pb-20">
        {tasks?.map((item) => {
          return (
            <TaskCard
              key={item._id}
              taskname={item.taskname}
              description={item.description}
              date={item.dateofcompletion}
              DeleteOnClick={() => {
                dispatch(
                  deleteTask(item._id, () => {
                    toast({ type: "error", message: "Task deleted" });
                  })
                );
              }}
            />
          );
        })}
      </div>
    </>
  );
};

export default Dashboard;
