import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://locahost:5000/api/posts')
            .then(response => {
                setPosts(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching entries');
                setLoading(false);
            });
        },
    []);
    
    if (loading) return <div>Launching feedback...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Local Bands for Hire</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default Posts;