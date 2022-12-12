import AppLayout from "../../components/AppLayout";
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  return (
    <AppLayout>
      <div className="flex flex-col min-h-screen w-full justify-center items-center">
        {authContext.user.isLogin ? (
          <button
            onClick={() => {
              if (confirm('Mulai kuis?')) {
                navigate('/quiz');
              }
            }}
            className='border border-solid px-6 py-2 hover:bg-slate-700 rounded-sm'
          >
            Quiz
          </button>
        ) : (
          <h1 className="text-4xl font-semibold">Hello World</h1>
        )}
      </div>
    </AppLayout>
  );
}

export default Home;