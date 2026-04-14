import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Pencil, Trash2, Search, ChevronLeft, ChevronRight, Image as ImageIcon, Bold, Italic, Heading2, Heading3, List, ListOrdered, Link as LinkIcon, Eye, Edit3 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Post {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  external_link: string | null;
  image_url: string | null;
  created_at: string;
}

export function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [content, setContent] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const [editId, setEditId] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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
    setImageUrl('');
    setFeedback(null);
    setIsPreviewMode(false);
  };

  const handleEdit = (post: Post) => {
    setEditId(post.id);
    setTitle(post.title);
    setSubtitle(post.subtitle || '');
    setContent(post.content || '');
    setExternalLink(post.external_link || '');
    setImageUrl(post.image_url || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsPreviewMode(false);
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `cover_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);
      setImageUrl(publicUrl);
    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', message: 'Erro ao fazer upload da capa.' });
    } finally {
      setUploadingImage(false);
    }
  };

  const insertTextAtCursor = (before: string, after: string = '') => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const currentScroll = textareaRef.current.scrollTop;
    const selectedText = content.substring(start, end);

    let injection = before + selectedText + after;
    if (before === '[' && after === '](url)') {
      injection = `[${selectedText || 'texto'}](url)`;
    }

    const newContent = content.substring(0, start) + injection + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start + before.length, start + before.length + selectedText.length);
        textareaRef.current.scrollTop = currentScroll;
      }
    }, 0);
  };

  const insertListAtCursor = (ordered: boolean) => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;
    const currentScroll = textareaRef.current.scrollTop;
    const selectedText = content.substring(start, end);

    let injection = '';
    
    if (selectedText) {
      const lines = selectedText.split('\n');
      injection = lines.map((line, i) => ordered ? `${i + 1}. ${line}` : `- ${line}`).join('\n');
    } else {
      injection = ordered ? '\n1. ' : '\n- ';
    }

    const newContent = content.substring(0, start) + injection + content.substring(end);
    setContent(newContent);

    setTimeout(() => {
      if (textareaRef.current) {
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(start, start + injection.length);
        textareaRef.current.scrollTop = currentScroll;
      }
    }, 0);
  };

  const handleToolbarClick = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    action();
  };

  const handleToolbarImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !textareaRef.current) return;
    
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;

    const uploadingText = "\n![Fazendo upload...]()\n";
    setContent(content.substring(0, start) + uploadingText + content.substring(end));

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `md_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage.from('blog-images').upload(fileName, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);

      const markdownImage = `\n![imagem](${publicUrl})\n`;
      setContent(c => c.replace(uploadingText, markdownImage));
    } catch (error) {
      console.error(error);
      setContent(c => c.replace(uploadingText, ''));
      setFeedback({ type: 'error', message: 'Falha ao fazer upload da imagem no markdown.' });
    }
  };

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData.items;
    const file = Array.from(items).find(item => item.type.startsWith('image/'))?.getAsFile();
    
    if (file) {
      e.preventDefault();
      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      const uploadingText = "\n![Fazendo upload...]()\n";
      const newContent = content.substring(0, start) + uploadingText + content.substring(end);
      setContent(newContent);
      
      try {
        const fileExt = file.name.split('.').pop();
        const fileName = `md_${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage.from('blog-images').upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage.from('blog-images').getPublicUrl(fileName);

        const markdownImage = `\n![imagem](${publicUrl})\n`;
        const updatedContent = content.substring(0, start) + markdownImage + content.substring(end);
        setContent(updatedContent);
        
      } catch (error) {
        console.error('Erro no upload da imagem:', error);
        setContent(content.substring(0, start) + content.substring(end)); 
        setFeedback({ type: 'error', message: 'Falha ao fazer upload da imagem no markdown.' });
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
      content: externalLink.trim() ? null : (content || null),
      external_link: content.trim() ? null : (externalLink || null),
      image_url: imageUrl || null
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

  // State checks for exclusivity
  const hasContent = !!content.trim();
  const hasExternalLink = !!externalLink.trim();

  return (
    <div className="min-h-screen bg-bg-light font-arial p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="font-body font-bold text-4xl text-secondary">Dashboard Admin</h1>
          <button 
            onClick={handleLogout}
            className="text-gray-500 hover:text-gray-800 transition-colors"
          >
            Sair
          </button>
        </div>

        <div className="bg-white p-6 md:p-8 pb-10 rounded-2xl shadow-sm mb-12">
          <h2 className="font-body font-bold text-2xl mb-6 text-primary">{editId ? 'Atualizar Post do Blog' : 'Novo Post do Blog'}</h2>
          
          {feedback && (
            <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${
              feedback.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
            }`}>
              {feedback.message}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            
            <div className="flex items-start gap-6 border border-gray-200 p-4 rounded-lg bg-gray-50/50">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Imagem de Capa (Opcional)</label>
                <div className="flex items-center gap-4">
                  <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 flex items-center gap-2">
                    <ImageIcon size={16} />
                    {uploadingImage ? 'Enviando...' : 'Escolher Imagem'}
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                  </label>
                  {imageUrl && (
                    <button type="button" onClick={() => setImageUrl('')} className="text-sm text-red-500 hover:text-red-700">
                      Remover
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">Esta imagem aparecerá no topo do artigo e na listagem.</p>
              </div>
              {imageUrl && (
                 <div className="w-32 h-20 rounded-md overflow-hidden bg-gray-200 shrink-0">
                    <img src={imageUrl} alt="Capa" className="w-full h-full object-cover" />
                 </div>
              )}
            </div>

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

            {/* ALERTA VISUAL - REGRA DE EXCLUSIVIDADE */}
            <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg mb-6 flex items-start text-orange-800 text-sm">
              <p><strong>Atenção:</strong> O Link Externo e o Conteúdo não trabalham em conjunto. Se você preencher o Link Externo, o post será um redirecionamento direto para a matéria e o texto interno será desativado.</p>
            </div>

            <div className={`${hasContent ? 'opacity-50 pointer-events-none' : ''}`}>
              <label className="block text-sm font-medium text-gray-700 mb-2">Link Externo</label>
              <input 
                type="url" 
                value={externalLink}
                disabled={hasContent}
                onChange={(e) => setExternalLink(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary disabled:bg-gray-100 disabled:text-gray-400 transition-opacity"
                placeholder="https://link-do-artigo.com"
              />
            </div>

            <div className={`mt-6 ${hasExternalLink ? 'opacity-50 pointer-events-none' : ''}`}>
              <div className="flex justify-between items-end mb-2">
                <div className="flex flex-col">
                  <label className="block text-sm font-medium text-gray-700">Conteúdo (Markdown suportado)</label>
                  {!isPreviewMode && <p className="text-xs text-gray-500 mt-1">Dica: Você pode copiar uma imagem e usar <kbd className="bg-gray-100 px-1 rounded border border-gray-200">Ctrl+V</kbd> dentro do editor.</p>}
                </div>
                
                {/* Toggles de Preview / Edição */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button type="button" onClick={() => setIsPreviewMode(false)} className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors ${!isPreviewMode ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Edit3 size={14} /> Edição
                  </button>
                  <button type="button" onClick={() => setIsPreviewMode(true)} className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors ${isPreviewMode ? 'bg-white shadow-sm text-gray-900 border border-gray-200/50' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Eye size={14} /> Visualização
                  </button>
                </div>
              </div>

              {isPreviewMode ? (
                <div className="w-full min-h-[300px] p-6 border border-gray-200 rounded-lg bg-white/50 markdown-content">
                  {content ? (
                    <ReactMarkdown components={{
                        img: ({node, ...props}) => <img className="rounded-2xl max-w-full h-auto my-6 mx-auto shadow-sm border border-gray-100" {...props} />,
                        p: ({node, ...props}) => <p className="mb-6 last:mb-0 text-gray-700 leading-relaxed text-lg" {...props} />,
                        a: ({node, ...props}) => <a className="text-primary hover:underline font-medium" target="_blank" rel="noopener noreferrer" {...props} />,
                        h2: ({node, ...props}) => <h2 className="font-body font-bold text-3xl text-gray-900 mt-8 mb-4 border-b pb-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="font-body font-bold text-2xl text-gray-900 mt-6 mb-3" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-6 text-gray-700 space-y-2" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-gray-900" {...props} />
                    }}>
                      {content}
                    </ReactMarkdown>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400 italic text-sm py-12">
                      O preview formatado aparecerá aqui...
                    </div>
                  )}
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all bg-white">
                  {/* TOOLBAR */}
                  <div className="bg-gray-50/80 border-b border-gray-200 px-3 py-2 flex items-center gap-1 flex-wrap">
                    <button type="button" onClick={(e) => handleToolbarClick(e, () => insertTextAtCursor('**', '**'))} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors" title="Negrito"><Bold size={16} /></button>
                    <button type="button" onClick={(e) => handleToolbarClick(e, () => insertTextAtCursor('*', '*'))} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors" title="Itálico"><Italic size={16} /></button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={(e) => handleToolbarClick(e, () => insertTextAtCursor('\n## ', ''))} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors" title="Título H2"><Heading2 size={16} /></button>
                    <button type="button" onClick={(e) => handleToolbarClick(e, () => insertTextAtCursor('\n### ', ''))} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors" title="Título H3"><Heading3 size={16} /></button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={(e) => handleToolbarClick(e, () => insertListAtCursor(false))} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors" title="Lista"><List size={16} /></button>
                    <button type="button" onClick={(e) => handleToolbarClick(e, () => insertListAtCursor(true))} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors" title="Lista Numerada"><ListOrdered size={16} /></button>
                    <div className="w-px h-5 bg-gray-300 mx-1"></div>
                    <button type="button" onClick={(e) => handleToolbarClick(e, () => insertTextAtCursor('[', '](url)'))} className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors" title="Link"><LinkIcon size={16} /></button>
                    <label className="p-1.5 text-gray-600 hover:bg-gray-200 hover:text-gray-900 rounded transition-colors cursor-pointer" title="Inserir Imagem">
                      <ImageIcon size={16} />
                      <input type="file" accept="image/*" className="hidden" onChange={handleToolbarImageUpload} />
                    </label>
                  </div>
                  <textarea 
                    ref={textareaRef}
                    rows={12}
                    value={content}
                    disabled={hasExternalLink}
                    onPaste={handlePaste}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-4 focus:outline-none font-mono text-sm resize-y text-gray-800"
                    placeholder="Escreva o conteúdo do post aqui em Markdown..."
                  />
                </div>
              )}
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
                disabled={loading || uploadingImage}
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
            <h2 className="font-body font-bold text-2xl text-primary">Artigos Publicados</h2>
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
                    <th className="pb-3 font-medium">Capa</th>
                    <th className="pb-3 font-medium">Título</th>
                    <th className="pb-3 font-medium">Data</th>
                    <th className="pb-3 font-medium text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 pr-4">
                        {post.image_url ? (
                          <div className="w-12 h-8 rounded shrink-0 overflow-hidden bg-gray-100">
                             <img src={post.image_url} alt="Capa" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Sem capa</span>
                        )}
                      </td>
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
