import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

type FieldType = 'texto' | 'opções' | 'subcampo';

interface Field {
  name: string;
  type: FieldType;
  options?: string[];
  subfields?: Field[];
}

type ProjectData = {
  [key: string]: Field;
};

const defaultFields: Field[] = [
  { name: 'cliente', type: 'texto' },
  { name: 'data_atualizacao', type: 'texto' },
  { name: 'numero_pasta_legal', type: 'texto' },
  { name: 'numero_processo_cnj', type: 'texto' },
  { name: 'tipo_acao', type: 'texto' },
  { name: 'polo_ativo', type: 'texto' },
  { name: 'polo_passivo', type: 'texto' },
  { name: 'vara_comarca', type: 'texto' },
  { name: 'data_distribuicao_acao', type: 'texto' },
  { name: 'valor_atribuido_causa', type: 'texto' },
  { name: 'objeto_acao', type: 'texto' },
];

export default function EditarCampos() {
  const router = useRouter();
  const { id } = router.query;
  const [fields, setFields] = useState<Field[]>(defaultFields);
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldType, setNewFieldType] = useState<FieldType>('texto');

  useEffect(() => {
    if (id) {
      const projectData = localStorage.getItem(`project_${id}`);
      if (projectData) {
        const parsedData: ProjectData = JSON.parse(projectData);
        setFields(Object.values(parsedData));
      }
    }
  }, [id]);

  const handleSave = () => {
    if (id) {
      const updatedData: ProjectData = fields.reduce((acc: ProjectData, field) => {
        acc[field.name] = field;
        return acc;
      }, {});
      localStorage.setItem(`project_${id}`, JSON.stringify(updatedData));
      alert('Campos atualizados com sucesso!');
    }
  };

  const handleAddField = () => {
    if (newFieldName && !fields.some(field => field.name === newFieldName)) {
      setFields([...fields, { name: newFieldName, type: newFieldType }]);
      setNewFieldName('');
      setNewFieldType('texto');
    }
  };

  const handleRemoveField = (fieldName: string) => {
    setFields(fields.filter(field => field.name !== fieldName));
  };

  const handleFieldTypeChange = (fieldName: string, newType: FieldType) => {
    setFields(fields.map(field => 
      field.name === fieldName ? { ...field, type: newType, options: newType === 'opções' ? [] : undefined, subfields: newType === 'subcampo' ? [] : undefined } : field
    ));
  };

  const handleAddOption = (fieldName: string, option: string) => {
    setFields(fields.map(field => 
      field.name === fieldName && field.type === 'opções' ? { ...field, options: [...(field.options || []), option] } : field
    ));
  };

  const handleRemoveOption = (fieldName: string, optionToRemove: string) => {
    setFields(fields.map(field => 
      field.name === fieldName && field.type === 'opções' ? { ...field, options: field.options?.filter(option => option !== optionToRemove) } : field
    ));
  };

  const handleAddSubfield = (parentFieldName: string, subfieldName: string, subfieldType: FieldType) => {
    setFields(fields.map(field => 
      field.name === parentFieldName && field.type === 'subcampo' ? { ...field, subfields: [...(field.subfields || []), { name: subfieldName, type: subfieldType }] } : field
    ));
  };

  const handleRemoveSubfield = (parentFieldName: string, subfieldName: string) => {
    setFields(fields.map(field => 
      field.name === parentFieldName && field.type === 'subcampo' ? { ...field, subfields: field.subfields?.filter(subfield => subfield.name !== subfieldName) } : field
    ));
  };

  const handleSubfieldTypeChange = (parentFieldName: string, subfieldName: string, newType: FieldType) => {
    setFields(fields.map(field => 
      field.name === parentFieldName && field.type === 'subcampo' ? {
        ...field,
        subfields: field.subfields?.map(subfield =>
          subfield.name === subfieldName ? { ...subfield, type: newType } : subfield
        )
      } : field
    ));
  };

  const renderField = (field: Field) => (
    <div key={field.name} className="bg-white shadow-md rounded-lg p-6 mb-6 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1rem)] mx-2">
      <div className="flex items-center justify-between mb-4">
        <span className="text-lg font-semibold truncate mr-2">{field.name}</span>
        <div className="flex items-center flex-shrink-0">
          <select
            value={field.type}
            onChange={(e) => handleFieldTypeChange(field.name, e.target.value as FieldType)}
            className="mr-2 p-1 text-sm border border-gray-300 rounded-md"
          >
            <option value="texto">Texto</option>
            <option value="opções">Opções</option>
            <option value="subcampo">Subcampo</option>
          </select>
          <button
            onClick={() => handleRemoveField(field.name)}
            className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition duration-150 ease-in-out text-sm"
          >
            🗑️
          </button>
        </div>
      </div>
      {field.type === 'opções' && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Opções:</h4>
          <ul className="list-disc list-inside">
            {field.options?.map((option, index) => (
              <li key={`${field.name}-option-${index}`} className="flex items-center justify-between mb-1">
                <span className="truncate mr-2">{option}</span>
                <button
                  onClick={() => handleRemoveOption(field.name, option)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex">
            <input
              type="text"
              placeholder="Nova opção"
              className="flex-grow p-2 border border-gray-300 rounded-md mr-2"
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  handleAddOption(field.name, e.currentTarget.value);
                  e.currentTarget.value = '';
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector(`input[placeholder="Nova opção"]`) as HTMLInputElement;
                if (input && input.value) {
                  handleAddOption(field.name, input.value);
                  input.value = '';
                }
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-150 ease-in-out"
            >
              +
            </button>
          </div>
        </div>
      )}
      {field.type === 'subcampo' && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Subcampos:</h4>
          <ul className="list-disc list-inside">
            {field.subfields?.map((subfield, index) => (
              <li key={`${field.name}-subfield-${index}`} className="flex items-center justify-between mb-2">
                <span className="truncate mr-2">{subfield.name}</span>
                <div className="flex items-center flex-shrink-0">
                  <select
                    value={subfield.type}
                    onChange={(e) => handleSubfieldTypeChange(field.name, subfield.name, e.target.value as FieldType)}
                    className="mr-2 p-1 text-sm border border-gray-300 rounded-md"
                  >
                    <option value="texto">Texto</option>
                    <option value="opções">Opções</option>
                    <option value="subcampo">Subcampo</option>
                  </select>
                  <button
                    onClick={() => handleRemoveSubfield(field.name, subfield.name)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-2 flex">
            <input
              type="text"
              placeholder="Novo subcampo"
              className="flex-grow p-2 border border-gray-300 rounded-md mr-2"
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  handleAddSubfield(field.name, e.currentTarget.value, 'texto');
                  e.currentTarget.value = '';
                }
              }}
            />
            <button
              onClick={() => {
                const input = document.querySelector(`input[placeholder="Novo subcampo"]`) as HTMLInputElement;
                if (input && input.value) {
                  handleAddSubfield(field.name, input.value, 'texto');
                  input.value = '';
                }
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-150 ease-in-out"
            >
              +
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Editar Campos</h1>
        <div className="flex flex-wrap -mx-2">
          {fields.map(renderField)}
        </div>
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Adicionar Novo Campo</h2>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              value={newFieldName}
              onChange={(e) => setNewFieldName(e.target.value)}
              placeholder="Nome do campo"
              className="flex-grow p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select
              value={newFieldType}
              onChange={(e) => setNewFieldType(e.target.value as FieldType)}
              className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="texto">Texto</option>
              <option value="opções">Opções</option>
              <option value="subcampo">Subcampo</option>
            </select>
            <button
              onClick={handleAddField}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-150 ease-in-out"
            >
              Adicionar Campo
            </button>
          </div>
        </div>
        <div className="flex justify-between mt-8">
          <button
            onClick={() => router.push('/projetos')}
            className="bg-gray-500 text-white px-6 py-2 rounded-md hover:bg-gray-600 transition duration-150 ease-in-out"
          >
            Voltar
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
          >
            Salvar
          </button>
        </div>
      </div>
    </Layout>
  );
}
