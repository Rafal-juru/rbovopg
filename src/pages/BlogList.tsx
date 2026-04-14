import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  content: string | null;
  image_url: string | null;
  external_link: string | null;
  created_at: string;
}

function getPreviewText(content: string | null | undefined) {
  if (!content) {
    return 'Conteudo em atualizacao.';
  }

  return content
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '$1')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/https?:\/\/\S+/g, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/#+\s/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function BlogList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar posts:', error);
      } else if (data) {
        setPosts(data as Post[]);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen px-6 py-12 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-semibold text-brand-black md:text-6xl">Blog-Bovo</h1>
          <p className="mx-auto max-w-2xl text-brand-black/70">
            Acompanhe novidades, dicas e informacoes sobre dermatologia, medicina estetica e bem-estar,
            com espaco preparado para fotos autorais nos artigos.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-brand-gold-deep"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="glass-card py-20 text-center text-brand-black/60">
            Nenhum artigo publicado ainda.
          </div>
        ) : (
          <div className="flex flex-col gap-8 md:gap-10">
            {posts.map((post) => (
              <article
                key={post.id}
                className="glass-card flex flex-col overflow-hidden rounded-[28px] transition-shadow duration-300 hover:shadow-md md:flex-row"
              >
                {post.image_url && (
                  <div className="h-64 w-full overflow-hidden md:h-auto md:w-2/5">
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex flex-1 flex-col justify-center p-8 md:p-10">
                  <span className="mb-3 block text-sm text-brand-black/45">
                    {new Date(post.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>

                  <h2 className="mb-4 text-2xl font-semibold leading-tight text-brand-black md:text-4xl">
                    {post.title}
                  </h2>

                  <p className="mb-6 line-clamp-3 leading-relaxed text-brand-black/70">
                    {getPreviewText(post.content)}
                  </p>

                  <div className="mt-auto">
                    {post.external_link ? (
                      <a
                        href={post.external_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-bold text-brand-gold-deep transition-colors hover:text-black"
                      >
                        Leia mais <ExternalLink size={16} />
                      </a>
                    ) : (
                      <Link
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 font-bold text-brand-gold-deep transition-colors hover:text-black"
                      >
                        Leia mais
                      </Link>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
