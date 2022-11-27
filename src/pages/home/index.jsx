import AppLayout from "../../components/AppLayout";

const Home = () => {
    return (
        <AppLayout>
            <div className="flex flex-col min-h-screen w-full justify-center items-center">
                <h1 className="text-4xl font-semibold">Hello World</h1>
            </div>
        </AppLayout>
    );
}

export default Home;