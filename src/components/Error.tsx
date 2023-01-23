const ErrorPage = () => {
  return (
    <section className="flex h-full items-center p-16 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto my-8 flex flex-col items-center justify-center px-5">
        <div className="max-w-md text-center">
          <h2 className="mb-8 text-9xl font-extrabold dark:text-gray-600">
            <span className="sr-only">Error</span>404
          </h2>
          <p className="text-2xl font-semibold md:text-3xl">
            Sorry, an error has occured!
          </p>

          <a
            rel="noopener noreferrer"
            href="#"
            className="rounded px-8 py-3 font-semibold dark:bg-violet-400 dark:text-gray-900"
          >
            Back to homepage
          </a>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
