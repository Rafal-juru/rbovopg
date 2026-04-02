import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Pencil, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  external_link: string | null;
  created_at: string;
}

export function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [externalLink, setExternalLink] = useState('');
  
  const [editId, setEditId] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const ITEMS_PER_PAGE = 10;
  const [loadingPosts, setLoadingPosts] = useState(true);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const fetchPosts = async () => {
    setLoadingPosts(true);
    let query = supabase
      .from('posts')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE - 1);
    
    if (search.trim()) {
      query = query.ilike('title', `%${search}%`);
    }

    const { data, count, error } = await query;
    if (error) {
      console.error(error);
    } else {
      setPosts(data as Post[]);
      if (count !== null) setTotalCount(count);
    }
    setLoadingPosts(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchPosts(), 400);
    return () => clearTimeout(timer);
  }, [page, search]);

  const cancelEdit = () => {
    setEditId(null);
    setTitle('');
    setSubtitle('');
    setContent('');
    setExternalLink('');
    setFeedback(null);
  };

  const handleEdit = (post: Post) => {
    setEditId(post.id);
    setTitle(post.title);
    setSubtitle(post.subtitle || '');
    setContent(post.content || '');
    setExternalLink(post.external_link || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.')) {
      const { error } = await supabase.from('posts').delete().eq('id', id);
      if (error) {
        alert('Erro ao excluir: ' + error.message);
      } else {
        if (posts.length === 1 && page > 0) setPage(page - 1);
        else fetchPosts();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const postData = {
      title,
      subtitle,
      content: content || null,
      external_link: externalLink || null,
    };

    let error;
    if (editId) {
      const res = await supabase.from('posts').update(postData).eq('id', editId);
      error = res.error;
    } else {
      const res = await supabase.from('posts').insert([postData]);
      error = res.error;
    }

    if (error) {
      console.error('Erro Supabase:', error.message, error.details, error.hint);
      setFeedback({ type: 'error', message: `Erro ao salvar: ${error.message}` });
    } else {
      setFeedback({ type: 'success', message: editId ? 'Post atualizado com sucesso!' : 'Post publicado com sucesso!' });
      cancelEdit();
      fetchPosts();
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-light font-arial p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-playa text-4xl text-secondary">Dashboard Admin</h1>
          <button 
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            Sair
          </button>
        </div>

        <div className="bg-white p-6 md:p-8 pb-10 rounded-2xl shadow-sm mb-12">
          <h2 className="font-playa text-2xl mb-6 text-primary">{editId ? 'Atualizar Post do Blog' : 'Novo Post do Blog'}</h2>
          
          {feedback && (
            <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${
              feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {feedback.message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Título do Post</label>
              <input 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Ex: Os benefícios do botox"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtítulo</label>
              <input 
                type="text" 
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Resumo auxiliar para a chamada do artigo"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link Externo</label>
              <input 
                type="url" 
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="https://link-do-artigo.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Conteúdo</label>
              <textarea 
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="Escreva o conteúdo do post aqui..."
              />
            </div>

            <div className="flex gap-4 mt-8">
              {editId && (
                <button 
                  type="button" 
                  onClick={cancelEdit}
                  className="w-1/3 bg-gray-200 text-gray-800 font-playa text-xl py-4 rounded-lg hover:bg-gray-300 transition-all font-bold tracking-wider"
                >
                  Cancelar
                </button>
              )}
              <button 
                type="submit" 
                disabled={loading}
                className={`${editId ? 'w-2/3' : 'w-full'} bg-gray-900 text-white font-playa text-xl py-4 rounded-lg hover:bg-black transition-all font-bold tracking-wider disabled:opacity-70`}
              >
                {loading ? 'Salvando...' : (editId ? 'Atualizar Post' : 'Publicar Post')}
              </button>
            </div>
          </form>
        </div>

        {/* Tabela de Posts */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h2 className="font-playa text-2xl text-primary">Artigos Publicados</h2>
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Buscar pelo título..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(0); }}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary text-sm"
              />
              <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
            </div>
          </div>

          {loadingPosts ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : posts.length === 0 ? (
            <p className="text-gray-500 py-10 text-center">{search ? 'Nenhum artigo encontrado com esse título.' : 'Nenhum artigo publicado ainda.'}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
                    <th className="pb-3 font-medium">Título</th>
                    <th className="pb-3 font-medium">Data</th>
                    <th className="pb-3 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 font-medium text-gray-800 pr-4">{post.title}</td>
                      <td className="py-4 text-sm text-gray-500 whitespace-nowrap">
                        {new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                      </td>
                      <td className="py-4 text-right whitespace-nowrap">
                        <button onClick={() => handleEdit(post)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors mr-2" title="Editar">
                          <Pencil size={18} />
                        </button>
                        <button onClick={() => handleDelete(post.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Paginação */}
          {totalCount > ITEMS_PER_PAGE && (
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <button 
                disabled={page === 0} 
                onClick={() => setPage(p => p - 1)}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors disabled:opacity-30"
              >
                <ChevronLeft size={16} className="mr-1" /> Anterior
              </button>
              <span className="text-sm text-gray-500">
                Página {page + 1} de {Math.ceil(totalCount / ITEMS_PER_PAGE)}
              </span>
              <button 
                disabled={(page + 1) * ITEMS_PER_PAGE >= totalCount}
                onClick={() => setPage(p => p + 1)}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-primary transition-colors disabled:opacity-30"
              >
                Próxima <ChevronRight size={16} className="ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
