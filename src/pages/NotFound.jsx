import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Home } from "lucide-react";

export const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <Card className="text-center max-w-md">
                <div className="mb-6">
                    <h1 className="text-6xl font-bold text-light mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-dark mb-2">Página não encontrada</h2>
                    <p className="text-dark/70">
                        Ops! A página que você está procurando não existe ou foi movida.
                    </p>
                </div>
                <Link to="/dashboard">
                    <Button className="flex items-center gap-2 mx-auto">
                        <Home size={20} />
                        Voltar ao Início
                    </Button>
                </Link>
            </Card>
        </div>
    );
};