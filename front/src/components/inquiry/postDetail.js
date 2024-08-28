import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';

function PostDetail({ posts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.summary}</p>
      <button onClick={() => navigate(`/edit/${post.id}`)}>수정하기</button>
      <button onClick={() => navigate('/')}>목록으로</button>
    </div>
  );
}

export default PostDetail;
