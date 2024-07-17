interface TrashModalProps{
    deleteAll: () => void
    closeTrashModal: () => void
}

export function TrashModal({deleteAll, closeTrashModal} : TrashModalProps){
    return(
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className="max-w-lg rounded-xl py-6 px-5 shadow-shape bg-zinc-900 space-y-5">
                <h2 className="text-2xl font-semibold mb-6">Você vai apagar toda lista de tarefas, deseja fazer isso?</h2>
                <div className="flex justify-center space-x-4">
                    <button onClick={deleteAll} className="bg-orange-600 py-3 w-1/2 px-6 rounded-lg hover:bg-orange-700">Sim</button>
                    <button onClick={closeTrashModal} className="border border-white py-3 px-6 w-1/2 rounded-lg hover:bg-zinc-800">Não</button>
                </div>
            </div>
        </div>
    )
}