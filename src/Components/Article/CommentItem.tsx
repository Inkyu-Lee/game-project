import dayjs from 'dayjs';
import React, { useState } from 'react';
import { client } from '../../api/Axios';
import { CommentType } from '../../types/type';


interface CommentItemProps {
    comment: CommentType;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {

    const [isUpdate, setIsUpdate] = useState(false);

    const handleUpdate = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isUpdate) {
            setIsUpdate(!isUpdate);
        }else{
            setIsUpdate(true);
        }
    }

    const updateComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const commentData = {
            id: comment.id,
            nickname: formData.get('nickname') as string,
            content: formData.get('content') as string,
        };
        try{
            await client.patch(`http://localhost:8081/api/comment/update/${comment.id}`, commentData);
            setIsUpdate(false);
            alert("댓글 수정 성공!")
            window.location.reload();
        }catch(error:any){
            alert("댓글 수정 실패!")
            throw error;
        }
    }

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try{
            await client.delete(`http://localhost:8081/api/comments/delete/${comment.id}`)
            alert("댓글 삭제 성공!");
            window.location.reload();
        }catch(error:any){
            alert("댓글 삭제 실패!");
            throw error;
        }
    }

    return (
        <div className="flex">
            <div className="flex-shrink-0 mr-4">
                <img className="w-10 h-10 rounded-full" src="https://cdn-icons-png.flaticon.com/128/2829/2829751.png" alt="User Avatar" />
            </div>
            <form method="POST" onSubmit={updateComment}>
                <div>
                    <div className="flex items-center mb-2">
                        <span className="font-semibold mr-2">
                            {isUpdate ? <input name="nickname"
                                defaultValue={comment.nickname}
                                className='border-solid border-2 border-black w-32' required/>
                            :comment.nickname}
                        </span>
                        <span className="text-sm text-gray-600">{comment.updateTime === null
                            ? dayjs(comment.createTime).format('YYYY.MM.DD')
                            : `${dayjs(comment.updateTime).format('YYYY.MM.DD HH:mm')} 수정됨`}</span>
                    <div className='flex px-5'>

                        {isUpdate ? <button className='bg-green-200 w-12 rounded me-1' type="submit">확인</button> :
                        <button className='bg-green-200 w-12 rounded me-1' onClick={handleUpdate}  type="button">수정</button>}
                        
                        {isUpdate ? "" :<button type="button" className='bg-red-200 w-12 rounded ms-1' onClick={handleDelete}>삭제</button>}


                    </div>
                    </div>
                    <p>{isUpdate ? <input name="content"
                            defaultValue={comment.content}
                            className='border-solid border-2 w-48 h-12 border-black' required/>
                        : comment.content}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default CommentItem;
