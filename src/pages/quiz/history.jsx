import { useEffect, useState } from "react";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import AppLayout from "../../components/AppLayout";
import supabase from "../../configs/supabase";
import { AuthContext } from "../../contexts/AuthContext";

const fetchHistory = async (userId) => {
  return await supabase
    .from('quiz')
    .select()
    .eq('user_id', userId)
}

const History = () => {
  const authContext = useContext(AuthContext);
  const [history, setHistory] = useState();
 
  useEffect(() => {
    fetchHistory(authContext.user.id)
      .then((res) => {
        console.log(res.data);
        setHistory(res.data);
      })
      .catch((error) => console.log(error));
  }, [])

  if (!authContext.user.isLogin) {
    return (
      <Navigate to='/login' />
    )
  }

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen w-full pb-5 px-5">
        {history?.length > 0 ? (
          <div className="flex flex-wrap justify-start mt-5">
            {history.map(item => (
              <>
                <div className="w-15 border border-solid p-5 rounded-sm mx-5 mb-5">
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  <p className="text-xl mb-2 text-center">Score: {item.score}</p>
                  <Link
                    to={`/quiz/${item.id}`}
                    className='hover:bg-slate-100 w-full block text-center hover:text-gray-800 rounded-sm'
                  >
                    Detail
                  </Link>
                </div>
              </>
            ))}
          </div>
        ) : (
          <h1>Tidak ada data</h1>
        )}
      </div>
    </AppLayout>
  )
}

export default History;