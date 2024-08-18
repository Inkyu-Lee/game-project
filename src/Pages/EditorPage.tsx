import React from 'react';
import EditorForm from '../Components/ArticleEditor/EditorForm';

const EditorPage: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <EditorForm />
        </div>
    );
};

export default EditorPage;
