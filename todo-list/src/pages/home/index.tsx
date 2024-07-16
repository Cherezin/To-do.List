import { ArrowRight, Trash2, } from "lucide-react"
import { useRef, useState } from "react"
import './app.css'
import { DeleteModal } from "./delete";
import { Verification } from "./verification";
import { TrashModal } from "./trash-modal";
import { TaskList } from "./task-list";

interface Task{
  id: number;
  text: string;
  isDone: boolean;
  isEditing: boolean;
}

export function CreateTaskList() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [verification, setVerification] = useState(false)
  const [confirmModal, setConfirmModal] = useState(false)
  const [taskIdToDelete, setTaskIdToDelete] = useState<number | null>(null);
  const [isTrash, setIsTrash] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const [isTrashModal, setIsTrashModal] = useState(false)

    function addTask(){
      const existingTask = tasks.some(existingTask => existingTask.text === task.trim())

      if(existingTask) return setVerification(true)

      if(task.trim() !== ""){
        const newTask = {
          id: tasks.length,
          text: task,
          isDone: false,
          isEditing: false,
        }
        setTasks([...tasks, newTask]);
        setTask('')
      }

      if (inputRef.current) {
        inputRef.current.focus();
      }

      setIsTrash(true)
    }

    function removeTask(id: number){
      setConfirmModal(true)
      setTaskIdToDelete(id)
    }

    function confirmRemoveTask(){
        if(taskIdToDelete !== null){
          setTasks(tasks.filter( task => task.id !== taskIdToDelete))
          setConfirmModal(false)
          setTaskIdToDelete(null)
      }
    }

    function TaskCompleted(id: number){
      setTasks(tasks.map ( task => task.id === id ?
        {...task, isDone: !task.isDone} : task
      ))
    }

    function toggleEditTask (id: number){
      setTasks(tasks.map (task => task.id === id ? 
        {...task, isEditing: !task.isEditing} : task
        ))
    }

    function updateTask(id: number, newText: string ){
      const verify = tasks.some(task => task.text === newText)
      if(verify) return setVerification(true)

      setTasks(tasks.map (task => task.id === id ?
        {...task, text: newText} : task)
      )}

      function closeModal(){
        setVerification(false)
      }

      function closeConfirmModal(){
        setConfirmModal(false)
      }

      function deleteAll(){
        setTasks([])
        setIsTrash(false)
        setIsTrashModal(false)
      }

      function closeTrashModal(){
        setIsTrashModal(false)
      }
      function openTrashModal(){
        setIsTrashModal(true)
      }
      


  return (
    <div className="flex items-center justify-center h-screen bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-600 px-6 text-center space-y-10">
        <div className=' flex flex-col items-center gap-3'>
          
          <h1 className="text-zinc-100 text-3xl font-semibold">Lista de Tarefas</h1>
          <p className="text-zinc-400 text-sm">Organize melhor seu dia adicionando tarefas com a nossa lista de tarefas!</p>
        </div>
        <div className="flex gap-3">
        <div className='h-16 bg-zinc-900 px-4 flex-1 rounded-xl flex items-center shadow-shape gap-3'>
          <div className='flex items-center gap-2 flex-1'>
              <input 
              type="text" 
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Adicione uma tarefa" 
              ref={inputRef}
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
              <button onClick={addTask}>
              <ArrowRight />
              </button>
          </div>
        </div>
        {isTrash && (
            <button onClick={openTrashModal} className="px-1 rounded-lg border border-zinc-700 hover:bg-red-900">
              <Trash2 />
            </button>
          )}
        </div>
         
        <ul>
          
            <div className="max-h-96 overflow-y-auto pr-4">
              <div className='space-y-4'>
                
                {<TaskList 
                    tasks={tasks}
                    TaskCompleted={TaskCompleted}
                    updateTask={updateTask}
                    toggleEditTask={toggleEditTask}
                    removeTask={removeTask}
                    setConfirmModal={setConfirmModal}
                />}
                
                {verification && (
                    <Verification
                        closeModal={closeModal}
                    />
                )} 

                {confirmModal && (
                    <DeleteModal
                        confirmRemoveTask={confirmRemoveTask}
                        closeConfirmModal={closeConfirmModal}
                    />
                )}

                {isTrashModal && (
                    <TrashModal
                        closeTrashModal={closeTrashModal}
                        deleteAll={deleteAll}
                    />
                )}
              
              </div>
            </div>
          
        </ul>
        
      </div>
    </div>
    
  )
}


