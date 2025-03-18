import toast from "react-hot-toast"

export const handleError = (error: unknown)=> {
  if(error instanceof Error) {
    console.error(error.message);
    toast.error(error.message);
  } else {
    console.error(error);
    toast.error(String(error));
  }
}