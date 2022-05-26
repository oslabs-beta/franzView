import React from "react";
import {
  setupIonicReact,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
} from "@ionic/react";

setupIonicReact();

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "../theme/variables.css";

import Menu from "../components/Menu";

const App: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Franz</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonTitle>Content goes here...</IonTitle>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonTitle>OS Labs Beta Copyright © 2022</IonTitle>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default App;
