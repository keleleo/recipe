export function getHostPath() {
  if (!process.env.HOST_NAME)
    console.error("SITE_RECIPE_BASE_URL is not defined");

  return process.env.HOST_NAME || ''
}

export function getAPIToken() {
  if (!process.env.API_TOKEN) 
    console.error("API_TOKEN is not defined");
    
  return process.env.API_TOKEN ||'';
}