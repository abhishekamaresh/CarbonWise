import { Link } from 'react-router-dom';

interface AuthRedirectProps {
  type: 'login' | 'signup';
}

export default function AuthRedirect({ type }: AuthRedirectProps) {
  return (
    <p className="mt-6 text-center text-sm text-gray-600">
      {type === 'login' ? "Don't have an account?" : "Already have an account?"}
      <Link
        to={type === 'login' ? '/signup' : '/login'}
        className="ml-1 font-medium text-green-600 hover:text-green-500"
      >
        {type === 'login' ? 'Sign up now' : 'Sign in'}
      </Link>
    </p>
  );
}