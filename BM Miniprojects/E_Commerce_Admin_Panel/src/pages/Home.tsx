import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'


export const Home = () => {
    const navigate  = useNavigate();
    const handleLoginClick = ()=>{
        navigate('/login')
    }   
  return (
    <>
    <div className="w-svw h-svh flex justify-center items-center font-sans ">
      <div className="rounded-xl border w-1/3  h-1/3 border-zinc-400">
         <div className='flex flex-col gap-10'>
            <h1 className='text-center font-bold text-xl'></h1>
            <div className='flex gap-5 justify-center items-center'>
            <Button onClick={handleLoginClick}>Login</Button>
            
            </div>
         </div>
      </div>
   </div>
    </>
  )
}
