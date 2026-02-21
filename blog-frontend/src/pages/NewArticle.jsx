import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function NewArticle() {
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const create = () => {
    if (!title || !content) return alert('Заполни всё, мудак')
    axios.post('/api/articles', { title, content })
      .then(() => navigate('/'))
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8">Новая статья</h2>
      
      <input
        type="text"
        placeholder="Заголовок"
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 p-4 text-3xl rounded-xl mb-6 focus:outline-none focus:border-emerald-500"
      />
      
      <textarea
        placeholder="Текст статьи..."
        value={content}
        onChange={e => setContent(e.target.value)}
        className="w-full bg-gray-900 border border-gray-700 p-6 rounded-xl h-96 text-lg focus:outline-none focus:border-emerald-500"
      />
      
      <button
        onClick={create}
        className="mt-6 bg-emerald-600 hover:bg-emerald-700 px-10 py-4 rounded-xl text-xl font-medium w-full"
      >
        Запостить
      </button>
    </div>
  )
}