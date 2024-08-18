import React, { useEffect, useState } from 'react';
import { client } from '../api/Axios';

interface LottoType {
    id: number;
    lottoNum: String;
}

const LottoPage:React.FC = () => {

    const [lottoNum, setLottoNum] = useState<LottoType[]>()

    useEffect(() => {
            const getData = async (url:string) => {
                try{
                    const response = await client.get<LottoType[]>(url)
                    setLottoNum(response.data)
                }catch(error:any){
                    throw error;
                }
            }
            getData("/api/lotto/get")
        }, [])

  return (
    <div className='flex justify-center items-center min-h-screen bg-blue-500'>
        <div className='grid grid-cols-6'>
            {lottoNum?.map((lotto, idx) =>
                <div
                className={`flex border-solid rounded-full w-16 h-16 items-center justify-center sm:w-48 sm:h-48
                    ${Number(lotto.lottoNum) >= 30 ? 'bg-blue-100' :
                        Number(lotto.lottoNum) >= 20 ? 'bg-green-100' :
                        Number(lotto.lottoNum) >= 10 ? 'bg-yellow-100' : 'bg-red-100'
                    }`}
                key={idx}
                >
                <p>{lotto.lottoNum}</p>
                </div>
                )}
        </div>
    </div>
  )
}

export default LottoPage