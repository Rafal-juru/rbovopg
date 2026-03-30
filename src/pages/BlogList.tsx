import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  external_link: string | null;
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
          <h1 className="font-playa text-4xl md:text-5xl text-secondary mb-4">Blog e Artigos</h1>
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
          <div className="flex flex-col gap-8 md:gap-10">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col md:flex-row"
              >
                {post.image_url && (
                  <div className="w-full md:w-2/5 h-64 md:h-auto overflow-hidden">
                    <img 
                      src={post.image_url} 
                      alt={post.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="p-8 md:p-10 flex flex-col justify-center flex-1">
                  <span className="text-sm text-gray-400 mb-3 block">
                    {new Date(post.created_at).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </span>
                  
                  <h2 className="font-playa text-2xl md:text-3xl text-secondary mb-4 leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>
                  
                  <div className="mt-auto">
                    {post.external_link ? (
                      <a 
                        href={post.external_link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-black transition-colors"
                      >
                        Leia mais <ExternalLink size={16} />
                      </a>
                    ) : (
                      <Link 
                        to={`/blog/${post.id}`} 
                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-black transition-colors"
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
