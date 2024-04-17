import Header from "../components/Header"


function Error404page() {
  return (
    <div>
      <Header/>
      <div className="w-full h-[80vh] flex flex-col items-center justify-center space-y-2">
        <img className="max-w-[40%]" src="../src/assets/404.png" alt="404 error"/>

        <h4 className="font-[900] capitalize text-[2rem]">Page not found</h4>
        <p className="text-[12px]">Sorry we cannot find the page youre looking for </p>
{/* fix nav */}
        <a className=" bg-color-8 px-20 py-1 rounded-full " href="/home">Back To Home</a>
      </div>

    </div>
  )
}

export default Error404page