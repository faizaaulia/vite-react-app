import AppLayout from "../../components/AppLayout"
import { useQuiz } from "../../hooks/quiz";

const Quiz = () => {
    const { data } = useQuiz({ amount: 10, type: 'boolean' });
    console.log('quiz: ', data);

    return (
        <AppLayout>
            <div className="flex flex-col min-h-screen w-full justify-center items-center">
                <ul>
                {
                    data && data?.data?.results?.map((item, index) => (
                        <li key={index}>{item.question}</li>
                    ))
                }
                </ul>
            </div>
        </AppLayout>
    )
}

export default Quiz;