import image from '../assets/motion-blur-2.svg'

const Loader = () => {
    return (
        <div className='flex items-center justify-center h-screen bg-white'>
            <img src={image} alt="" className='w-40 h-40'/>
        </div>
    )
}

export default Loader