export interface BoardType {
    id?: number;
    title: string;
    nickname: string;
    content: string;
    hits?: number;
    createTime?: string;
    updateTime?: string;
  }

  export interface CommentType {
    id?: number;
    article_Id?: number;
    nickname: string;
    content: string;
    createTime?: string;
    updateTime?: string;
  }