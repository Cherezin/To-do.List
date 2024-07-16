
interface VerificationProps{
    closeModal: () => void
}

export function Verification({closeModal} : VerificationProps){
    return(
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
            <div className="rounded-xl py-6 px-6 shadow-shape bg-zinc-900 space-y-5">
                <div className="flex- items-center justify-between">
                    <h2 className="text-2xl font-semibold mb-6">Tarefa já adicionada!</h2>
                    <button onClick={closeModal} className="bg-orange-600 py-3 w-full rounded-lg hover:bg-zinc-50 hover:text-orange-600">Okay</button>
                </div>
            </div>
        </div>
    )
}