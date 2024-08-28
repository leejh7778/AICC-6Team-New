import React from 'react';

function PostList({ posts, onSelectPost }) {
  if (posts.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <div>
      <h2>게시판 리스트</h2>
      <ul style={styles.list}>
        {posts.map((post) => (
          <li
            key={post.id}
            style={styles.listItem}
            onClick={() => onSelectPost(post.id)}
          >
            <h3 style={styles.title}>{post.title}</h3>
            <p style={styles.summary}>{post.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  title: {
    margin: '0 0 5px 0',
    fontSize: '18px',
  },
  summary: {
    margin: 0,
    color: '#555',
  },
};

export default PostList;
