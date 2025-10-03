import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi"; // removi patients
import { Card } from "../components/Card";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Users, User, Mail, Phone } from "lucide-react";

export const Pacientes = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadPatients = async () => {
    setLoading(true);
    try {
      const data = await mockApi.getPatients(user.id);
      console.log("Pacientes carregados:", data);
      setPatients(data);
    } catch (error) {
      console.error("Erro ao carregar pacientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, [user.id]);

  useEffect(() => {
    const handleFocus = () => loadPatients();
    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  if (loading) return <LoadingSpinner size="lg" />;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Users className="w-8 h-8 text-[#5A3E36]" />
        <h1 className="text-3xl font-bold text-[#5A3E36]">
          Meus Pacientes: {patients.length} Pacientes
        </h1>
      </div>

      <div className="grid gap-6">
        {patients.length === 0 ? (
          <Card className="text-center py-12 ">
            <Users className="w-16 h-16 text-dark/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-dark mb-2">
              Nenhum paciente encontrado
            </h3>
            <p className="text-dark/70">
              Conforme seus agendamentos, os seus pacientes irão aparecer aqui!
            </p>
          </Card>
        ) : (
          patients.map((patient) => (
            <Card
              key={patient.id}
              onClick={() => navigate(`/pacientes/${patient.id}`)}
              className="cursor-pointer hover:shadow-lg transition-shadow  border-[#C9B5A7] bg-[#F7EFE7]"
            >
              <div className="space-y-3">
                {/* Cabeçalho */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-light to-accent rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-dark text-xl font-semibold">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-dark/60">Paciente: #{patient.id}</p>
                  </div>
                </div>

                {/* Informações extras */}
                <div><strong>Idade:</strong> {patient.age} anos</div>
                <div><strong>Total de Sessões:</strong> {patient.totalSessions}</div>
                <div><strong>Data de Nascimento:</strong> {patient.birthDate}</div>
                <div>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      patient.status === "Ativo"
                        ? "text-light font-semibold"
                        : "text-light font-semibold"
                    }
                  >
                    {patient.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" /> {patient.phone}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" /> {patient.email}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
