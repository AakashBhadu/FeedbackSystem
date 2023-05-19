export default function FeedbackCreate({onFeedbackCreated}) {

    function handleFeedbackCreate(event) {
        event.preventDefault()
        const feedback = {
            "title": event.target[0].value,
            "description": event.target[1].value,
            "submitter": event.target[2].value,
            "submittermail": event.target[3].value
        }
        onFeedbackCreated(feedback)
    }

    return (
        <div className="fixed z-10 flex w-full h-full bg-slate-950 bg-opacity-40 justify-center items-center">
            <form className="flex flex-col gap-4 justify-around bg-white p-4 px-8 rounded"
                onSubmit={handleFeedbackCreate}
            >
                <p className="text-center m-4 text-xl font-bold">Create Feedback</p>
                <div>
                    <label className="pb-4">Title</label>
                    <input className="w-full border border-solid border-black text-black p-2 rounded focus:drop-shadow focus:outline-none focus:ring-indigo-500 appearance-none"
                        type="text" required 
                    />
                </div>
                <div>
                    <label className="pb-4">Description</label>
                    <input className="w-full border border-solid border-black text-black p-2 rounded focus:drop-shadow focus:outline-none focus:ring-indigo-500 appearance-none"
                        type="textarea" defaultValue=""
                    /> 
                </div>
                <div>
                    <label className="pb-4">Submitter</label>
                    <input className="w-full border border-solid border-black text-black p-2 rounded focus:drop-shadow focus:outline-none focus:ring-indigo-500 appearance-none"
                        type="text" required
                    /> 
                </div>
                <div>
                    <label className="pb-4">Submitter Email</label>
                    <input className="w-full border border-solid border-black text-black p-2 rounded focus:drop-shadow focus:outline-none focus:ring-indigo-500 appearance-none"
                        type="email" required
                    />
                </div>
                <button type="submit" className='self-center w-44 mt-6 border border-solid border-blue-500 text-black p-2 rounded hover:bg-blue-500 hover:text-white'>
                    Create
                </button>
            </form>
        </div>
    )
}