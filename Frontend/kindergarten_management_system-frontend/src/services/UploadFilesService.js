import http from "../http-common";
import axios from "axios";
import authHeader from "./auth-header";

class UploadFilesService {
  upload(file) {
    let formData = new FormData();
    formData.append("file", file);
    return axios.post("http://localhost:8080/api/kms/upload", formData, {
      headers: authHeader(),
    });
  }

  getFiles() {
    return http.get("/files");
  }
}

export default new UploadFilesService();
