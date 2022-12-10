import AppLayout from "../../components/AppLayout"
import { useQuiz } from "../../hooks/quiz";
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  answer: yup.array().of(
    yup.string().required('Harus diisi')
  )
});

const Quiz = () => {
  const { data, isLoading } = useQuiz({ amount: 10, type: 'boolean' });
  const questions = data?.data?.results;

  const {
    register,
    handleSubmit,
    formState: {
      errors
    },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
    defaultValues: {
      answer: Array.apply(null, {length: 10}).map(() => '')
    }
  });

  const onSubmit = (data) => {
    let score = 0;
    const answers = data.answer
    questions.forEach((item, index) => {
      console.log(`index: ${index}. jawab: ${answers[index]} kunci: ${item.correct_answer}`)
      if (item.correct_answer === answers[index]) {
        score += 10
      }
    })
    // TODO: store jawaban & score, redirect page result
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
              <button
                type='submit'
                className="border border-solid rounded-md px-6 py-2 hover:bg-white hover:text-slate-900 hover"
              >
                Submit
              </button>
            </form>
          )
        }
        </ul>
      </div>
    </AppLayout>
  )
}

export default Quiz;