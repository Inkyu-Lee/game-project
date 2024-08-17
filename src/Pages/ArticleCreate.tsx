import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/ko';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../api/Axios';
import { useInput } from '../hooks/useInput';

interface InputData {
    title?: string;
    nickname?: string;
}

export const editorLanguage = {
    language: 'ko'
}

const Editor: React.FC = () => {


  const [editorData, setEditorData] = useState<string>('<h1>내용을 입력하세요.</h1> <br><br><br><br> <br><br><br><br>');

  const inputNickname = useInput('');
  const inputTitle = useInput('');

  const postData = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const articleData = {
        title: formData.get('title') as string,
        nickname: formData.get('nickname') as string,
        content: editorData,
    }
    try{
        const response = await client.post('http://localhost:8081/api/article/add', articleData)
        const getId = response.data.id;
        alert("게시글 작성완료!")
        window.location.href = `/article/${getId}`;
    }catch(error:any){
        alert("게시글 작성 실패!")
    }
  }

  return (
    <>
        <div className='flex justify-center items-center min-h-screen'>
            <form onSubmit={postData}>
                <div className='grid grid-rows'>
                    <div className='grid grid-cols-2'>
                        <label className='text-4xl'>게시글 작성</label>
                        <input
                        type="text"
                        name="nickname"
                        value={inputNickname.value}
                        onChange={inputNickname.onChange}
                        className={`ms-20 text-center border-solid border-2 ${inputNickname.setBorderColor}`}
                        placeholder='닉네임'/>
                    </div>
                    <input
                    type="text"
                    name="title"
                    value={inputTitle.value}
                    onChange={inputTitle.onChange}
                    placeholder="제목"
                    className={`border-solid border-2 py-2 px-5 my-5 text-4xl ${inputTitle.setBorderColor}`}
                    />
                    <CKEditor
                    editor={ClassicEditor}
                    data={editorData}
                    config={editorLanguage}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorData(data);
                    }}
                    />
                    <div className='grid grid-cols-2 my-5'>
                        <Link to="/board" className="block">
                            <button className="w-full px-6 me-5 py-3 bg-blue-500 text-white font-semibold rounded-full shadow hover:bg-blue-600 transition-colors duration-200">
                            뒤로가기
                            </button>
                        </Link>
                        <button
                            className="px-6 py-3 ms-5 bg-blue-500 text-white font-semibold rounded-full shadow hover:bg-blue-600 transition-colors duration-200"
                            type="submit"
                            
                        >
                            게시글 작성
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </>
    
  );
};

export default Editor;