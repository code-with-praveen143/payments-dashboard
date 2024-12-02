import { useMutation } from "@tanstack/react-query";

export function useUploadStudents() {
    return useMutation({
      mutationFn: async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);
  
        const authToken = sessionStorage.getItem("auth_token");
        
        const response = await fetch(
          "https://osaw.in/v1/payment/api/students/upload-students",
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Failed to upload students");
        }
  
        const data = await response.json();
        return data;
      },
    });
  }
  