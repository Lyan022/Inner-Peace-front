// Componente de Input reutilizável com suporte a senha e erros

import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';
 
export const Input = ({ 

  label, // Label do input

  type = 'text', // Tipo de input (text, password, email, etc.)

  error, // Mensagem de erro opcional

  className = '', // Classes adicionais personalizadas
  labelClassName = '',

  id, // ID do input (opcional, gerado automaticamente se não fornecido)

  ...props // Outras props do input (onChange, value, placeholder, etc.)

}) => {

  // Estado para alternar visibilidade da senha

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password'; // Verifica se o input é do tipo senha

  const inputType = isPassword && showPassword ? 'text' : type; // Alterna entre text e password

  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`; // Gera ID único se não fornecido

  const errorId = error ? `${inputId}-error` : undefined; // ID para referência do erro
 
  return (
<div className="space-y-1"> {/* Espaçamento vertical entre label, input e erro */}

      {label && (
<label 

          htmlFor={inputId}

          className="block text-sm font-medium text-black"
>

          {label}
</label>

      )}
<div className="relative"> {/* Container para posicionar o botão de olho */}
<input

          id={inputId}

          type={inputType} // Define o tipo considerando a visibilidade da senha

          className={`w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-dark placeholder-dark/60 focus:outline-none focus:ring-2 focus:ring-light focus:border-transparent transition-colors ${error ? 'border-red-500' : ''} ${className}`}

          aria-invalid={error ? 'true' : 'false'} // Acessibilidade para erro

          aria-describedby={errorId} // Relaciona o input com a mensagem de erro

          {...props}

        />

        {isPassword && (
<button

            type="button"

            onClick={() => setShowPassword(!showPassword)} // Alterna visibilidade da senha

            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark/60 hover:text-dark transition-colors"

            aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} // Acessibilidade

            tabIndex={0}
>

            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />} {/* Ícone que muda de acordo com visibilidade */}
</button>

        )}
</div>

      {error && (
<p id={errorId} className="text-sm text-red-600" role="alert">

          {error} {/* Exibe a mensagem de erro */}
</p>

      )}
</div>

  );

};
 