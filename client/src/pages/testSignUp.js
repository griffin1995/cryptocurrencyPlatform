import React, { useState } from 'react';
import Form0 from './sign_up_forms/Form0';

// Define your form components

function SecondForm({ onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="field3"
        value={formData.field3 || ''}
        onChange={handleChange}
        placeholder="Field 3"
      />
      <input
        type="text"
        name="field4"
        value={formData.field4 || ''}
        onChange={handleChange}
        placeholder="Field 4"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

function ThirdForm({ onSubmit }) {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="field5"
        value={formData.field5 || ''}
        onChange={handleChange}
        placeholder="Field 5"
      />
      <input
        type="text"
        name="field6"
        value={formData.field6 || ''}
        onChange={handleChange}
        placeholder="Field 6"
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// Define your main component
function App() {
  const [step, setStep] = useState(1);
  const [formData1, setFormData1] = useState(null);
  const [formData2, setFormData2] = useState(null);
  const [formData3, setFormData3] = useState(null);

  const handleForm1Submit = (data) => {
    setFormData1(data);
    setStep(2);
  };

  const handleForm2Submit = (data) => {
    setFormData2(data);
    setStep(3);
  };

  const handleForm3Submit = (data) => {
    setFormData3(data);
    // You can handle the final submission here or do any other operations
  };

  return (
    <div>
      {step === 1 && <Form0 onSubmit={handleForm1Submit} />}
      {step === 2 && <SecondForm onSubmit={handleForm2Submit} />}
      {step === 3 && <ThirdForm onSubmit={handleForm3Submit} />}
    </div>
  );
}

export default App;
