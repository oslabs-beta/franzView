import React from "react";
import {
  setupIonicReact,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonApp,
  IonSplitPane,
  IonMenu,
  IonButton,
  IonButtons,
  IonList,
  IonListHeader,
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonReactRouter,
  Route,
} from "@ionic/react";

import {
  home,
  menu,
  albumsOutline,
  enterOutline,
  exitOutline,
} from "ionicons/icons";

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

import Broker from "./pages/Broker";

const App: React.FC = () => {
  return (
    // <Broker />
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/broker" component={Broker} />
        </IonRouterOutlet>
      </IonReactRouter>

      <IonSplitPane when="sm" contentId="main-content">
        <IonMenu contentId="main-content">
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonList>
              <IonListHeader>Navigate</IonListHeader>
              <IonMenuToggle autoHide={false}>
                <IonItem button>
                  <IonIcon slot="start" icon={home}></IonIcon>
                  <IonLabel>Home</IonLabel>
                </IonItem>
                <IonItem button routerLink="/broker">
                  <IonIcon slot="start" icon={albumsOutline}></IonIcon>
                  <IonLabel>Brokers</IonLabel>
                </IonItem>
                <IonItem button>
                  <IonIcon slot="start" icon={enterOutline}></IonIcon>
                  <IonLabel>Producers</IonLabel>
                </IonItem>
                <IonItem button>
                  <IonIcon slot="start" icon={exitOutline}></IonIcon>
                  <IonLabel>Consumers</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>

        <div className="ion-page" id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonMenuToggle>
                  <IonButton>
                    <IonIcon slot="icon-only" icon={menu}></IonIcon>
                  </IonButton>
                </IonMenuToggle>
              </IonButtons>
              <IonTitle>Header</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <h1>Main Content</h1>
          </IonContent>
        </div>
      </IonSplitPane>
    </IonApp>
  );
};

export default App;
