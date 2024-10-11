import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-600 text-white">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <span className="text-2xl font-bold cursor-pointer">JurisAI</span>
          </Link>
          {isAuthenticated && (
            <div className="space-x-4">
              <Link href="/projetos">
                <span className="hover:text-blue-200 cursor-pointer">Projetos</span>
              </Link>
              <Link href="/novo-projeto">
                <span className="hover:text-blue-200 cursor-pointer">Novo Projeto</span>
              </Link>
              <Link href="/editar-campos">
                <span className="hover:text-blue-200 cursor-pointer">Editar Campos</span>
              </Link>
              <button
                onClick={() => {
                  logout();
                  router.push('/login');
                }}
                className="hover:text-blue-200"
              >
                Logout
              </button>
            </div>
          )}
        </nav>
      </header>
      <main className="flex-grow">
        {children}
      </main>
      <footer className="bg-gray-200 text-center py-4">
        <p>&copy; 2023 JurisAI. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default Layout;
