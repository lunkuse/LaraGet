import { provide } from "vue";

async function fetchTeethImages() {
	return await import('../assets/data/images.json');
}
async function fetchImplantImages() {
	return await import('../assets/data/implants.json');
}
async function fetchMissingImages() {
	return await import('../assets/data/missing.json');
}

export default function useTeethImages() {

  const teeth = fetchTeethImages();
  const implants = fetchImplantImages();
  const missing = fetchMissingImages();

  provide('teeth,', teeth,)
  provide('implants,', implants,)
  provide('missing,', missing)

  return {
    teeth,
    implants,
    missing,
  }
}