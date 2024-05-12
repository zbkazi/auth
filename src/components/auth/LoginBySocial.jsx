
const LoginBySocial = () => {
  return (
    <div className="mt-6">
      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <button className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/512120/facebook-176.svg" alt="Facebook" />
              Facebook
            </button>
          </div>
          <div>
            <button className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <img className="h-5 w-5 mr-2" src="https://www.svgrepo.com/show/513008/twitter-154.svg" alt="Twitter" />
              Twitter
            </button>
          </div>
          <div>
            <button className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <img className="h-6 w-6 mr-2" src="https://www.svgrepo.com/show/506498/google.svg" alt="Google" />
              Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBySocial;
