import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../api/Axios';
import '../../ckeditor.css';
import { BoardType } from '../../types/type';
import { editorLanguage } from './EditorForm';
import InputField from './InputField';

interface ParamType {
    articleId?: string;
}

const UpdateForm: React.FC = () => {
    const [article, setArticle] = useState<BoardType>();
    const [editorData, setEditorData] = useState<string>('');
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
                setEditorData(response.data.content);
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
            content: editorData
        };

        try {
            const response = await client.patch(`/api/article/update/${articleId}`, articleData);
            setArticle(response.data);
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
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8 mt-20 mb-20">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">게시글 수정</h1>
            
            <form onSubmit={handleSubmit}>
                <InputField
                    label="제목"
                    name="title"
                    type="text"
                    value={updateArticle.title}
                    onChange={(e) => setUpdateArticle({ ...updateArticle, title: e.target.value })}
                    placeholder="제목"
                    required
                />

                <InputField
                    label="닉네임"
                    name="nickname"
                    type="text"
                    value={updateArticle.nickname}
                    onChange={(e) => setUpdateArticle({ ...updateArticle, nickname: e.target.value })}
                    placeholder="닉네임"
                    required
                />

                <div className="text-right text-gray-500 mb-4">
                    {article?.updateTime
                        ? `${dayjs(article?.updateTime).format('YYYY.MM.DD.HH.mm')} 수정됨`
                        : dayjs(article?.createTime).format('YYYY.MM.DD')}
                </div>

                <div className="mb-6 prose relative max-h-auto">
                    <CKEditor
                        editor={ClassicEditor}
                        data={editorData}
                        config={editorLanguage}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setEditorData(data);
                        }}
                    />
                </div>

                <div className="flex justify-end">
                    <button type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 mr-2">
                        저장하기
                    </button>
                    <button type="button"
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                        onClick={handleBackPage}>
                        취소
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateForm;
