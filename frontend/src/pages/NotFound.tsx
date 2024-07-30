import notFound from '../assets/mainPage/notFoundPage.png'

const NotFound = () => {
  return (
    <section className=' w-[95vw]  h-screen flex '>
        <div className="flex flex-col items-center  w-full justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold text-btn-main mb-2">Page Not Found</h1>
      <img src={notFound} className=' size-96' alt="not found" />
      <p className="text-lg text-gray-700 mb-4">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="text-btn-main  hover:text-btn-main/80">
        Go back to Home
      </a>
    </div>
    </section>
  );
};

export default NotFound;
