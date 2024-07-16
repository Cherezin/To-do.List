import { ArrowRight, Check, Circle, CircleCheck, Pencil, X } from "lucide-react"
import { useState } from "react"

interface Task{
  id: number;
  text: string;
  isDone: boolean;
  isEditing: boolean;
}

export function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [verification, setVerification] = useState(false)


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
    }

    function removeTask(id: number){
      setTasks(tasks.filter( task => task.id !== id))
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
      setTasks(tasks.map (task => task.id === id ?
        {...task, text: newText} : task)
      )}

      function closeModal(){
        setVerification(false)
      }



  return (
    <div className="flex items-center justify-center h-screen bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-600 px-6 text-center space-y-10">
        <div className=' flex flex-col items-center gap-3'>
          
          <h1 className="text-zinc-100 text-3xl font-semibold">Lista de Tarefas</h1>
          <p className="text-zinc-400 text-sm">Organize melhor seu dia adicionando tarefas com a nossa lista de tarefas!</p>
        </div>
        <div className='h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3'>
          <div className='flex items-center gap-2 flex-1'>
              <input 
              type="text" 
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Adicione uma tarefa" 
              autoFocus
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
              <button onClick={addTask}>
              <ArrowRight />
              </button>
          </div>
        </div>
         
        <ul>
          <div className='space-y-4'>
            
            {tasks.map(task => (
              <li key={task.id}>
              
                <div className='h-16 px-4 rounded-xl flex items-center shadow-shape gap-3 bg-orange-400'>
                  <button onClick={() => TaskCompleted(task.id)} >{task.isDone ? <CircleCheck className="text-green-700"/> : <Circle /> }</button>
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
                  <button onClick={() => {removeTask(task.id)}} className=" ml-auto rounded-lg bg-orange-300 hover:bg-red-300">
                    <X className="text-red-700"/>
                  </button>
                </div> 
                </div>
              </li>
            ))}
            
            {verification && (
              <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                <div className="rounded-xl py-6 px-6 shadow-shape bg-zinc-900 space-y-5">
                    <div className="flex- items-center justify-between">
                      <h2 className="text-2xl font-semibold mb-6">Tarefa já adicionada!</h2>
                      <button onClick={closeModal} className="bg-orange-600 py-3 w-full rounded-lg hover:bg-zinc-50 hover:text-orange-600">Okay</button>
                    </div>
                </div>
              </div>
            )}

          </div>
        </ul>
      </div>
    </div>
    
  )
}


