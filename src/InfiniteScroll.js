import React, { useState, useEffect, useCallback } from 'react'; // Importez les composants React depuis 'react'
import axios from 'axios';

function InfiniteScroll() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3005/posts?page=${page}`); // Utilisez le port 3005 pour l'URL de l'API
      const newPosts = response.data;
      setPosts(prevPosts => [...prevPosts, ...newPosts]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Erreur lors du chargement des publications:', error);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      if (loading) return;
      loadPosts();
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadPosts, loading]);

  return (
    <div>
      <h1>Publications</h1>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      {loading && <p>Chargement en cours...</p>}
    </div>
  );
}

export default InfiniteScroll;
