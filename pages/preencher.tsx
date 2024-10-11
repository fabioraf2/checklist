import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

export default function Preencher() {
  const router = useRouter();
  const { id } = router.query;
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (id) {
      // Load the project data from localStorage
      const projectData = localStorage.getItem(`project_${id}`);
      if (projectData) {
        setFormData(JSON.parse(projectData));
      }
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the updated form data
    localStorage.setItem(`project_${id}`, JSON.stringify(formData));
    // Redirect to the projects page or show a success message
    router.push('/projetos');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Preencher Projeto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {Object.entries(formData).map(([key, value]) => (
            <div key={key}>
              <label htmlFor={key} className="block mb-2 capitalize">{key.replace(/_/g, ' ')}</label>
              <input
                type="text"
                id={key}
                name={key}
                value={value}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/projetos')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
