import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [externalLink, setExternalLink] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const { error } = await supabase.from('posts').insert([
      {
        title,
        content,
        image_url: imageUrl,
        external_link: externalLink || null, // Se vazio envia null
      }
    ]);

    if (error) {
      console.error(error);
      setFeedback({ type: 'error', message: 'Erro ao publicar o post. Tente novamente.' });
    } else {
      setFeedback({ type: 'success', message: 'Post publicado com sucesso!' });
      setTitle('');
      setContent('');
      setImageUrl('');
      setExternalLink('');
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

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm">
          <h2 className="font-playa text-2xl mb-6 text-primary">Novo Post do Blog</h2>
          
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
              <label className="block text-sm font-medium text-gray-700 mb-2">URL da Imagem</label>
              <input 
                type="url" 
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                placeholder="https://exemplo.com/imagem.jpg"
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

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-primary text-white font-playa text-xl py-4 rounded-lg hover:bg-opacity-90 transition-all font-bold tracking-wider disabled:opacity-70"
            >
              {loading ? 'Publicando...' : 'Publicar Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
