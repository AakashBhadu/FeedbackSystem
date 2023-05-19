'use client'
import { startTransition, useEffect, useState } from "react"
import axios from "axios"
import FeedbackCreate from "./FeedbackCreate"
import FeedbackCard from "./FeedbackCard"
import FeedbackView from "./FeedbackView"

export default function Home() {
  const [showCreateForm,  setShowCreateForm] = useState(false)
  const [showFeedbackView, setShowFeedbackView] = useState(false)
  const [feedbacks, setFeedbacks] = useState([])
  const [currentFeedbacks, setCurrentFeedbacks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [feedback, setFeedback] = useState({})
  const step = 20

  useEffect(() => {
    axios.get('http://localhost:5078/feedback')
    .then(res => {
        setFeedbacks(res.data)
        let page = getNextPage(res.data, step, currentPage)
        if (page.length) {
          setCurrentFeedbacks([...page])
        }
    }).catch(err => {
      console.log(err)
    })
  }, [feedback])


  function handleFeedbackCreated(feedback) {
    axios.post('http://localhost:5078/feedback', feedback)
    .then(res => {
      setShowCreateForm(false)
      setFeedbacks([feedback, ...feedbacks])
    }).catch(err => {
      setShowCreateForm(false)
      console.log(err)
    })        
  }

  function handleFeedbackClick(feedback) {
    console.log(feedback)
    setFeedback(feedback)
    setShowFeedbackView(true)
  }

  function handleFeedbackUpdate(feedback) {
    console.log(feedback)
    axios.patch('http://localhost:5078/feedback', feedback)
    .then(res => {
        setFeedback(feedback)
    }).catch(err => {
      console.log(err)
    })
  }

  function handleFeedbackDelete(id) {
    axios.delete('http://localhost:5078/feedback?id=' + id)
    .then(res => {
        setFeedback({})
        setShowFeedbackView(false)
    }).catch(err => {
      console.log(err)
    })
  }

  function handleNext() {
    let page = getNextPage(feedbacks, step, currentPage + 1)
    if(page.length) {
      setCurrentFeedbacks([...page])
      setCurrentPage(p => p+1)
    }
  }

  function handlePrev() {
    if(currentPage == 1) return
    let page = getNextPage(feedbacks, step, currentPage - 1)
    if(page.length) {
      setCurrentFeedbacks([...page])
      setCurrentPage(p => p-1)
    }
  }

  return (
    <main className="flex min-h-screen flex-row bg-white text-black">
      {showCreateForm && <FeedbackCreate onFeedbackCreated={handleFeedbackCreated}/>}
      {
        !showFeedbackView ?
        <>
        <div className='flex-1 w-1/4'>
          <div className='mb-48 pl-4'>
              <button className='w-44 mt-6 border border-solid border-blue-500 text-black p-2 rounded hover:bg-blue-500 hover:text-white'
                onClick={() => setShowCreateForm(true)}
              >
                Create Feedback
              </button>
          </div>
          <div className='w-full p-4'>
              <h3 className='text-2xl font-bold mb-8'>Filter Feedbacks</h3>
              <div className='mb-8'>
                <p className='pb-2'>By Word</p>
                <input type='text' className="w-full border border-solid border-black text-black p-2 rounded focus:drop-shadow focus:outline-none focus:ring-indigo-500 appearance-none"/>
              </div>
              <div className='mb-8'>
                <p className='pb-2'>By DateRange</p>
                <label>From</label>
                <input type='date' className="w-full border border-solid border-black text-black p-2 rounded focus:drop-shadow focus:outline-none focus:ring-indigo-500 appearance-none"/>
                <label>To</label>
                <input type='date' className="w-full border border-solid border-black text-black p-2 rounded focus:drop-shadow focus:outline-none focus:ring-indigo-500 appearance-none"/>
              </div>
              <div>
                <p>By Location</p>
                <input type='location' className="w-full border border-solid border-black text-black p-2 rounded focus:drop-shadow focus:outline-none focus:ring-indigo-500 appearance-none"/>
              </div>
          </div>
        </div>
        <div className='h-full w-3/4'>
          <div className='text-center w-full mt-6'>
            <h1 className="text-3xl font-semibold">Feedback Form</h1>
            <div className="p-24">
              {
                currentFeedbacks.map((feedback, index) => {
                  return (
                    <FeedbackCard feedback={feedback} key={index} onFeedbackClick={handleFeedbackClick}/>
                  )
                })
              }
            </div>
          </div>        
          <div className="flex flex-row gap-6 justify-center items-center mb-4">
            <button className="w-44 p-4 border border-solid border-black" onClick={handlePrev}>prev</button>
            {
              Array.from({length: Math.ceil(feedbacks.length/step)}, (item, index) => {
                return (
                  <button className={`w-8 h-8 text-center rounded-full m-4 ${index + 1 == currentPage ? "bg-blue-700 text-white" : "bg-white text-black"} border border-solid border-black`} onClick={handlePrev} key={index}>{index + 1}</button>
                )
              })
            }
            <button className="w-44 p-4 border border-solid border-black" onClick={handleNext}>next</button>
          </div>
        </div>
        </>

        :
        <FeedbackView feedback={feedback} onFeedbackUpdate={handleFeedbackUpdate} onFeedbackDelete={handleFeedbackDelete}/>
      }

    </main>
  )
}


function getNextPage(feedbacks, step, pageNumber) {
  let pages = Math.ceil(feedbacks.length/step)
  return feedbacks.slice(step * (pageNumber - 1), step * pageNumber)
}
