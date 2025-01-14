export const getClients = async () => {
  try {
      const response = await fetch('http://localhost:3000/clients', {
        method: 'GET'
      });

      const result = await response.json();
    
      return result;
  } catch (error) {
      console.log(error);
  }
}

export const getClient = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/clients/${id}`, {
          method: 'GET'
        });
  
        const result = await response.json();
      
        return result;
    } catch (error) {
        console.log(error);
    }
  }

export const sendClientData = async (client, method, id ) => {
  try {
      const response = await fetch(`http://localhost:3000/clients/${method === 'POST' ? '' : id}`, {
          headers: {
              'Content-Type': 'application/json'
          },
          method,
          body: JSON.stringify(client)
      });

      const result = await response.json();

      return result;
  } catch (error) {
      console.log(error);
  }
} 

export const deleteClientItem = async (id) => {
  try {
      await fetch(`http://localhost:3000/clients/${id}`, {
          method: 'DELETE',
      });
  } catch (error) {
      console.log(error);
  }
}

export const findClient = async (value) => {
  try {
      const response = await fetch(`http://localhost:3000/clients?search=${value}`, {
          method: 'GET'
      });

      const result = await response.json();

      return result;
  } catch (error) {
      console.log(error);
  }
}
