import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

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
        external_link: externalLink || null,
      }
    ]);

    if (error) {
      console.error(error);
      setFeedback({ type: 'error', message: 'Erro ao publicar o post. Tente novamente.' });
    } else {
      setFeedback({ type: 'success', message: 'Post publicado com sucesso.' });
      setTitle('');
      setContent('');
      setImageUrl('');
      setExternalLink('');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-light p-8 font-body">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <p className="section-kicker mb-2 text-2xl">Área administrativa</p>
            <h1 className="text-4xl font-semibold text-brand-black">Dashboard Admin</h1>
          </div>
          <button
            onClick={handleLogout}
            className="text-brand-black/60 transition-colors hover:text-brand-black"
          >
            Sair
          </button>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8">
          <h2 className="mb-6 text-3xl font-semibold text-brand-black">Novo post do Blog Bovo</h2>

          {feedback && (
            <div
              className={`mb-6 rounded-lg p-4 text-sm font-medium ${
                feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}
            >
              {feedback.message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Título do post</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border border-brand-gold/30 bg-white/80 px-4 py-3 transition-colors focus:border-brand-gold-deep focus:outline-none focus:ring-1 focus:ring-brand-gold-deep"
                placeholder="Ex: Os benefícios do botox"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">URL da imagem</label>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded-lg border border-brand-gold/30 bg-white/80 px-4 py-3 transition-colors focus:border-brand-gold-deep focus:outline-none focus:ring-1 focus:ring-brand-gold-deep"
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Link externo</label>
              <input
                type="url"
                value={externalLink}
                onChange={(e) => setExternalLink(e.target.value)}
                className="w-full rounded-lg border border-brand-gold/30 bg-white/80 px-4 py-3 transition-colors focus:border-brand-gold-deep focus:outline-none focus:ring-1 focus:ring-brand-gold-deep"
                placeholder="https://link-do-artigo.com"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Conteúdo</label>
              <textarea
                rows={8}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full rounded-lg border border-brand-gold/30 bg-white/80 px-4 py-3 transition-colors focus:border-brand-gold-deep focus:outline-none focus:ring-1 focus:ring-brand-gold-deep"
                placeholder="Escreva o conteúdo do post aqui..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-brand-black py-4 text-xl font-semibold text-white transition-all hover:bg-brand-gold-deep disabled:opacity-70"
            >
              {loading ? 'Publicando...' : 'Publicar post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
