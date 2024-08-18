import React, { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../../api/Axios';

interface ParamType {
    articleId?: string;
}

const CommentForm: React.FC = () => {

    const { articleId } = useParams<keyof ParamType>();
    
    const addComment = async (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const commentData = {
            nickname: formData.get('nickname') as string,
            content: formData.get('content') as string,
        };
        try{
            const response = await client.post(`/api/article/${articleId}/comments`, commentData)
            alert("댓글 생성 성공!")
            console.log(response.data);
            window.location.href = `/article/${articleId}`
        }catch(error:any){
            alert("댓글 생성 실패!")
            throw error;
        }
    }
    
    return (
        <div className="mt-6">
            <form onSubmit={addComment} method="POST">
                <input className="h-12 mb-5 border rounded-lg p-2" placeholder='닉네임' name="nickname" required/>
                <input className="w-full h-24 border rounded-lg p-2" placeholder="댓글을 입력하세요" name="content" required />
                <button
                    className="px-4 py-2 mt-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    댓글 작성
                </button>
            </form>
        </div>
    );
};

export default CommentForm;