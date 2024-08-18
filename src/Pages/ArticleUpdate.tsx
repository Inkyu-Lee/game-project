import React from 'react';
import UpdateForm from '../Components/ArticleEditor/UpdateForm';

const ArticleUpdatePage: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <UpdateForm />
        </div>
    );
};

export default ArticleUpdatePage;
