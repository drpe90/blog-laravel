import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ArticleDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState(null)
  const [comments, setComments] = useState([])
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    axios.get(`/api/articles/${id}`)
      .then(res => {
        setArticle(res.data)
        setComments(res.data.comments || [])
      })
  }, [id])

  const addComment = () => {
    if (!author || !content) return alert('Заполни имя и текст, дебил')
    axios.post(`/api/articles/${id}/comments`, { author_name: author, content })
      .then(() => {
        window.location.reload() // грязно, но для задания идеально
      })
  }

  if (!article) return <div className="text-center py-20">Грузим...</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <button onClick={() => navigate('/')} className="mb-6 text-emerald-400 hover:underline">← Назад к списку</button>
      
      <h1 className="text-5xl font-bold mb-4">{article.title}</h1>
      <p className="text-gray-500 mb-8">{new Date(article.created_at).toLocaleDateString('ru-RU')}</p>
      
      <div className="prose prose-invert max-w-none text-lg leading-relaxed">
        {article.content}
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-6">Комменты ({comments.length})</h3>
        
        <div className="space-y-6 mb-10">
          {comments.map(c => (
            <div key={c.id} className="bg-gray-900 p-5 rounded-xl">
              <div className="flex justify-between">
                <span className="font-medium text-emerald-400">{c.author_name}</span>
                <span className="text-gray-500 text-sm">{new Date(c.created_at).toLocaleDateString('ru-RU')}</span>
              </div>
              <p className="mt-2 text-gray-300">{c.content}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-900 p-6 rounded-xl">
          <h4 className="text-xl font-semibold mb-4">Написать коммент</h4>
          <input
            type="text"
            placeholder="Твоё имя"
            value={author}
            onChange={e => setAuthor(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg mb-4 focus:outline-none focus:border-emerald-500"
          />
          <textarea
            placeholder="Текст комментария..."
            value={content}
            onChange={e => setContent(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 p-3 rounded-lg h-32 focus:outline-none focus:border-emerald-500"
          />
          <button
            onClick={addComment}
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-lg font-medium w-full"
          >
            Заслать
          </button>
        </div>
      </div>
    </div>
  )
}