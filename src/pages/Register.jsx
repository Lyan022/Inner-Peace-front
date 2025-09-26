// importações das biblioteca e componentes
import { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Input } from "../components/Input";
import toast from "react-hot-toast";

export const Register = () => {
    const [userType, setUserType] = useState('paciente');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        CRP: '',
        specialty: '',
        phone: '',
        birthDate: ''
    });

    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = useCallback((field) => (e) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            toast.error('Senhas não coincidem');
            return;
        }
        try {
            setLoading(true);
            const { user, token } = await mockApi.register({
                ...formData,
                type: userType
            });
            login(user, token);
            toast.success('Conta criada com sucesso');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gradient-to-b from-[#f5e8dd] to-[#f0d8b0]">
            <Card className="bg-white w-full max-w-md rounded-xl shadow-lg">
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-black mb-2">Criar Conta</h1>
                    <p className="text-gray-500">Cadastre-se no Inner Peace</p>
                </div>

                {/* Seletor de tipo de usuário */}
                <div className="flex mb-6 border rounded-lg overflow-hidden">
                    <button
                        type="button"
                        className={`w-1/2 py-2 font-semibold ${userType === 'paciente' ? 'bg-[#b46931] text-white' : 'bg-white text-black'} transition-colors`}
                        onClick={() => setUserType('paciente')}
                    >
                        Paciente
                    </button>
                    <button
                        type="button"
                        className={`w-1/2 py-2 font-semibold ${userType === 'psicologo' ? 'bg-[#b46931] text-white' : 'bg-white text-black'} transition-colors`}
                        onClick={() => setUserType('psicologo')}
                    >
                        Psicólogo
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Nome Completo"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        placeholder="Seu nome completo"
                        required
                    />
                    <Input
                        label="E-mail"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        placeholder="seu@email.com"
                        required
                    />
                    <Input
                        label="Senha"
                        type="password"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        placeholder="Sua senha"
                        required
                    />
                    <Input
                        label="Confirmar senha"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange('confirmPassword')}
                        placeholder="Confirme sua senha"
                        required
                    />
                    <Input
                        label="Telefone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange('phone')}
                        placeholder="Digite o seu telefone"
                        required
                    />

                    {userType === "paciente" && (
                        <Input
                            label="Data de Nascimento"
                            type="date"
                            value={formData.birthDate}
                            onChange={handleInputChange('birthDate')}
                            placeholder="Digite sua data de nascimento"
                            required
                        />
                    )}

                    {userType === "psicologo" && (
                        <>
                            <Input
                                label="CRP"
                                value={formData.CRP}
                                onChange={handleInputChange('CRP')}
                                placeholder="Ex: 12/34567"
                                required
                            />
                            <Input
                                label="Especialidade"
                                value={formData.specialty}
                                onChange={handleInputChange('specialty')}
                                placeholder="Ex: Psicologia Clínica, Terapia Cognitiva"
                                required
                            />
                        </>
                    )}

                    <Button
                        type="submit"
                        loading={loading}
                        className="w-full bg-[#b46931] text-white py-2 font-semibold rounded-lg hover:bg-[#a35a28]"
                    >
                        Cadastrar
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600 mb-1">Já tem uma conta?</p>
                    <Link to="/login" className="text-[#3b82f6] font-bold hover:underline">
                        Fazer login
                    </Link>
                </div>
            </Card>
        </div>
    );
}
