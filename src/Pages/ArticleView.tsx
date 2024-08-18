import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../api/Axios';
import ArticleContent from '../Components/Article/ArticleContent';
import CommentForm from '../Components/Article/CommentForm';
import CommentList from '../Components/Article/CommentList';
import { BoardType, CommentType } from '../types/type';


interface ParamType {
    articleId?: string;
}

const ArticleView: React.FC = () => {
    const [article, setArticle] = useState<BoardType | null>(null);
    const [commentList, setCommentList] = useState<CommentType[]>([]);
    const { articleId } = useParams<keyof ParamType>();

    useEffect(() => {
        const storageKey = `article_${articleId}`;

        const updateHits = async (url: string) => {
            try {
                const response = await client.post(url, articleId);
                if (response.status === 200) {
                    console.log("Update hits");
                }
            } catch (error: any) {
                throw error;
            }
        };

        if (!localStorage.getItem(storageKey)) {
            localStorage.setItem(storageKey, "true");
            updateHits(`/api/article/hits/${articleId}`);
        }

        const getArticle = async (url: string) => {
            try {
                const response = await client.get(url);
                setArticle(response.data);
            } catch (error: any) {
                console.error(error);
            }
        };

        const getComment = async (url: string) => {
            try {
                const response = await client.get<CommentType[]>(url);
                setCommentList(response.data);
                console.log(response.data);
            } catch (error: any) {
                throw error;
            }
        };

        getComment(`/api/article/${articleId}/comments`);
        getArticle(`/api/article/${articleId}`);
    }, [articleId]);

    const handleBackPage = () => { window.location.href = "/board" };
    const handleUpdateArticle = () => { window.location.href = `/article/update/${article?.id}` };

    const handleDeleteArticle = async () => {
        if (window.confirm('정말로 삭제하시겠습니까?')) {
            try {
                const response = await client.delete(`/api/article/delete/${article?.id}`);
                console.log(response.data);
                alert('게시글 삭제 완료!');
                window.location.href = '/board';
            } catch (error: any) {
                console.error(error);
                alert('게시글 삭제 중 오류가 발생했습니다.');
            }
        }
    };

    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 mt-20">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">{article?.title}</h1>
                    <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-2">작성자: {article?.nickname}</span>
                        <span className="mx-2">|</span>
                        <span>
                            {article?.updateTime === null
                                ? dayjs(article?.createTime).format('YYYY.MM.DD')
                                : `${dayjs(article?.updateTime).format('YYYY.MM.DD HH:mm')} 수정됨`}
                        </span>
                        <span className='mx-2'>|</span>
                        <span>조회수: {article?.hits}</span>
                    </div>
                </div>
                <ArticleContent content={article?.content || ''} />
                <div className="flex mt-8 justify-end">
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2"
                        onClick={handleUpdateArticle}>
                        게시글 수정
                    </button>
                    <button
                        className="px-4 py-2 bg-red-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        onClick={handleDeleteArticle}>
                        게시글 삭제
                    </button>
                    <button
                        className="px-4 py-2 mx-3 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        onClick={handleBackPage}>
                        뒤로가기
                    </button>
                </div>
            </div>
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 mt-8 mb-20">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">댓글 목록</h2>
                <CommentList comments={commentList} />
                <CommentForm />
            </div>
        </div>
    );
};

export default ArticleView;
