import React, { useState } from "react";
import InstagramForm from "../InstagramForm";
import InstagramPost from "../InstagramPost";
import "./AdminHistorical.css";

const AdminHistorical = ({ instagramPost, setInstagramPost }) => {
  const [selectedPostNumber, setSelectedPostNumber] = useState(null);

  return (
    <main className="settings-content-historico">
      <h1 className="texto-seccion-historico">
        Utiliza una de las 6 ranuras para fotos de Instagram:
      </h1>
      <InstagramForm
        setInstagramPost={setInstagramPost}
        setSelectedPostNumber={setSelectedPostNumber}
        />
      <div className="instagram-post-container">
        {selectedPostNumber && (
          <InstagramPost
            instagramPost={instagramPost}
            postNumber={selectedPostNumber}
          />
        )}
      </div>
    </main>
  );
};

export default AdminHistorical;
