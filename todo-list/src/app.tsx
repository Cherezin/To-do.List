import { ArrowRight, X } from "lucide-react"
import { useState } from "react"

interface Task{
  id: number;
  text: string;
  isDone: boolean;
}

export function App() {
  const [task, setTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([])



    function addTask(){
      if(task.trim() !== ""){
        const newTask = {
          id: tasks.length,
          text: task,
          isDone: false,
        }
        setTasks([...tasks, newTask]);
        setTask('')
      }
    }

    function removeTask(id: number){
      setTasks(tasks.filter((task)=> {
        return task.id !== id
      }))
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
              onChange={(e) => setTask(e.target.value)} // Atualiza o estado task quando o valor do input muda
              placeholder="Adicione uma tarefa" 
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
              <button onClick={addTask}>
              <ArrowRight />
              </button>
          </div>
        </div>  

        <div className='space-y-4'>
          {tasks.map(task => (
            <div className='h-16 px-4 rounded-xl flex items-center shadow-shape gap-3 bg-orange-400'>
              <span >
                {task.text}
              </span>
              <button onClick={() => removeTask(task.id)} className="ml-auto">
                <X />
                .
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    
  )
}


