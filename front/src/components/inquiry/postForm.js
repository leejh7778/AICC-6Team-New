import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function PostForm({ posts, setPosts }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');

  useEffect(() => {
    if (isEditing) {
      const post = posts.find((post) => post.id === parseInt(id));
      if (post) {
        setTitle(post.title);
        setSummary(post.summary);
      }
    }
  }, [isEditing, id, posts]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setPosts(
        posts.map((post) =>
          post.id === parseInt(id) ? { ...post, title, summary } : post
        )
      );
    } else {
      setPosts([...posts, { id: posts.length + 1, title, summary }]);
    }
    navigate('/');
  };

  return (
    <div>
      <h2>{isEditing ? '게시글 수정' : '새 글 작성'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>요약</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
        </div>
        <button type="submit">{isEditing ? '수정하기' : '작성하기'}</button>
      </form>
      <button
        onClick={() => navigate('/')}
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        취소
      </button>
    </div>
  );
}

export default PostForm;
