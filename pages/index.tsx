import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';
import { useAuth } from '../contexts/AuthContext';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <Layout>
      <div 
        className="min-h-screen bg-cover bg-center flex items-center justify-center" 
        style={{backgroundImage: "url('/background-law.jpg')"}}
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md max-w-2xl w-full">
          {isAuthenticated ? (
            <>
              <h2 className="text-3xl font-bold mb-6 text-center">Bem-vindo ao seu Dashboard</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Novo Projeto</h3>
                  <p className="mb-4">Inicie um novo caso de recuperação de crédito.</p>
                  <button 
                    onClick={() => router.push('/novo-projeto')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
                  >
                    Criar Projeto
                  </button>
                </div>
                <div className="bg-green-100 p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-2">Projetos Recentes</h3>
                  <p className="mb-4">Visualize e gerencie seus casos ativos.</p>
                  <button 
                    onClick={() => router.push('/projetos')}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
                  >
                    Ver Projetos
                  </button>
                </div>
                <div className="bg-yellow-100 p-6 rounded-lg shadow-md col-span-2">
                  <h3 className="text-xl font-semibold mb-2">Editar Campos</h3>
                  <p className="mb-4">Edite, adicione ou remova campos padrão para novos projetos.</p>
                  <button 
                    onClick={() => router.push('/editar-campos')}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
                  >
                    Editar Campos
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Bem-vindo ao JurisAI</h2>
              <p className="mb-6">JurisAI é uma plataforma para escritórios de advocacia especializados em recuperação de crédito. Faça login para acessar suas ferramentas de gestão de casos.</p>
              <button 
                onClick={() => router.push('/login')}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Fazer Login
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
