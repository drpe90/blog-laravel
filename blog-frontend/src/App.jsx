import { Routes, Route } from 'react-router-dom'
import ArticleList from './pages/ArticleList'
import ArticleDetail from './pages/ArticleDetail'
import NewArticle from './pages/NewArticle'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      <nav className="bg-black border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-emerald-400">My Lovely Blog</h1>
          <a href="/new" className="bg-emerald-600 hover:bg-emerald-700 px-6 py-2 rounded-lg font-medium">
            + Новая статья
          </a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/new" element={<NewArticle />} />
      </Routes>
    </div>
  )
}

export default App