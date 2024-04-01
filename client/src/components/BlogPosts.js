import React, { useState } from 'react';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const response = await fetch('/api/adminRoutes/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });
        
        if (response.ok) {
            const data = await response.json();
            console.log('Server response:', data);
        
            // Clear the form fields after successful submission
            setTitle('');
            setContent('');
        } else {
            console.log('Server response:', response);
            const text = await response.text();
            console.log('Server response text:', text);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-3">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title:</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" />
            </div>
            <div className="mb-3">
                <label htmlFor="content" className="form-label">Content:</label>
                <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="form-control" />
            </div>
            <button type="submit" className="btn btn-primary">Add Post</button>
        </form>
    );
};

export default CreatePost;