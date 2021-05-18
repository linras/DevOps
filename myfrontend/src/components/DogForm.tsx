import "antd/dist/antd.css";
import { Input, Form } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Dog } from ".";

interface IProps{
  dog: Dog | null;
  onCancel: () => void;
}

interface DogFormValues {
  name: string;
}

const DogFormImplementation = ({dog, onCancel}: IProps) => {
  const initialDog = dog ? {name: dog.name} : undefined;
  const [form] = Form.useForm<DogFormValues>();

  const addDog = (dog: Dog) => {
    console.log(dog);
    //setEditedDog(undefined);
    //setDogs([...dogs, dog]);
  }

  const updateDog = (dog: Dog) => {
    console.log(dog);
    // setEditedDog(undefined);
    // setDogs([...dogs.filter(x => x.id !== dog.id), dog]);
  }

  const saveForm = (form: DogFormValues) => {
    const updatedDog : Dog = {
      name: form.name
    }
    dog ? updateDog(updatedDog) : addDog(updatedDog);
  }

  return (
      <Modal
      title={dog ? `Edit ${dog.name}` : 'Add a dog'}  
      visible={true}
      onCancel={onCancel}
      onOk={form.submit}>
        <Form form={form} initialValues={initialDog} onFinish={saveForm}>
          <Form.Item
            name="name"
            label="Dog name">
              <Input />
          </Form.Item>
          {dog?.name}
          {dog?.id}
        </Form>
      </Modal>
  );
}

export const DogForm = DogFormImplementation;

