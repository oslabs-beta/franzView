import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const Home = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle> Hey Look a Header</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonToolbar>
          <IonTitle> This is where will plug in any components</IonTitle>
        </IonToolbar>
      </IonContent>
    </IonPage>
  );
};

export default Home;
