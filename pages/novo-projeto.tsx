import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/layout';

export default function NovoProjeto() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    cliente: '',
    data_atualizacao: '',
    numero_pasta_legal: '',
    numero_processo_cnj: '',
    tipo_acao: '',
    polo_ativo: '',
    polo_passivo: [] as string[],
    vara_comarca: '',
    data_distribuicao_acao: '',
    valor_atribuido_causa: '',
    valor_atualizado_causa: {
      valor: '',
      data_atualizacao: '',
      criterio_atualizacao: ''
    },
    objeto_acao: '',
    titulos: [{
      numero_titulo: '',
      data_emissao: '',
      data_vencimento: '',
      valor_contabil: '',
      valor_original_debito: ''
    }],
    garantia: {
      tem_garantia: '',
      descricao_garantia: ''
    },
    andamentos_processuais: [] as string[],
    citacao: {
      positiva: '',
      negativa: {
        enderecos_diligenciados: [] as string[]
      },
      parcial: {
        partes_citadas_em_endereco: ''
      },
      edital: {
        partes_citadas: ''
      }
    },
    empresas_devedores: [{
      nome_devedor: '',
      cnpj: '',
      situacao: ''
    }],
    empresas_socios: [{
      nome_socio: '',
      cnpj: '',
      situacao: ''
    }],
    grupo_economico: {
      identificado: '',
      empresas: [] as string[]
    },
    estado_civil_devedores: {
      casado: '',
      regime_casamento: '',
      certidao_casamento: ''
    },
    filhos_devedores: [{
      nome: '',
      cpf: ''
    }],
    pesquisas_constritivas: {
      sistemas_conveniados: [] as string[],
      medidas_atipicas: [] as string[],
      penhora_faturamento_empresa: '',
      pesquisa_inss: '',
      pesquisa_cnh_passaporte: {
        cnh: '',
        passaporte: '',
        pontos_fidelidade: ''
      },
      pesquisa_joias: '',
      pesquisa_jazigos: '',
      pesquisa_cavalos_haras: ''
    },
    busca_penhora: {
      ativos_financeiros_conjuge: '',
      creditos_acoes_judiciais: '',
      penhora_rosto_autos: '',
      penhora_poupanca: '',
      oficio_empresas_consumo: [] as string[],
      embarcacao_capitania_portos: '',
      arma_fogo: ''
    },
    pesquisa_imoveis_extrajudicial: {
      cri: ''
    },
    pesquisa_veiculos_extrajudicial: {
      veiculos: [] as string[]
    },
    outras_acoes_devedor: [{
      numero_processo: '',
      valor_causa: ''
    }],
    outras_acoes_credor: [] as string[],
    inventario_devedor_socio: {
      localizado: '',
      processo: '',
      valor_causa: ''
    },
    pesquisas_redes_sociais: {
      devedores: [] as string[],
      filhos_devedores: [] as string[]
    },
    idpj_julgado: {
      foi_julgado: '',
      justificativa: ''
    },
    analise_risco_prescricao: {
      termo_inicial: '',
      prazo_final: ''
    },
    perspectiva_recuperacao_credito: '',
    casos_agro: {
      planta: '',
      tipo_cultura: '',
      inscricao_produtor_rural: '',
      penhora_excedente_lavoura: '',
      implementos_agricolas: '',
      pivo_central: '',
      energia_fotovoltaica: {
        placas: '',
        creditos_energia: ''
      },
      colheitadeiras_tratores: '',
      notificacao_armazens: [] as string[],
      pch_cgh: '',
      avioes_embarcacoes: [] as string[],
      contrato_arrendamento_parceria: {
        possui_contrato: '',
        registro_contrato: ''
      },
      auto_constatacao_fazenda: '',
      avaliacao_bandeira_agro: ''
    }
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you would typically save the form data to your backend
    // For this example, we'll simulate saving by using localStorage
    const projectId = Date.now().toString(); // Generate a unique ID
    localStorage.setItem(`project_${projectId}`, JSON.stringify(formData));
    
    // Redirect to the preencher page with the new project ID
    router.push(`/preencher?id=${projectId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Novo Projeto</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cliente" className="block mb-2">Cliente</label>
            <input
              type="text"
              id="cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="data_atualizacao" className="block mb-2">Data de Atualização</label>
            <input
              type="date"
              id="data_atualizacao"
              name="data_atualizacao"
              value={formData.data_atualizacao}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          {/* Add more form fields here for all the properties in the formData state */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Salvar e Preencher
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
