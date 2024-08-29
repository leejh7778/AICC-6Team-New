import React from 'react';

function PostList({ posts, onSelectPost }) {
  if (posts.length === 0) {
    return <div>게시글이 없습니다.</div>;
  }

  return (
    <div>
      <h2 className=" font-Kr  border-b-black border-b-2 p-3 font-semibold ">
        {' '}
        1:1 문의
      </h2>
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
    // fontSize: '20px',
  },
  listItem: {
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '17px',
  },
  title: {
    margin: '0 0 3px 0',
    fontSize: '20px',
  },
  summary: {
    margin: 0,
    color: '#555',
  },
};

export default PostList;
