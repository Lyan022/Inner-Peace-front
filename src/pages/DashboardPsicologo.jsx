import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Calendar, Users, Bell , CheckCheck} from 'lucide-react';

export const DashboardPsicologo = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    try {
      const [appointmentsData, patientsData, requestsData] = await Promise.all([
        mockApi.getAppointments(user.id, 'psicologo'),
        mockApi.getPatients(user.id),
        mockApi.getRequests(user.id)
      ]);
      setAppointments(appointmentsData);
      setPatients(patientsData);
      setRequests(requestsData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Recarrega quando a página fica visível e a cada 5 segundos
  useEffect(() => {
    const handleFocus = () => loadData();
    window.addEventListener('focus', handleFocus);
    
    const interval = setInterval(loadData, 5000); // Recarrega a cada 5 segundos
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [loadData]);

  if (loading) return <LoadingSpinner size="lg" />;

  // Filtra agendamentos de hoje para o psicólogo logado (apenas agendados)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const todayAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.date);
    appointmentDate.setHours(0, 0, 0, 0);
    
    const isToday = appointmentDate.getTime() === today.getTime();
    const isPsychologist = apt.psychologistId === user.id;
    const isScheduled = apt.status === 'agendado';
    
    return isToday && isPsychologist && isScheduled;
  });

  // Estatísticas baseadas nos dados reais do psicólogo
  const totalPatients = patients.length;
  const completedSessions = appointments.filter(apt => 
    apt.status === 'concluido' && apt.psychologistId === user.id
  ).length;
  const pendingRequests = requests.filter(req => 
    req.status === 'pendente' && req.preferredPsychologist === user.id
  ).length;
  
  // Próximos agendamentos do psicólogo
  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.date) >= new Date() && 
    apt.status === 'agendado' &&
    apt.psychologistId === user.id
  ).slice(0, 5);

  // Verifica se é um psicólogo novo (sem dados)
  const isNewPsychologist = totalPatients === 0 && appointments.length === 0 && requests.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-dark">Dashboard</h1>
        <p className="text-white">Bem-vindo, {user.name}</p>
      </div>

      {/* Mensagem para psicólogos novos */}
      {isNewPsychologist && (
        <Card className="text-center py-8 border-2 border-dashed border-light/30">
          <Users className="w-16 h-16 text-light/50 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-dark mb-2">Bem-vindo ao Lunysse!</h3>
          <p className="text-dark/70 mb-4">
            Você é novo por aqui. Seus pacientes e agendamentos aparecerão neste dashboard 
            conforme você começar a receber solicitações e agendar sessões.
          </p>
          <p className="text-sm text-dark/50">
            Explore o menu lateral para conhecer todas as funcionalidades disponíveis.
          </p>
        </Card>
      )}

      {/* KPIs - Dados específicos do psicólogo logado */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <Users className="w-8 h-8 text-light mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-dark">{totalPatients}</h3>
          <p className="text-dark/70">Pacientes Ativos</p>
        </Card>

        <Card className="text-center">
          <Calendar className="w-8 h-8 text-accent mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-dark">{todayAppointments.length}</h3>
          <p className="text-dark/70">Sessões Hoje</p>
        </Card>

        <Card className="text-center">
          <CheckCheck className="w-8 h-8 text-medium mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-dark">{completedSessions}</h3>
          <p className="text-dark/70">Sessões Concluídas</p>
        </Card>

        <Card className="text-center">
          <Bell className="w-8 h-8 text-orange-500 mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-dark">{pendingRequests}</h3>
          <p className="text-dark/70">Solicitações Pendentes</p>
        </Card>
      </div>

      {/* Próximos Agendamentos - apenas se não for psicólogo novo */}
      {!isNewPsychologist && (
        <Card>
          <h2 className="text-xl font-semibold text-dark mb-4">Próximos Agendamentos</h2>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-dark/30 mx-auto mb-4" />
              <p className="text-dark/70 mb-2">Nenhum agendamento futuro encontrado.</p>
              <p className="text-sm text-dark/50">
                {totalPatients === 0 
                  ? 'Você ainda não possui pacientes cadastrados.' 
                  : 'Todos os agendamentos estão em dia!'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {upcomingAppointments.map(appointment => {
                const patient = patients.find(p => p.id === appointment.patientId);
                return (
                  <div key={appointment.id} className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
                    <div>
                      <p className="font-medium text-dark">{patient?.name || 'Paciente não encontrado'}</p>
                      <p className="text-sm text-dark/70">{new Date(appointment.date).toLocaleDateString('pt-BR')} às {appointment.time}</p>
                      <p className="text-xs text-dark/60">{appointment.description}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'agendado' 
                        ? 'bg-blue-100 text-blue-800' 
                        : appointment.status === 'iniciado'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {appointment.status === 'agendado' ? 'Agendado' :
                       appointment.status === 'iniciado' ? 'Iniciado' : 'Concluído'}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      )}
    </div>
  );
};