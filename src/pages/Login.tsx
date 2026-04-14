import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError('E-mail ou senha inválidos. Tente novamente.');
    } else {
      navigate('/admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-light font-body">
      <div className="glass-card w-full max-w-md rounded-2xl p-10">
        <h1 className="mb-3 text-center text-4xl font-semibold text-brand-black">Acesso Restrito</h1>
        <p className="mb-8 text-center text-sm text-brand-black/60">
          A área pública de login não é divulgada no menu do site.
        </p>

        {error && (
          <div className="mb-6 rounded bg-red-50 p-3 text-center text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-brand-gold/30 bg-white/80 px-4 py-3 transition-colors focus:border-brand-gold-deep focus:outline-none focus:ring-1 focus:ring-brand-gold-deep"
              placeholder="seu@email.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-brand-gold/30 bg-white/80 px-4 py-3 transition-colors focus:border-brand-gold-deep focus:outline-none focus:ring-1 focus:ring-brand-gold-deep"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-brand-black py-4 text-xl font-semibold text-white transition-all hover:bg-brand-gold-deep disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    </div>
  );
}
