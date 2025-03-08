import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../../controle/cookie';

function ProSaude() {

   const [userData, setUserData] = useState<any>(null); 
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 

   useEffect(() => {
   
     const fetchData = async () => {
        try {
            const token = getToken(); // Recupera o token do cookie
            if (token) {
              const response = await axios.get('http://localhost:8081/profSaude/me', {
                headers: {
                  'Authorization': `Bearer ${token}`, 
                },
                withCredentials: true,
              });
              setUserData(response.data);
            } else {
              setError('Token não encontrado');
            }
            setLoading(false);
          } catch (err) {
            setError('Erro ao carregar os dados');
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);
 

   if (loading) {
     return <div>Carregando...</div>;
   }
 
  
   if (error) {
     return <div>Erro ao carregar os dados: {error}</div>;
   }
 

   return (
     <div>
       <h1>Dados do Usuário</h1>
       <pre>{JSON.stringify(userData, null, 2)}</pre>
     </div>
   );
}

export default ProSaude;