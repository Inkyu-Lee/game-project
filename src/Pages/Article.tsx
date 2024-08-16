import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../api/Axios';
import { BoardType } from './Board';

interface paramType{
    articleId?: string;
}

const Article:React.FC = () => {

    const [article, setArticle] = useState<BoardType>();
    const [articleTitle, setArticleTitle] = useState<String>();
    const [articleNickname, setArticleNickname] = useState<String>();
    const [articleContent, setArticleContent] = useState<String>();

    const { articleId } = useParams<keyof paramType>();

    useEffect(() => {
        const getArticle = async (url:string) => {
            try{
                const response = await client.get(url)
                setArticle(response.data)
            }catch(error:any){
                throw error
            }
        }
        getArticle("/api/article/" + articleId)
    }, [])

    // <p>{article?.title}</p>
    // <p>{article?.content}</p>
    // <p>{article?.nickname}</p>
    // <p>{article?.createTime}</p>
    // <p>{article?.id}</p>

    const onChangeValue = () => {

    }

    return (
    <div className='flex justify-center items-center min-h-screen'>
        <div className='grid grid-rows border-solid border-black border-2'>
            <div className='grid grid-cols-4 mt-10 mb-5 mx-5'>
                <p>번호</p>
                <p>제목</p>
                <p>닉네임</p>
                <p>작성시간</p>
            </div>
            <form>
                <div className='grid grid-cols-4 mb-10 mx-5'>
                    <p>{article?.id}</p>
                        <input
                        type="text"
                        onChange={onChangeValue}
                        defaultValue={article?.title}
                        className='border-solid border-black border-2'/>
                        <input
                        type="text"
                        defaultValue={article?.nickname}
                        className='border-solid border-black border-2'/>
                    <p>{dayjs(article?.createTime).format('YYYY.MM.DD')}</p>
                    <button className='border-solid border-2 border-slate-200 w-16 h-16 rounded-full'>
            내용수정
        </button>
                </div>
            </form>
            <div className='text-center mb-10'>
                {article?.content}
            </div>
        </div>
    </div>
  )
}

export default Article