import React from 'react';
import CommentItem from './CommentItem';
import { CommentType } from '../../types/type';

interface CommentListProps {
    comments: CommentType[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    return (
        <div className="space-y-4">
            {comments.map((comment, idx) => (
                <CommentItem key={idx} comment={comment} />
            ))}
        </div>
    );
};

export default CommentList;