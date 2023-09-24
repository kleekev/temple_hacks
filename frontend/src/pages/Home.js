const Home = () => {
    const handleClick = () => {
        window.location.replace('http://localhost:3000/signup')
      }
    return (
        <div className="relative h-full bg-no-repeat bg-center bg-cover bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=Temple+University,Philadelphia,PA&zoom=12&size=1000x1000&key=AIzaSyAeQK_Orc1AQrrXae_AfHLYYXUfBLvGQjI')]">
            <div className='z-1 w-[50%] bg-gray-300 absolute inset-x-[25%] top-[25%] h-[24rem] rounded-2xl p-10 text-[2rem] text-center font-bold font-serif'>
                <p className='mb-3'>Do you want to save the Earth? Then...</p>
                <p>Drive for Change: Carpooling Today for a Greener Tomorrow!</p>
                <button onClick={handleClick} className='h-[25%] bg-green-400 w-[40%] mt-10 rounded-2xl'>Join Now!</button>
            </div>
        </div>
    )
}
export default Home