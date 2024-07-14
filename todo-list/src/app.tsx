import { ArrowRight } from "lucide-react"
import { useState } from "react"

export function App() {
  const [isTaskAdd, setIsTaskAdd] = useState(false)

  function addtask(){
    setIsTaskAdd(true)
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
              placeholder="Adicione uma tarefa" 
              className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
              <button onClick={addtask}>
              <ArrowRight />
              </button>
          </div>
        </div>  

        <div className='space-y-4'>

          {isTaskAdd &&(
            <p>oi</p>
          )}
        </div>
      </div>
    </div>
    
  )
}


