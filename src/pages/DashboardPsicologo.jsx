import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockApi } from '../services/mockApi';
import { Card } from '../components/Card';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Calendar, Users, Bell, CheckCheck } from 'lucide-react';

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

  useEffect(() => {
    const handleFocus = () => loadData();
    window.addEventListener('focus', handleFocus);
    const interval = setInterval(loadData, 5000);
    return () => {
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, [loadData]);

  if (loading) return <LoadingSpinner size="lg" />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayAppointments = appointments.filter(apt => {
    const appointmentDate = new Date(apt.date);
    appointmentDate.setHours(0, 0, 0, 0);
    return (
      appointmentDate.getTime() === today.getTime() &&
      apt.psychologistId === user.id &&
      apt.status === 'agendado'
    );
  });

  const totalPatients = patients.length;
  const completedSessions = appointments.filter(
    apt => apt.status === 'concluido' && apt.psychologistId === user.id
  ).length;
  const pendingRequests = requests.filter(
    req => req.status === 'pendente' && req.preferredPsychologist === user.id
  ).length;

  const upcomingAppointments = appointments
    .filter(
      apt =>
        new Date(apt.date) >= new Date() &&
        apt.status === 'agendado' &&
        apt.psychologistId === user.id
    )
    .slice(0, 5);

  const isNewPsychologist =
    totalPatients === 0 && appointments.length === 0 && requests.length === 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#5A3E36]">Dashboard</h1>
        <p className="text-white">Bem-vindo, {user.name}</p>
      </div>

      {isNewPsychologist && (
        <Card className="text-center py-8 border-2 border-dashed border-[#C9B5A7] bg-[#F7EFE7]">
          <Users className="w-16 h-16 text-white mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Bem-vindo ao Inner Peace!
          </h3>
          <p className="text-white mb-4">
            Você é novo por aqui. Seus pacientes e agendamentos aparecerão neste
            dashboard conforme você começar a receber solicitações e agendar
            sessões.
          </p>
          <p className="text-sm text-[#8C6B5B]">
            Explore o menu lateral para conhecer todas as funcionalidades
            disponíveis.
          </p>
        </Card>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center bg-[#F7EFE7] shadow-sm p-4">
          <Users className="w-8 h-8 text-[#A1785A] mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-[#5A3E36]">{totalPatients}</h3>
          <p className="text-[#8C6B5B]">Pacientes Ativos</p>
        </Card>

        <Card className="text-center bg-[#F7EFE7] shadow-sm p-4">
          <Calendar className="w-8 h-8 text-[#B58A5A] mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-[#5A3E36]">
            {todayAppointments.length}
          </h3>
          <p className="text-[#8C6B5B]">Sessões Hoje</p>
        </Card>

        <Card className="text-center bg-[#F7EFE7] shadow-sm p-4">
          <CheckCheck className="w-8 h-8 text-[#A78A7A] mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-[#5A3E36]">
            {completedSessions}
          </h3>
          <p className="text-[#8C6B5B]">Sessões Concluídas</p>
        </Card>

        <Card className="text-center bg-[#F7EFE7] shadow-sm p-4">
          <Bell className="w-8 h-8 text-[#C19A6B] mx-auto mb-2" />
          <h3 className="text-2xl font-bold text-[#5A3E36]">
            {pendingRequests}
          </h3>
          <p className="text-[#8C6B5B]">Solicitações Pendentes</p>
        </Card>
      </div>

      {!isNewPsychologist && (
        <Card className="bg-[#F7EFE7] shadow-sm p-6">
          <h2 className="text-xl font-semibold text-[#5A3E36] mb-4">
            Próximos Agendamentos
          </h2>
          {upcomingAppointments.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-16 h-16 text-[#A78A7A] mx-auto mb-4" />
              <p className="text-[#8C6B5B] mb-2">
                Nenhum agendamento futuro encontrado.
              </p>
              <p className="text-sm text-[#8C6B5B]">
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
                  <div
                    key={appointment.id}
                    className="flex justify-between items-center p-3 bg-[#EFE2DA] rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-[#5A3E36]">
                        {patient?.name || 'Paciente não encontrado'}
                      </p>
                      <p className="text-sm text-[#8C6B5B]">
                        {new Date(appointment.date).toLocaleDateString('pt-BR')} às{' '}
                        {appointment.time}
                      </p>
                      <p className="text-xs text-[#8C6B5B]">
                        {appointment.description}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'agendado'
                          ? 'bg-[#F2D2B6] text-[#8C5C3C]'
                          : appointment.status === 'iniciado'
                          ? 'bg-[#F7E1C7] text-[#A17453]'
                          : 'bg-[#D8E2D3] text-[#5A7A55]'
                      }`}
                    >
                      {appointment.status === 'agendado'
                        ? 'Agendado'
                        : appointment.status === 'iniciado'
                          ? 'Iniciado'
                          : 'Concluído'}
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
