import { useNavigate } from 'react-router-dom';

function LogoutCustomerButton() {
  const navigate = useNavigate();
    
  const handleLogout = () => {
  // Elimina il token di autenticazione dalla memoria locale durante il logout
  localStorage.removeItem('auth_token');

  // Naviga alla pagina di logout
  navigate('/');
  }
  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutCustomerButton;