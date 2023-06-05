import * as yup from "yup";
import { EntitiesDataType } from "../../context-api/AppContext";

// style for add form
const addStyle = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0% !important",
    width: "100%",
  },
  paper: {
    background: "transparent",
  },
};

// validation schema for the add form using yup.
const validateInputs = yup.object().shape({
  name: yup.string().required("Full Name is required"),
  status: yup.string().required("Check Your status."),
  graduate: yup
    .boolean()
    .typeError("Graduatation must be required")
    .required("Graduatation must be required"),
  age: yup
    .number()
    .typeError("Age must be in numbers")
    .required("Age must be provided. ")
    .min(18, "Age must be greater than 18")
    .max(100, "Age must be less than 100"),
  joining: yup
    .date()
    .typeError("Joining must be required")
    .required("Joining date must be provide")
    .min(new Date(), "Joining date must be later than today"),
  phone: yup
    .string()
    .required("Phone number must be provided")
    .min(10, "Phone must be at least 10 characters"),
  gender: yup.string().required("Kindly tell us your gender."),
  address: yup.string(),
  image: yup
    .mixed()
    .required("Please upload an image")
    .test("fileType", "Unsupported file type", (value: any) => {
      return (
        value.length && ["image/jpeg", "image/png"].includes(value[0].type)
      );
    }),
});

// random no generation for unique ID.
function generateRandomId(): string {
  const idLength = Math.floor(Math.random() * 20) + 1;
  let id = "";
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id as string;
}

// format date into given structured format.
const formattedDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// convert date to structured format data using formData API.
const formDataFormat = (
  data: any,
  type: string,
  coordinates: any
): FormData => {
  const form = new FormData();
  if (data._id) form.append("_id", data._id);

  form.append("type", type);
  form.append("status", data.status);
  form.append("address", data.address);
  form.append("age", data.age);
  form.append("name", data.name);
  form.append("gender", data.gender);
  form.append("phone", data.phone);
  form.append("graduate", data.graduate);
  form.append("image", data.image[0]);
  form.append("joining", data.joining);
  form.append("coordinates", [coordinates[0], coordinates[1]] as any);

  return form;
};

export {
  validateInputs,
  addStyle,
  generateRandomId,
  formattedDate,
  formDataFormat,
};
