export default function FeedbackCard({feedback, onFeedbackClick}) {
    return (
        <section className="w-full p-2 bg-slate-200 text-start mb-4 text-base">
            <h2 className="text-xl font-medium">{feedback.title}</h2>
            <div className="flex flex-row justify-between">
                <div>
                    <button className="w-44 mt-6 mr-2 border border-solid border-blue-500 text-black p-2 rounded hover:bg-blue-500 hover:text-white">
                        Critical
                    </button>
                    <button className="w-44 mt-6 border border-solid border-blue-500 text-black p-2 rounded hover:bg-blue-500 hover:text-white"
                     onClick = {() => onFeedbackClick(feedback)}
                    >
                        View
                    </button>
                </div>
                <p className=" leading-relaxed">
                    by Aakash Bhadu
                </p>
            </div>
        </section>
    )
}