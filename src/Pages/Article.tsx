import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../api/Axios';
import { BoardType } from './Board';

interface ParamType {
    articleId?: string;
}

const Article: React.FC = () => {
    const [article, setArticle] = useState<BoardType>();
    const [updateArticle, setUpdateArticle] = useState<BoardType>({
        title: '',
        nickname: '',
        content: '',
    });

    const { articleId } = useParams<keyof ParamType>();

    useEffect(() => {
        const getArticle = async (url: string) => {
            try {
                const response = await client.get(url);
                setArticle(response.data);
                setUpdateArticle({
                    title: response.data.title,
                    nickname: response.data.nickname,
                    content: response.data.content,
                });
            } catch (error: any) {
                console.error(error);
            }
        };
        getArticle(`/api/article/${articleId}`);
    }, [articleId]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const articleData = {
            title: formData.get('title') as string,
            nickname: formData.get('nickname') as string,
            content: formData.get('content') as string,
        };

        console.log(articleData);

        try {
            const response = await client.patch(`http://localhost:8081/api/article/update/${articleId}`, articleData);
            setArticle(response.data);
            console.log(response.data);
            alert('수정 완료!');
            window.location.href = `/article/${articleId}`;
        } catch (error: any) {
            console.error(error);
            alert('수정 중 오류가 발생했습니다.');
        }
    };

    const handleBackPage = () => {
        window.location.href = '/board';
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
                <div className="grid grid-cols-4 gap-4 mb-8 text-gray-700">
                    <p className="font-semibold">번호</p>
                    <p className="font-semibold">제목</p>
                    <p className="font-semibold">닉네임</p>
                    <p className="font-semibold">작성시간</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-4 gap-4 mb-6">
                        <p className="text-gray-500">{article?.id}</p>
                        <input
                            type="text"
                            name="title"
                            defaultValue={updateArticle.title}
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="text"
                            name="nickname"
                            defaultValue={updateArticle.nickname}
                            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div className="text-right text-gray-500 mb-4">
                        {article?.updateTime === null
                            ? dayjs(article?.createTime).format('YYYY.MM.DD')
                            : `${dayjs(article?.updateTime).format('YYYY.MM.DD.HH.mm')} 수정됨`}
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            name="content"
                            defaultValue={article?.content}
                            className="w-full h-64 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="내용을 입력하세요"
                        />
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            내용수정
                        </button>
                        <button
                            type="submit"
                            className="mx-5 inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            onClick={handleBackPage}
                        >
                            뒤로가기
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Article;
