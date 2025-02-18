export function getUserInfo() {
  const user = localStorage.getItem("user");
  
  if (user) {
    try {
      return JSON.parse(user);
    } catch (error) {
      console.error("Erro ao analisar o JSON do usuário", error);
      return null;
    }
  }
  
  return null;
}
