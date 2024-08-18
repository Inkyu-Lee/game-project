import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { Link } from 'react-router-dom';
import { client } from '../api/Axios';
import { BoardType } from '../types/type';


const Board: React.FC = () => {
  const [boardList, setBoardList] = useState<BoardType[]>([]);
  const [currentPost, setCurrentPost] = useState<BoardType[]>(boardList);
  const [page, setPage] = useState<number>(1);

  const MAX_PAGE_NUM: number = 10;
  const indexofLastPost = page * MAX_PAGE_NUM;
  const indexOfFirstPost = indexofLastPost - MAX_PAGE_NUM;

  const handlePerChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const getArticles = async (url: string) => {
      try {
        const response = await client.get<BoardType[]>(url);
        setBoardList([...response.data].reverse());
        console.log(response.data)
      } catch (error: any) {
        console.error(error);
      }
    };
    getArticles('/api/article/all');
  }, []);

  useEffect(() => {
    if ( indexOfFirstPost < 0 ) {
      return
    }
    setCurrentPost(boardList.slice(indexOfFirstPost, indexofLastPost));
  }, [boardList, page, indexOfFirstPost, indexofLastPost]);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-8">
        <table className="w-full text-center table-auto">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="py-2">번호</th>
              <th className="py-2">제목</th>
              <th className="py-2">생성일</th>
              <th className="py-2">작성자</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentPost.map((board, idx) => (
              <tr key={idx} className="border-b hover:bg-gray-100">
                <td className="py-4">{board.id}</td>
                <td className="py-4 text-left px-4">
                  <Link
                    to={`/article/${board.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {board.title}
                  </Link>
                </td>
                <td className="py-4">{board.updateTime === null ?
                dayjs(board.createTime).format('YYYY.MM.DD') :
                dayjs(board.updateTime).format('YYYY.MM.DD 수정')}</td>
                <td className="py-4">{board.nickname}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-8">
          <Pagination
            activePage={page}
            itemsCountPerPage={MAX_PAGE_NUM}
            totalItemsCount={boardList.length}
            onChange={handlePerChange}
            nextPageText=">"
            prevPageText="<"
            pageRangeDisplayed={5}
            innerClass="flex space-x-2"
            itemClass="px-3 py-2 border rounded-md text-black hover:bg-blue-500 hover:text-white"
            activeClass="bg-sky-300 text-black"
          />
          <Link to="/article/create">
            <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow hover:bg-blue-600 transition-colors duration-200">
              게시글 작성
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Board;
