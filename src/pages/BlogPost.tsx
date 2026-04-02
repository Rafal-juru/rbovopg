import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ExternalLink, ArrowLeft } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  external_link: string | null;
  created_at: string;
}

export function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
      if (error || !data) {
        navigate('/blog');
      } else {
        setPost(data as Post);
        document.title = `${data.title} | Dr. Ricardo Bovo`;
      }
      setLoading(false);
    };
    if (id) fetchPost();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-bg-light">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) return null;

  const renderContent = () => {
    return post.content?.split('\n').map((paragraph, idx) => {
      if (!paragraph.trim()) return <br key={idx} />;
      return <p key={idx} className="mb-6">{paragraph}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-bg-light font-arial py-12 md:py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium text-sm">
            <ArrowLeft size={16} /> Voltar para o Blog
          </Link>
        </div>

        <article className="bg-white p-8 md:p-16 rounded-3xl shadow-sm border border-gray-100/50">
          <header className="mb-12">
            <span className="text-sm tracking-widest uppercase text-gray-400 font-medium block mb-6">
              {new Date(post.created_at).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
            <h1 className="font-playa text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>
            {post.subtitle && (
              <p className="text-xl md:text-2xl text-gray-500 leading-relaxed font-light">
                {post.subtitle}
              </p>
            )}
          </header>

          <div className="text-lg text-gray-700 leading-relaxed font-arial">
            {renderContent()}
          </div>

          {post.external_link && (
            <div className="mt-16 bg-gray-50 border border-gray-200 rounded-xl p-8 text-center flex flex-col items-center gap-4">
              <ExternalLink size={32} className="text-gray-400" />
              <p className="text-gray-600 max-w-md">Para aprofundar-se neste tema, leia a publicação completa no portal ou revista original onde o artigo foi veiculado.</p>
              <a 
                href={post.external_link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold tracking-wider uppercase text-sm px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors mt-2"
              >
                Ler matéria completa original
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
