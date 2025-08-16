export default function getAuthToken() {
  const token = sessionStorage.getItem("__auth_token");
  if (!token) {
    return null;
  } else {
    return token;
  }
}
