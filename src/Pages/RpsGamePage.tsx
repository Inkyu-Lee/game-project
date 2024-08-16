import React, { useState } from 'react';
import { client } from '../api/Axios';
import './page.css';

interface RpsGameType{
  userData:string;
  computerPick:string;
  whoWin:string;
}

interface ImgTarget{
  isVisible: boolean;
  src: string;
}

const RpsGamePage:React.FC = () => {

  const getSrcAdd = (target:string): string => {
  
    if(target === "가위"){
      let src:string = "http://49.247.158.208:9999/hjs/img/scissor.f9ef898c.jpg"
      return src
    }
    if(target === "바위"){
      let src:string = "http://49.247.158.208:9999/hjs/img/rock.8b39a13f.jpg"
      return src
    }
    if(target === "보"){
      let src:string = "http://49.247.158.208:9999/hjs/img/paper.0b032424.jpg"
      return src
    }
    
    return "null";
    
  }

  const [winner, setWinner] = useState<string>("가위바위보 게임");

  const [computerPick, setComputerPick] = useState<string>("가위");
  const [userPick, setUserPick] = useState<string>("가위");

  const [computerImg, setComputerImg] = useState<ImgTarget>( { isVisible: false, src: "src" } );
  const [userImg, setUserImg] = useState<ImgTarget>( { isVisible: false, src: "src" } );


  const btnEventPlayer = (e:HTMLButtonElement) => {
    console.log(e.value);

    const getWinner = async (url:string) => {
      try{
        const response = await client.post<RpsGameType>(url, String(e.value))
        setWinner(response.data.whoWin);
        setComputerPick(response.data.computerPick);
        setComputerImg( { isVisible: true, src: getSrcAdd(response.data.computerPick) } )
        setUserImg( { isVisible: true, src: getSrcAdd(e.value) } )
        setUserPick( e.value )
      }catch(error:any){
        throw error;
      }
    }

    getWinner('/api/rps/game')
  }

  return (
    <>
      <section className="flex justify-center  items-center min-h-screen">
        <div className='grid grid-row sm:grid-cols-3 place-items-center'>

          <div className='border-solid border-2 border-black text-center mx-20'>
            {!userImg?.isVisible ? <img src="https://taegon.kim/wp-content/uploads/2018/05/image-5.png"/> : <img src={userImg.src}/> }
            <p>나</p>
            <p>{userPick}</p>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80'
              value="가위"
              onClick={ (e) => btnEventPlayer(e.currentTarget) }
            >
              가위
            </button>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80'
              value="바위"
              onClick={ (e) => btnEventPlayer(e.currentTarget) }
            
            >
              바위
            </button>
            <button className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-80'
              value="보"
              onClick={ (e) => btnEventPlayer(e.currentTarget) }
            >
              보
            </button>
          </div>

          <div className='border-solid border-2 border-black text-center mx-20'>
            <img src="https://taegon.kim/wp-content/uploads/2018/05/image-5.png"/>
            <p>심판</p>
            <p>{winner}</p>
          </div>

          <div className='border-solid border-2 border-black text-center mx-20'>
          {!computerImg?.isVisible ? <img src="https://taegon.kim/wp-content/uploads/2018/05/image-5.png"/> : <img src={computerImg.src}/> }
            <p>컴퓨터</p>
            <p className='text-white bg-blue-700 rounded-lg'>{computerPick}</p>
          </div>
          
        </div>

      </section>
    
    
    </>
  )
}

export default RpsGamePage