export default function FeedbackView({feedback, onFeedbackUpdate, onFeedbackDelete}) {
    return (
        <section className="w-full p-2 bg-slate-200 text-start mb-4 text-base">
            <h2 className="text-xl font-medium">{feedback.title}</h2>
            <h6>{feedback.description}</h6>
            <p className=" leading-relaxed text-blue-700">by Aakash Bhadu</p>
            <div className="">
            <div>
                <button className="w-44 mt-6 mr-2 border border-solid border-blue-500 text-black p-2 rounded hover:bg-blue-500 hover:text-white">
                    Critical
                </button>
            </div>
            <span>
                <button className="w-44 mt-6 mr-2 border border-solid border-blue-500 text-black p-2 rounded hover:bg-blue-500 hover:text-white"
                    onClick={() => onFeedbackUpdate(feedback)}
                >
                    Update
                </button>
            </span>
            <span>
                <button className="w-44 mt-6 mr-2 border border-solid border-blue-500 text-black p-2 rounded hover:bg-blue-500 hover:text-white"
                    onClick={() => onFeedbackDelete(feedback.id)}
                >
                    Delete
                </button>
            </span>
            </div>
        </section>
    )
}