import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';

import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { LoadingSpinner } from '../components/LoadingSpinner';

import { Bell, UserCircle, Clock, CheckCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';

export const Solicitacoes = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingRequests, setProcessingRequests] = useState(new Set());

  useEffect(() => {
    loadRequests();
  }, [user.id]);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getRequests(user.id);
      const pendingRequests = data.filter(req => req.status === 'pendente');
      setRequests(pendingRequests);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptRequest = async (requestId, requestData) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
    try {
      const existingPatients = await mockApi.getPatients(user.id);
      const duplicatePatient = existingPatients.find(p => p.email === requestData.patientEmail);
      if (duplicatePatient) {
        toast.error('Este paciente já está cadastrado em sua lista!');
        return;
      }

      await mockApi.createPatient({
        name: requestData.patientName,
        email: requestData.patientEmail,
        phone: requestData.patientPhone,
        birthDate: '1990-01-01',
        age: 30,
        status: 'Ativo',
        psychologistId: user.id
      });

      await mockApi.updateRequestStatus(requestId, 'aceito', 'Paciente aceito e cadastrado no sistema');
      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Solicitação aceita! Paciente adicionado à sua lista.');
    } catch (error) {
      console.error('Erro ao aceitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const handleRejectRequest = async (requestId) => {
    setProcessingRequests(prev => new Set([...prev, requestId]));
    try {
      await mockApi.updateRequestStatus(requestId, 'rejeitado', 'Solicitação rejeitada pelo psicólogo');
      setRequests(prev => prev.filter(req => req.id !== requestId));
      toast.success('Solicitação rejeitada.');
    } catch (error) {
      console.error('Erro ao rejeitar solicitação:', error);
      toast.error('Erro ao processar solicitação');
    } finally {
      setProcessingRequests(prev => {
        const newSet = new Set(prev);
        newSet.delete(requestId);
        return newSet;
      });
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'alta': return 'bg-rose-100 text-rose-700';
      case 'media': return 'bg-yellow-100 text-yellow-700';
      case 'baixa': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'aceito': return 'bg-emerald-100 text-emerald-700';
      case 'rejeitado': return 'bg-rose-100 text-rose-700';
      case 'pendente': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6  border-[#C9B5A7] bg-[#F7EFE7] min-h-screen p-6 rounded-lg">
      <div className="flex items-center gap-3">
        <Bell className="w-8 h-8 text-gray-600" />
        <h1 className="text-3xl font-bold text-[#5A3E36]">Solicitações de Pacientes</h1>
      </div>

      <div className="grid gap-6">
        {requests.length === 0 ? (
          <Card className="text-center py-12 bg-white border border-gray-200 rounded-lg shadow-sm">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma solicitação encontrada</h3>
            <p className="text-gray-500">As solicitações de novos pacientes aparecerão aqui.</p>
          </Card>
        ) : (
          requests.map(request => (
            <Card key={request.id} className="space-y-4 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-light  to-light rounded-full flex items-center justify-center">
                    <UserCircle className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{request.patientName}</h3>
                    <p className="text-sm text-gray-600">{request.patientEmail}</p>
                    <p className="text-sm text-gray-600">{request.patientPhone}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(request.urgency)}`}>
                    {request.urgency === 'alta' ? 'Alta' : request.urgency === 'media' ? 'Média' : 'Baixa'} urgência
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                    {request.status === 'aceito' ? 'Aceito' : request.status === 'rejeitado' ? 'Rejeitado' : 'Pendente'}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="font-medium text-gray-700 mb-2">Descrição da necessidade:</h4>
                <p className="text-gray-600">{request.description}</p>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Enviado em {new Date(request.createdAt).toLocaleDateString('pt-BR')}
                </div>
              </div>

              {request.notes && (
                <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                  <p className="text-sm text-light ">
                    <strong>Observações:</strong> {request.notes}
                  </p>
                </div>
              )}

              <div className="flex justify-between items-center mt-4 gap-4">
                {/* Botão Rejeitar */}
                <Button
                  variant="ghost"
                  onClick={() => handleRejectRequest(request.id)}
                  loading={processingRequests.has(request.id)}
                  className="w-1/2 flex items-center justify-center gap-2 px-4 py-3 rounded-md  border-amber-600 bg-light hover:bg-white text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                  Recusar
                </Button>

                {/* Botão Aceitar */}
                <Button
                  onClick={() => handleAcceptRequest(request.id, request)}
                  loading={processingRequests.has(request.id)}
                  className="w-1/2 flex items-center justify-center gap-2 px-4 py-3 rounded-md border border-emerald-200 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors font-medium"
                >
                  <CheckCircle className="w-5 h-5" />
                  Aceitar
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
