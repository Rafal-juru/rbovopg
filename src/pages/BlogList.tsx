import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  external_link: string | null;
  image_url: string | null;
  created_at: string;
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
    <div className="min-h-screen bg-bg-light font-arial py-12 md:py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="font-playa font-bold text-4xl md:text-5xl text-secondary mb-4">Blog e Artigos</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Acompanhe as últimas novidades, dicas e informações sobre medicina estética e bem-estar.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            Nenhum artigo publicado ainda.
          </div>
        ) : (
          <div className="flex flex-col gap-8 md:gap-12">
            {posts.map((post) => {
              const LinkComponent = post.external_link ? 'a' : Link;
              const linkProps = post.external_link 
                ? { href: post.external_link, target: "_blank", rel: "noopener noreferrer" }
                : { to: `/blog/${post.id}` };

              return (
                <article 
                  key={post.id} 
                  className="bg-white p-8 md:p-12 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100/50 flex flex-col"
                >
                  {post.image_url && (
                    <LinkComponent {...(linkProps as any)} className="block mb-8 overflow-hidden rounded-xl">
                      <img 
                        src={post.image_url} 
                        alt={post.title} 
                        className="w-full h-64 md:h-80 object-cover transform hover:scale-105 transition-transform duration-700 ease-in-out" 
                      />
                    </LinkComponent>
                  )}

                  <div className="mb-4">
                    <span className="text-xs tracking-widest uppercase text-gray-400 font-medium">
                      {new Date(post.created_at).toLocaleDateString('pt-BR', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <LinkComponent {...(linkProps as any)} className="group block mb-4">
                    <h2 className="font-body font-bold text-3xl md:text-4xl text-gray-900 group-hover:text-gray-600 transition-colors leading-tight">
                      {post.title}
                    </h2>
                  </LinkComponent>
                  
                  {post.subtitle && (
                    <p className="text-gray-500 text-lg md:text-xl font-arial mb-8 leading-relaxed">
                      {post.subtitle}
                    </p>
                  )}
                  
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    <LinkComponent 
                      {...(linkProps as any)}
                      className="inline-flex items-center gap-2 text-gray-900 font-bold hover:text-gray-600 transition-colors uppercase tracking-wider text-sm"
                    >
                      {post.external_link ? 'Acessar Matéria' : 'Ler artigo'} {post.external_link && <ExternalLink size={14} />}
                    </LinkComponent>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
