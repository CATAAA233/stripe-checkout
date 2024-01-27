import axios from "axios";

export default function TijuanidadBackendAPI(){
    return axios.create({
        baseURL:'http://localhost:8080/api/v1',
        headers: {
            Accept: 'application/json',
          },
    })
}