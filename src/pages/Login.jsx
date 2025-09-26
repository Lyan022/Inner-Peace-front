import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import toast from "react-hot-toast";

export const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const {login} = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const {user, token} = await mockApi.login(formData.email, formData.password);
            login(user, token)
            toast.success('Login realizado com sucesso!');

            navigate('/dashboard')
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-4 bg-gradient-to-br from-white">
            <Card className="w-full  max-w-md bg-white">
         
                {/*Cabeçalho */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-black mb-2">Entrar</h1>
                    <p className="text-dark/70">Acesse sua conta no Inner Peace</p>
                </div>
                   
                <form onSubmit={handleSubmit} className="space-y-6">
                    <Input
                        label="E-mail"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="seu@email.com"
                        required
                        labelClassName="text-black"
                        className="placeholder:text-gray-500"
                    />

                    <Input
                        label="Senha"
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        placeholder="Sua senha"
                        required
                        labelClassName="text-black"
                        className="placeholder:text-gray-500"
                    />

                    <Button type="submit" loading={loading} className="w-full">
                        Entrar
                    </Button>
                </form>

                <div className="mt-6 text-center space-y-2">
                    <p className="text-gray-700">Não possui conta?</p>
                    <Link to="/register" className="text-light font-bold hover:text-dark">
                        Criar Conta
                    </Link>
                </div>
            </Card>
        </div>
    )
}