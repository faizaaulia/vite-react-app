import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import supabase from "../../configs/supabase";
import { AuthContext } from "../../contexts/AuthContext";

const fetchDetail = async (id) => {
  return await supabase
    .from('quiz')
    .select()
    .eq('id', id)
}

const QuizDetail = () => {
  const authContext = useContext(AuthContext);
  const [detail, setDetail] = useState();
  const { id } = useParams();

  useEffect(() => {
    fetchDetail(id)
      .then((res) => {
        console.log(res.data);
        setDetail(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (!authContext.user.isLogin) {
    return (
      <Navigate to='/login' />
    )
  }
  
  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen w-full justify-center items-center pb-5 px-5">
        <ul>
        {
          detail.length > 0 && (
            <div className="flex flex-col mb-5">
              {detail?.map((item, index) => (
                <div className="mb-3 p-3 border border-solid border-white rounded-md" key={index}>
                  <li key={index} className='mb-2'>{item.question}</li>
                  <input
                    type='radio'
                    name={`answer.${index}`}
                    id={`answer.${index}.true`}
                    value='True'
                  />
                  <label htmlFor={`answer.${index}.true`}> True</label> <br/>

                  <input
                    type='radio'
                    name={`answer.${index}`}
                    id={`answer.${index}.false`}
                    value='False'
                  />
                </div>
              ))}
            </div>
          )
        }
        </ul>
      </div>
    </AppLayout>
  )
}

export default QuizDetail;