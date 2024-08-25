import axios from "axios";


class functions {

    public static async submit(text: string) {
        try {
            const response = await this.sendBack(text);

            return response;

        } catch (error) {
            return error
        }
        
    }

    private static async sendBack(text: string) {
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', {
                text: text
            })
  
            return response.data.result;
        } 

        catch (error: any) {
            const response = "Aconteceu um erro"
  
            return response;
        }
    }
  
}

export default functions;