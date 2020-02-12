import React from 'react';
function App() {
  const [posts, setPosts] = React.useState([]);

  React.useEffect(()=>{
    fetch('https://www.reddit.com/r/CarletonU.json')
      .then(res=>res.json())
      .then(data=>{
        setPosts(data.data.children.map((post)=> post.data));
      })
  });

  return (
    <div>
      <h1>r/CarletonU</h1>
      <ul>
        {posts.map(post => 
          (<li key={post.id}> {post.title} </li>)
        )}
      </ul>
    </div>
  );
}

export default App;
