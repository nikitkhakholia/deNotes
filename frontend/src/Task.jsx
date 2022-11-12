const Task = ({ task = null }) => {
  return (
    <div
      className="
                basis-1/3 p-2 m-2 
                bg-gray-800 rounded
                "
    >
      {task.taskDescription}
    </div>
  )
}

export default Task
