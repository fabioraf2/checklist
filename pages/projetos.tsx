import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

// Mock data for projects
const mockProjects = [
  { id: 1, cliente: 'Cliente A', numero_processo: '12345-67.2023.8.26.0100', data_atualizacao: '2023-06-01' },
  { id: 2, cliente: 'Cliente B', numero_processo: '98765-43.2023.8.26.0100', data_atualizacao: '2023-06-02' },
  { id: 3, cliente: 'Cliente C', numero_processo: '56789-01.2023.8.26.0100', data_atualizacao: '2023-06-03' },
];

export default function Projetos() {
  const router = useRouter();

  const handleViewProject = (id: number) => {
    // In a real application, this would navigate to a project detail page
    console.log(`Viewing project ${id}`);
  };

  const handleEditProject = (id: number) => {
    // In a real application, this would navigate to a project edit page
    console.log(`Editing project ${id}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Projetos Recentes</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Cliente</th>
                <th className="py-3 px-6 text-left">Número do Processo</th>
                <th className="py-3 px-6 text-left">Data de Atualização</th>
                <th className="py-3 px-6 text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {mockProjects.map((project) => (
                <tr key={project.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">{project.cliente}</td>
                  <td className="py-3 px-6 text-left">{project.numero_processo}</td>
                  <td className="py-3 px-6 text-left">{project.data_atualizacao}</td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleViewProject(project.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Voltar
          </button>
        </div>
      </div>
    </Layout>
  );
}
