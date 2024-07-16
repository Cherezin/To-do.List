import { Check, Circle, CircleCheck, Pencil, X } from "lucide-react"

interface Task {
    id: number;
    text: string;
    isDone: boolean;
    isEditing: boolean;
}

interface TaskListProps{
    tasks: Task[]
    TaskCompleted: (id: number) => void
    updateTask: (id: number, newText: string ) => void
    toggleEditTask: (id: number) => void
    removeTask: (id: number) => void
    setConfirmModal: (value: boolean) => void
}

export function TaskList({
    tasks,
    TaskCompleted,
    updateTask,
    toggleEditTask, 
    removeTask,
    setConfirmModal,
} : TaskListProps){
    return(
        tasks.map(task => (
              <li key={task.id}>
                  
            <div className='h-16 px-4 rounded-xl flex items-center shadow-shape gap-3 bg-orange-400'>
                <button onClick={() => TaskCompleted(task.id)} >
                    {task.isDone ? 
                    <CircleCheck className="text-green-700"/> :
                    <Circle /> }
                </button>

                {task.isEditing ? (
                    <input
                        type="text"
                        value={task.text}
                        className="bg-transparent placeholder-zinc-50 text-zinc-50 outline-none"
                        onChange={(e) => updateTask(task.id, e.target.value)}
                        placeholder="Edite a tarefa" 
                        autoFocus
                    />
                ) : (<span> {task.text} </span>)}
                <div className="ml-auto flex gap-2">
                    <button onClick={() => {toggleEditTask(task.id)}} className=" ml-auto rounded-lg">{task.isEditing ? <Check className="text-green-700"/> : <Pencil className="size-6"/>}</button>
                    <button onClick={() => {removeTask(task.id), setConfirmModal(true)}} className=" ml-auto rounded-lg bg-orange-300 hover:bg-red-300">
                    <X className="text-red-700"/>
                    </button>
                </div> 
            </div>
        </li>   
        ))

        
    )
}