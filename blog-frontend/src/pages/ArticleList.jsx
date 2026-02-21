import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function ArticleList() {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    axios.get('/api/articles')
      .then(res => {
        console.log("Данные:", res.data)
        setArticles(res.data)
        setLoading(false)
      })
      .catch(err => {
        console.error("Ошибка:", err.message)
        setError(err.message)
        setLoading(false)
      })
  }, [])

  if (loading) return <div className="text-center py-20 text-xl">Загружаю статьи...</div>
  if (error) return <div className="text-center py-20 text-red-500 text-xl">Ошибка: {error}</div>

  if (articles.length === 0) return <div className="text-center py-20 text-xl">Статей пока нет</div>

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold mb-8">Все статьи</h2>
      <div className="grid gap-6">
        {articles.map(a => (
          <div key={a.id} className="bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-emerald-500 transition">
            <h3 className="text-2xl font-semibold mb-2">{a.title}</h3>
            <p className="text-gray-400 text-sm mb-3">
              {new Date(a.created_at).toLocaleDateString('ru-RU')}
            </p>
            <p className="text-gray-300 line-clamp-3">{a.content}</p>
            <Link to={`/articles/${a.id}`} className="text-emerald-400 hover:text-emerald-300 mt-4 inline-block font-medium">
              Читать полностью →
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}