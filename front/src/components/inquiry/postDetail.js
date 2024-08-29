import React from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';

function PostDetail({ posts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const post = posts.find((post) => post.id === parseInt(id));

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  const handleBackToList = () => {
    navigate('/');
  };

  return (
    <div>
      <h2>{post.name}</h2>
      <h2>{post.email}</h2>
      <p>{post.summary}</p>
      <button onClick={handleEdit}>수정하기</button>
      <button onClick={handleBackToList}>목록으로</button>
    </div>
  );
}

export default PostDetail;
