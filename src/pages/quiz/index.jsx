import AppLayout from "../../components/AppLayout"
import { useQuiz } from "../../hooks/quiz";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import supabase from "../../configs/supabase";

const schema = yup.object({
  answer: yup.array().of(
    yup.string().required('Harus diisi')
  )
});

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;

  return minutes + ':' + seconds;
}

const Quiz = () => {
  const authContext = useContext(AuthContext);
  const { data, isLoading } = useQuiz({ amount: 10, type: 'boolean' });
  const questions = data?.data?.results;

  const [countDown, setCountDown] = useState(10);
  const timer = useRef();
  
  useEffect(() => {
    timer.current = setInterval(() => {
      setCountDown(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (countDown <= 0) {
      clearInterval(timer.current);
      alert('Waktu habis');
      handlePostAnswer(watch('answer'));
    }
  }, [countDown]);

  const calculateScore = (answers) => {
    let score = 0;
    questions.forEach((item, index) => {
      if (item.correct_answer === answers[index]) {
        score += 10
      }
    });

    return score;
  }

  const handlePostAnswer = async (answers) => {
    const questionList = [];
    const correct_answers = [];
    const score = calculateScore(answers);

    questions.forEach(item => {
      questionList.push(item.question);
      correct_answers.push(item.correct_answer);
    });

    const insertData = {
      user_id: authContext.user.id,
      questions: questionList,
      correct_answers,
      submit_answers: answers,
      score
    }

    try {
      // TODO: handle error & response sukses (belum sesuai)
      await supabase
        .from('quiz')
        .insert(insertData)
        .single()

      alert('Sukses');
    } catch (error) {
      alert(`Gagal. ${error}`);
    }
  }

  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
    watch,
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      answer: Array.apply(null, {length: 10}).map(() => '')
    }
  });

  const onSubmit = (data) => {
    clearInterval(timer.current);
    handlePostAnswer(data.answer)
  }

  if (!authContext.user.isLogin) {
    return (
      <Navigate to='/login' />
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen w-full justify-center items-center pb-5 px-5">
        {isLoading && (
          <h1>Loading...</h1>
        )}
        <ul>
        {
          data && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col mb-5">
                {questions?.map((item, index) => (
                  <div className="mb-3 p-3 border border-solid border-white rounded-md" key={index}>
                    <li key={index} className='mb-2'>{item.question}</li>
                    <input
                      {...register(`answer.${index}`)}
                      type='radio'
                      name={`answer.${index}`}
                      id={`answer.${index}.true`}
                      value='True'   />
                    <label htmlFor={`answer.${index}.true`}> True</label> <br/>

                    <input
                      {...register(`answer.${index}`)}
                      type='radio'
                      name={`answer.${index}`}
                      id={`answer.${index}.false`}
                      value='False'  />
                    <label htmlFor={`answer.${index}.false`}> False</label> <br/>
                    {errors?.answer?.[index] && (
                      <p className="bg-red-600 max-w-max px-1 mt-2 rounded-sm">{errors.answer[index].message}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <button
                  type='submit'
                  className="border border-solid rounded-md px-6 py-2 hover:bg-white hover:text-slate-900 hover"
                >
                  Submit
                </button>
                <p class="text-2xl font-semibold">Sisa waktu {formatTime(countDown)}</p>
              </div>
            </form>
          )
        }
        </ul>
      </div>
    </AppLayout>
  )
}

export default Quiz;