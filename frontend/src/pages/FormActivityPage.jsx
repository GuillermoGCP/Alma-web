import React from "react";
import Footer from "../components/Footer";
import FormDisplay from "../components/FormDisplay";
import "./FormActivityPage.css";
import { useParams } from "react-router-dom";

const FormActivityPage = () => {
  const { activityNumber, title } = useParams();

  return (
    <div className="register-page">
      <main className="register-main">
        <FormDisplay jsonNumber={activityNumber} title={title} />
      </main>
      <Footer />
    </div>
  );
};

export default FormActivityPage;
