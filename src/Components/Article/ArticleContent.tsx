import DOMPurify from 'dompurify';
import parse from 'html-react-parser';
import React from 'react';


interface ArticleContentProps {
    content: string;
}

const ArticleContent: React.FC<ArticleContentProps> = ({ content }) => {
    const sanitizedHTML = DOMPurify.sanitize(content, {
        ALLOWED_TAGS: [
            'h1', 'h2', 'h3', 'p', 'br', 'span', 'strong', 'em', 'u', 'sub', 'sup', 'code', 'pre', 'blockquote',
            'ul', 'ol', 'li', 'a', 'img', 'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'caption',
            'figure', 'oembed', 'iframe', 'video', 'source', 'h4', 'h5', 'h6', 'hr', 'dl', 'dt', 'dd', 'del', 'ins'
        ],
        ALLOWED_ATTR: ['src', 'controls', 'width', 'height', 'href', 'target', 'alt', 'class', 'style', 'url', 'frameborder', 'allowfullscreen']
    });

    const replaceOembed = (domNode: any) => {
        if (domNode.name === 'oembed') {
            const url = domNode.attribs.url;
            const videoIdMatch = url.match(/v=([^&]+)/);
            const videoId = videoIdMatch ? videoIdMatch[1] : null;
            if (videoId) {
                const embedUrl = `https://www.youtube.com/embed/${videoId}`;
                return <iframe width="640" height="320" title="유튜브보기" src={embedUrl} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>;
            } else {
                return <div>경로를 찾을 수 없습니다.</div>
            }
        }
    };

    return (
        <div className="prose ck-content ck-editor__editable ck-rounded-corners ck-editor__editable_inline ck-blurred">
            {parse(sanitizedHTML, { replace: replaceOembed })}
        </div>
    );
};

export default ArticleContent;
