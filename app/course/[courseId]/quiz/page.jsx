'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import StepProgress from '../_components/StepProgress'
import QuizCardItem from './_components/QuizCardItem'

const Quiz = () => {

    const {courseId} = useParams(); 
    const [quizData,setQuizData]=useState();
    const [quiz,setQuiz]=useState([]);
    const [stepCount,setStepCount]=useState(0);
    const [iscorrectAns,setIsCorrectAns]=useState(null);
    const [correctAns,setCorrectAns]=useState()

    useEffect(()=>{
        GetQuiz()
    },[])

    const GetQuiz = async ()=>{

        const result = await axios.post('/api/study-type',{
            courseId:courseId,
            studyType:'Quiz'
        })

        setQuizData(result.data);
        setQuiz(result.data.content?.questions)
        console.log(result);
    }

    const checkAnswer=(userAnswer,currentQuestion)=>{
        if(userAnswer==currentQuestion?.answer){
            setIsCorrectAns(true);
            setCorrectAns(currentQuestion?.answer)
            return;
        }
        setIsCorrectAns(false);
    }

    useEffect(()=>{
        setCorrectAns(null)
        setIsCorrectAns(null)
    },[stepCount])

  return (
    <div>
      <h2 className="font-bold text-2xl text-center mb-4">Quiz</h2>
      <StepProgress
        data={quiz}
        stepCount={stepCount}
        setStepCount={(value) => setStepCount(value)}
      />

      <div>
        <QuizCardItem
          quiz={quiz[stepCount]}
          userSelectedOption={(v) => checkAnswer(v, quiz[stepCount])}
        />
      </div>

      {
      iscorrectAns == false && (
        <div className='border p-3 border-red-700 bg-red-200 rounded-lg'>
            <h2 className='font-bold text-lg text-red-600'>Incorrect</h2>
            <p className='text-red-600'>Correct Answer is : {correctAns}</p>
      </div>
      )}

      {
      iscorrectAns == true && (
        <div className='border p-3 border-green-700 bg-green-200 rounded-lg'>
          <h2 className='font-bold text-lg text-green-600'>Correct</h2>
          <p className='text-green-600'>Your Answer is Correct </p>
        </div>
      )}
    </div>
  );
}

export default Quiz


