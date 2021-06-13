import "antd/dist/antd.css";
import { Input, Form } from "antd";
import Modal from "antd/lib/modal/Modal";
import { Dog } from "./DogTable";

interface IProps{
  initialDog: Dog | null;
  onCancel: () => void;
  handleDogCreate: (dog: Dog) => Promise<void>;
  handleDogEdit: (dog: Dog) => Promise<void>;
}

interface DogFormValues {
  name?: string;
  yearsold?: number;
  race?: string;
  favouritefood?: string;
}

const DogFormImplementation = ({initialDog, onCancel, handleDogCreate, handleDogEdit}: IProps) => {
  const initialFormDog = initialDog ? {...initialDog} : undefined;
  const [form] = Form.useForm<DogFormValues>();

  const addDog = (dog: Dog) => {
    handleDogCreate(dog);
    onCancel();
  }

  const updateDog = (dog: Dog) => {
    handleDogEdit(dog);
    onCancel();
  }

  const saveForm = (form: DogFormValues) => {
    const updatedDog : Dog = {
      id: initialDog?.id,
      name: form.name ?? '',
      yearsold: form.yearsold ?? 0,
      race: form.race ?? '',
      favouritefood: form.favouritefood ?? ''
    }
    initialDog ? updateDog(updatedDog) : addDog(updatedDog);
  }

  return (
      <Modal
      title={initialDog ? `Edit ${initialDog.name}` : 'Add a dog'}  
      visible={true}
      onCancel={onCancel}
      onOk={form.submit}>
        <Form form={form} initialValues={initialFormDog} onFinish={saveForm}>
          <Form.Item
            name="name"
            label="Dog name">
              <Input />
          </Form.Item>
          <Form.Item
            name="race"
            label="Dog race">
              <Input />
          </Form.Item>
          <Form.Item
            name="yearsold"
            label="Years old">
              <Input />
          </Form.Item>
          <Form.Item
            name="favouritefood"
            label="Favourite food">
              <Input />
          </Form.Item>
        </Form>
      </Modal>
  );
}

export const DogForm = DogFormImplementation;

