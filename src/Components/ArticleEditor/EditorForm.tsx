import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../../api/Axios';
import { useInput } from '../../Hooks/useInput';
import InputField from './InputField';


export const editorLanguage = {
    language: 'ko'
}

const EditorForm: React.FC = () => {
    const [editorData, setEditorData] = useState<string>('<h1>내용을 입력하세요.</h1>');
    const inputNickname = useInput('');
    const inputTitle = useInput('');

    const postData = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const articleData = {
            title: formData.get('title') as string,
            nickname: formData.get('nickname') as string,
            content: editorData,
        };
        try {
            const response = await client.post('/api/article/add', articleData);
            const getId = response.data.id;
            alert("게시글 작성완료!");
            window.location.href = `/article/${getId}`;
        } catch (error: any) {
            alert("게시글 작성 실패!");
        }
    };

    return (
        <form onSubmit={postData} className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-6 text-center">게시글 작성</h1>

            <InputField
                label="닉네임"
                name="nickname"
                type="text"
                value={inputNickname.value}
                onChange={inputNickname.onChange}
                placeholder="닉네임"
                required
                setBorderColor={inputNickname.setBorderColor}
            />

            <InputField
                label="제목"
                name="title"
                type="text"
                value={inputTitle.value}
                onChange={inputTitle.onChange}
                placeholder="제목"
                required
                setBorderColor={inputTitle.setBorderColor}
            />

            <div className='prose'>
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

            <div className="flex justify-center mt-6">
                <Link to="/board" className="mr-4">
                    <button
                        type="button"
                        className="px-6 py-3 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-200">
                        뒤로가기
                    </button>
                </Link>
                <button
                    type="submit"
                    className="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200">
                    게시글 작성
                </button>
            </div>
        </form>
    );
};

export default EditorForm;
