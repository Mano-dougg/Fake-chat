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
            const response = await axios({
                method: "post",
                url: "http://localhost:8080/request",
                data: {
                text: text
            }
            });
            
            return response.data.responseIA;
        } 
        catch (error: any) {
            const response = "Aconteceu um erro"

            return response;
        }
    }
  
}

export default functions;