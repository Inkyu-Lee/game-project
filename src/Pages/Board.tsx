import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { client } from '../api/Axios';

export interface BoardType{
  id: number;
  title: string;
  nickname: string;
  content: string;
  hits: number;
  createTime: string;
  updateTime?: string;
}

const Board:React.FC = () => {
  
  const [boardList, setBoardList] = useState<BoardType[]>([])
  const [currentPost, setCurrentPost] = useState<BoardType[]>(boardList)
  const [page, setPage] = useState<number>(1)
  
  const MAX_PAGE_NUM:number = 10;
  const indexofLastPost = page * MAX_PAGE_NUM ;
  const indexOfFirstPost = indexofLastPost - MAX_PAGE_NUM ;

  const boardLength = boardList.length ;

  const handlePerChange = (page:number) => {
    setPage(page);
  }

  useEffect(() => {
    const getArticles = async(url:string) => {
      try{
        const response = await client.get<BoardType[]>(url)
        setBoardList([...response.data].reverse())
        console.log(response.data)
      }catch(error:any){
        throw error;
      }
    }
    getArticles("/api/article/all")


  }, [])

  useEffect(() => {
    setCurrentPost(boardList.slice(indexOfFirstPost, indexofLastPost))
  }, [boardList, page])
  
  
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='grid grid-rows'>
      <table className='text-center'>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>생성일</th>
              <th>작성자</th>
            </tr>
          </thead>

        <tbody>
          {currentPost.map((board, idx) => {
            return (
              <>
              <tr key={idx}>
                <td>{board.id}</td>
                <td className='title'>
                  <Link to={`/article/${board.id}`}>
                    {board.title}
                  </Link>
                </td>
                <td>
                  {dayjs(board.createTime).format('YYYY.MM.DD')}
                </td>
                <td>
                  {board.nickname}
                </td>
              </tr>
              </>
            )} )}
          
        </tbody>
      </table>
        <div className='flex justify-center items-center'>
          <Pagination
            activePage={page}
            itemsCountPerPage={MAX_PAGE_NUM}
            totalItemsCount={boardList.length}
            onChange={handlePerChange}
            nextPageText={">"}
            prevPageText={"<"}
            pageRangeDisplayed={5}
            />
          <Link to="/board/create">
            <button className="w-24 h-24 border-solid bg-slate-300 rounded-full ms-10 ">
              게시글 작성
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Board