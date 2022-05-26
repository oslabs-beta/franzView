import React from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import Test from "../components/Test";

const Home: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle> Hey Look a Header</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <Test />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
