import axios from "axios";
import { Dog } from "../components/DogTable";

export default abstract class Api {
    public static getDogs = async () => {
        return (await axios.get<Dog[]>('http://localhost/api/dogs')).data;
    }

    public static async getDog(id: number){
        return (await axios.get<Dog>(`dog/${id}`)).data;
    }

    public static createDog = async (dog : Dog) => {
        return (await axios.post<Dog>('dog', dog)).data;
    }

    public static async deleteDog(id: number){
        await axios.delete(`dog/${id}`);
    }

    public static async editDog(dog: Dog){
        return (await axios.put('dog', dog)).data;
    }
}